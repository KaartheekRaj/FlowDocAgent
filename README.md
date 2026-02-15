# FlowDocAgent — Agent-Based Document Studio

This repository is a full-stack **agent architecture** for AI-assisted document editing.

## Architecture

Frontend (React + Vite + Tailwind + react-konva)
↓
API Server (FastAPI)
↓
Agent Orchestrator (routing brain)
↓
Specialized Agents:
- PDFParserAgent
- DocumentEditorAgent
- DesignAgent
- ImageGenerationAgent

## Project tree

```text
project-root/
  frontend/
  api-server/
  extraction-engine/
```

## Main behavior

1. User uploads PDF.
2. `PDFParserAgent` extracts text/layout via PyMuPDF.
3. Backend returns universal document JSON:
   - `pages[]`
   - `nodes[]` (`text` / `image`)
4. Frontend renders A4 canvas preview (595x842).
5. User issues assistant commands (`remove images`, `add watermark`, etc).
6. `AgentOrchestrator` dispatches to specialized agents and returns updated JSON.
