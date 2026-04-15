from abc import ABC, abstractmethod
from models.result import AnalysisResult


class BaseAnalyzer(ABC):
    @abstractmethod
    def analyze(self, data: bytes, filename: str) -> AnalysisResult:
        pass
