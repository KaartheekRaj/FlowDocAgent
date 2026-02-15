from __future__ import annotations

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from app.models.document import CommandRequest, ExportRequest, ImagePromptRequest
from app.services.orchestrator import AgentOrchestrator

app = FastAPI(title='FlowDoc Agent API', version='0.2.0')
orchestrator = AgentOrchestrator()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/health')
def health() -> dict[str, str]:
    return {'status': 'ok', 'service': 'agent-api'}


@app.post('/agent/upload-pdf')
async def upload_pdf(file: UploadFile = File(...)) -> dict:
    content = await file.read()
    document = orchestrator.parse_pdf(content)
    return {'filename': file.filename or 'uploaded.pdf', 'document': document.model_dump()}


@app.post('/agent/command')
def handle_command(payload: CommandRequest) -> dict:
    updated_document = orchestrator.handle_command(payload.command, payload.document)
    return {'document': updated_document.model_dump(), 'executed': payload.command}


@app.post('/agent/generate-image')
def generate_image(payload: ImagePromptRequest) -> dict:
    images = orchestrator.generate_images(payload.prompt)
    return {'images': images}


@app.post('/agent/export')
def export_document(payload: ExportRequest) -> dict:
    html = '<html><body>' + ''.join(
        f"<p>{node.content}</p>" for page in payload.document.pages for node in page.nodes if node.type == 'text'
    ) + '</body></html>'
    return {
        'format': payload.format,
        'message': f'Export pipeline invoked for {payload.format}.',
        'html_preview': html,
    }
