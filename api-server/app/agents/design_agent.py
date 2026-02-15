from __future__ import annotations

from copy import deepcopy

from app.models.document import DocumentJson, DocumentNode


class DesignAgent:
    """Design-level transformations like removing images and watermarking."""

    def remove_images(self, document: DocumentJson) -> DocumentJson:
        updated = deepcopy(document)
        for page in updated.pages:
            page.nodes = [node for node in page.nodes if node.type != 'image']
        return updated

    def add_watermark(self, document: DocumentJson, text: str = 'DRAFT') -> DocumentJson:
        updated = deepcopy(document)
        for page in updated.pages:
            watermark = DocumentNode(
                id=f'watermark-{page.number}',
                type='text',
                x=180,
                y=390,
                width=260,
                height=60,
                content=text,
                font_size=42,
                align='center',
            )
            page.nodes.append(watermark)
        return updated
