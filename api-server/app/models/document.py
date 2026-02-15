from __future__ import annotations

from pydantic import BaseModel, Field
from typing import Literal

NodeType = Literal['text', 'image']


class DocumentNode(BaseModel):
    id: str
    type: NodeType
    x: float = 40
    y: float = 40
    width: float = 160
    height: float = 48
    content: str | None = None
    src: str | None = None
    font_size: int = 14
    align: Literal['left', 'center', 'right'] = 'left'


class DocumentPage(BaseModel):
    number: int
    width: int = 595
    height: int = 842
    nodes: list[DocumentNode] = Field(default_factory=list)


class DocumentJson(BaseModel):
    pages: list[DocumentPage] = Field(default_factory=list)
    metadata: dict = Field(default_factory=dict)


class CommandRequest(BaseModel):
    command: str
    document: DocumentJson


class ImagePromptRequest(BaseModel):
    prompt: str


class ExportRequest(BaseModel):
    document: DocumentJson
    format: Literal['html', 'pdf', 'docx'] = 'html'
