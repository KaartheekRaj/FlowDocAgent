from __future__ import annotations

from copy import deepcopy

from app.models.document import DocumentJson


class DocumentEditorAgent:
    """Performs direct document mutations for generic edit commands."""

    def align_text(self, document: DocumentJson, alignment: str) -> DocumentJson:
        updated = deepcopy(document)
        for page in updated.pages:
            for node in page.nodes:
                if node.type == 'text':
                    node.align = alignment  # type: ignore[assignment]
        return updated

    def delete_selected(self, document: DocumentJson, node_id: str) -> DocumentJson:
        updated = deepcopy(document)
        for page in updated.pages:
            page.nodes = [node for node in page.nodes if node.id != node_id]
        return updated
