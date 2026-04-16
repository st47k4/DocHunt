import io

from PIL import Image

from analyzers.base import BaseAnalyzer
from models.result import ImageAnalysisResult, MetadataField

# Tag EXIF id → (key, label humain, sensitif)
_EXIF_FIELDS: dict[int, tuple[str, str, bool]] = {
    270:   ("ImageDescription",  "Description",             True),
    271:   ("Make",              "Marque appareil",         True),
    272:   ("Model",             "Modèle appareil",         True),
    274:   ("Orientation",       "Orientation",             False),
    282:   ("XResolution",       "Résolution X",            False),
    283:   ("YResolution",       "Résolution Y",            False),
    296:   ("ResolutionUnit",    "Unité de résolution",     False),
    305:   ("Software",          "Logiciel",                True),
    306:   ("DateTime",          "Date / Heure",            True),
    315:   ("Artist",            "Artiste / Auteur",        True),
    33432: ("Copyright",         "Copyright",               True),
    33434: ("ExposureTime",      "Temps d'exposition",      False),
    33437: ("FNumber",           "Ouverture (f/)",          False),
    34855: ("ISOSpeedRatings",   "Sensibilité ISO",         False),
    36867: ("DateTimeOriginal",  "Date de prise de vue",    True),
    36868: ("DateTimeDigitized", "Date de numérisation",    False),
    37386: ("FocalLength",       "Focale (mm)",             False),
    37510: ("UserComment",       "Commentaire",             True),
    40962: ("ExifImageWidth",    "Largeur EXIF (px)",       False),
    40963: ("ExifImageHeight",   "Hauteur EXIF (px)",       False),
}


def _to_str(value) -> str:
    """Convertit n'importe quelle valeur EXIF en chaîne lisible."""
    if isinstance(value, bytes):
        try:
            decoded = value.decode("utf-8", errors="replace").strip("\x00").strip()
            # Supprime les préfixes d'encodage UserComment ("ASCII\x00\x00\x00")
            for prefix in ("ASCII", "UNICODE", "JIS"):
                if decoded.startswith(prefix):
                    decoded = decoded[8:].strip("\x00").strip()
                    break
            return decoded
        except Exception:
            return ""
    if isinstance(value, tuple) and len(value) == 2:
        num, den = int(value[0]), int(value[1])
        if den == 0:
            return str(num)
        result = num / den
        if 0 < result < 1:
            return f"1/{round(1 / result)}"
        return f"{result:.2f}".rstrip("0").rstrip(".")
    try:
        # IFDRational ou similaire
        if hasattr(value, "numerator") and hasattr(value, "denominator"):
            den = int(value.denominator)
            num = int(value.numerator)
            if den == 0:
                return str(num)
            result = num / den
            if 0 < result < 1:
                return f"1/{round(1 / result)}"
            return f"{result:.2f}".rstrip("0").rstrip(".")
    except Exception:
        pass
    return str(value)


def _dms_to_decimal(dms, ref: str) -> float:
    """Degrés/Minutes/Secondes → décimal signé."""
    try:
        d = float(_to_str(dms[0]).replace(",", ".") if isinstance(dms[0], str) else dms[0])
        m = float(_to_str(dms[1]).replace(",", ".") if isinstance(dms[1], str) else dms[1])
        s_raw = dms[2]
        s = float(_to_str(s_raw).replace(",", ".") if isinstance(s_raw, str) else s_raw)
    except Exception:
        return 0.0
    decimal = d + m / 60.0 + s / 3600.0
    if str(ref).strip().upper() in ("S", "W"):
        decimal = -decimal
    return round(decimal, 6)


def _score(fields: list[MetadataField], has_gps: bool) -> int:
    sensitive = sum(1 for f in fields if f.sensitive and f.value)
    score = min(sensitive * 10, 35)
    if has_gps:
        score += 40
    return min(score, 100)


class ImageAnalyzer(BaseAnalyzer):
    def analyze(self, data: bytes, filename: str) -> ImageAnalysisResult:
        warnings: list[str] = []
        fields: list[MetadataField] = []
        has_gps = False
        gps_lat: float | None = None
        gps_lon: float | None = None

        with Image.open(io.BytesIO(data)) as img:
            fmt = img.format or "UNKNOWN"
            width, height = img.size
            mode = img.mode

            try:
                exif = img.getexif()
            except Exception:
                exif = {}

            if exif:
                # ── Champs EXIF standards ───────────────────────────────────
                for tag_id, (key, label, sensitive) in _EXIF_FIELDS.items():
                    raw = exif.get(tag_id)
                    if raw is None:
                        continue
                    value = _to_str(raw).strip()
                    if not value:
                        continue
                    fields.append(MetadataField(key=key, label=label, value=value, sensitive=sensitive))

                # ── GPS IFD (tag 34853) ─────────────────────────────────────
                try:
                    gps_ifd = exif.get_ifd(34853)
                    if gps_ifd:
                        lat_dms = gps_ifd.get(2)   # GPSLatitude
                        lat_ref = gps_ifd.get(1)   # GPSLatitudeRef
                        lon_dms = gps_ifd.get(4)   # GPSLongitude
                        lon_ref = gps_ifd.get(3)   # GPSLongitudeRef

                        if lat_dms and lat_ref and lon_dms and lon_ref:
                            has_gps = True
                            gps_lat = _dms_to_decimal(lat_dms, lat_ref)
                            gps_lon = _dms_to_decimal(lon_dms, lon_ref)
                            warnings.append(
                                f"Coordonnées GPS présentes dans l'image : {gps_lat:.6f}°, {gps_lon:.6f}°"
                            )
                            fields.append(MetadataField(
                                key="GPSLatitude", label="GPS — Latitude",
                                value=f"{gps_lat:.6f}°", sensitive=True,
                            ))
                            fields.append(MetadataField(
                                key="GPSLongitude", label="GPS — Longitude",
                                value=f"{gps_lon:.6f}°", sensitive=True,
                            ))

                        alt = gps_ifd.get(6)  # GPSAltitude
                        if alt is not None:
                            fields.append(MetadataField(
                                key="GPSAltitude", label="GPS — Altitude",
                                value=f"{_to_str(alt)} m", sensitive=False,
                            ))
                except Exception:
                    pass

            if not fields:
                warnings.append("Aucune métadonnée EXIF trouvée dans cette image.")

        risk_score = _score(fields, has_gps)

        return ImageAnalysisResult(
            filename=filename,
            file_size=len(data),
            format=fmt,
            width=width,
            height=height,
            mode=mode,
            risk_score=risk_score,
            fields=fields,
            warnings=warnings,
            has_gps=has_gps,
            gps_latitude=gps_lat,
            gps_longitude=gps_lon,
        )
