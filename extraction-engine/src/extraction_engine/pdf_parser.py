import fitz


def extract_text_from_pdf_bytes(pdf_bytes: bytes) -> str:
    """Extract all text from an in-memory PDF document."""
    doc = fitz.open(stream=pdf_bytes, filetype='pdf')
    text_content = []

    for page in doc:
        text_content.append(page.get_text())

    doc.close()
    return '\n'.join(text_content).strip()
