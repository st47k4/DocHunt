from abc import ABC, abstractmethod
from typing import Union

from models.result import ImageAnalysisResult, PdfAnalysisResult


class BaseAnalyzer(ABC):
    @abstractmethod
    def analyze(self, data: bytes, filename: str) -> Union[PdfAnalysisResult, ImageAnalysisResult]:
        pass
