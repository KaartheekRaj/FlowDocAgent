from __future__ import annotations

import fitz

from app.models.document import DocumentJson, DocumentNode, DocumentPage


class PDFParserAgent:
    """Extracts text and rough layout from uploaded PDFs using PyMuPDF."""

    def parse_pdf(self, pdf_bytes: bytes) -> DocumentJson:
        doc = fitz.open(stream=pdf_bytes, filetype='pdf')
        pages: list[DocumentPage] = []

        for page_index, page in enumerate(doc):
            nodes: list[DocumentNode] = []
            blocks = page.get_text('blocks')

            for block_index, block in enumerate(blocks):
                x0, y0, x1, y1, text, *_ = block
                cleaned = (text or '').strip()
                if not cleaned:
                    continue
                nodes.append(
                    DocumentNode(
                        id=f'p{page_index+1}-t{block_index}',
                        type='text',
                        x=float(x0),
                        y=float(y0),
                        width=max(20.0, float(x1 - x0)),
                        height=max(20.0, float(y1 - y0)),
                        content=cleaned,
                    )
                )

            pages.append(DocumentPage(number=page_index + 1, nodes=nodes))

        doc.close()
        return DocumentJson(pages=pages, metadata={'source': 'pdf_parser_agent'})
