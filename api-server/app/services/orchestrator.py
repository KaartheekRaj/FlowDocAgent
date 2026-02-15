from __future__ import annotations

from app.agents.design_agent import DesignAgent
from app.agents.document_editor_agent import DocumentEditorAgent
from app.agents.image_generation_agent import ImageGenerationAgent
from app.agents.pdf_parser_agent import PDFParserAgent
from app.models.document import DocumentJson


class AgentOrchestrator:
    """Routes user intent to the best specialized agent."""

    def __init__(self) -> None:
        self.pdf_parser_agent = PDFParserAgent()
        self.document_editor_agent = DocumentEditorAgent()
        self.design_agent = DesignAgent()
        self.image_generation_agent = ImageGenerationAgent()

    def parse_pdf(self, pdf_bytes: bytes) -> DocumentJson:
        return self.pdf_parser_agent.parse_pdf(pdf_bytes)

    def handle_command(self, command: str, document: DocumentJson) -> DocumentJson:
        normalized = command.lower().strip()

        if 'remove images' in normalized:
            return self.design_agent.remove_images(document)

        if 'add watermark' in normalized:
            return self.design_agent.add_watermark(document)

        if 'align center' in normalized:
            return self.document_editor_agent.align_text(document, 'center')

        if 'align right' in normalized:
            return self.document_editor_agent.align_text(document, 'right')

        if 'align left' in normalized:
            return self.document_editor_agent.align_text(document, 'left')

        return document

    def generate_images(self, prompt: str) -> list[dict[str, str]]:
        return self.image_generation_agent.generate(prompt)
