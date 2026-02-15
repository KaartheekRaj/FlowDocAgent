import { useState } from 'react';
import A4CanvasEditor from './components/A4CanvasEditor';
import AssistantPanel from './components/AssistantPanel';
import ImageGenerationPanel from './components/ImageGenerationPanel';
import Toolbar from './components/Toolbar';
import UploadPanel from './components/UploadPanel';
import { exportDocument, generateImage, runCommand, uploadPdf } from './lib/api';

const emptyDocument = {
  pages: [
    {
      number: 1,
      width: 595,
      height: 842,
      nodes: [{ id: 'welcome', type: 'text', x: 60, y: 80, width: 420, height: 40, content: 'Upload a PDF to begin', font_size: 24, align: 'left' }]
    }
  ],
  metadata: {}
};

function App() {
  const [document, setDocument] = useState(emptyDocument);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('Ready.');

  const updateNodePosition = (id, x, y) => {
    setDocument((prev) => ({
      ...prev,
      pages: prev.pages.map((page) => ({
        ...page,
        nodes: page.nodes.map((node) => (node.id === id ? { ...node, x, y } : node))
      }))
    }));
  };

  const handleUpload = async (file) => {
    const result = await uploadPdf(file);
    setDocument(result.document);
    setStatus(`Processed ${result.filename} with PDFParserAgent.`);
  };

  const handleCommand = async (command) => {
    const result = await runCommand(command, document);
    setDocument(result.document);
    setStatus(`Orchestrator executed: ${result.executed}`);
  };

  const handleAlign = (align) => handleCommand(`align ${align}`);

  const handleDeleteSelected = () => {
    if (!selectedNodeId) return;
    setDocument((prev) => ({
      ...prev,
      pages: prev.pages.map((page) => ({ ...page, nodes: page.nodes.filter((node) => node.id !== selectedNodeId) }))
    }));
    setSelectedNodeId(null);
    setStatus('Deleted selected node.');
  };

  const handleToggleWatermark = () => handleCommand('add watermark');

  const handleGenerateImages = async (prompt) => {
    const result = await generateImage(prompt);
    setImages(result.images ?? []);
    setStatus('ImageGenerationAgent returned images.');
  };

  const handleInsertImage = (url) => {
    setDocument((prev) => ({
      ...prev,
      pages: prev.pages.map((page, index) =>
        index !== 0
          ? page
          : {
              ...page,
              nodes: [
                ...page.nodes,
                {
                  id: `img-${Date.now()}`,
                  type: 'image',
                  src: url,
                  x: 120,
                  y: 180,
                  width: 220,
                  height: 140
                }
              ]
            }
      )
    }));
  };

  const handleExport = async (format) => {
    const result = await exportDocument(document, format);
    setStatus(`${result.message}`);
  };

  return (
    <main className="min-h-screen bg-slate-950 p-5 text-slate-100">
      <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1fr_340px]">
        <section className="space-y-3">
          <h1 className="text-2xl font-bold">FlowDoc Agent Studio</h1>
          <Toolbar
            onAlign={handleAlign}
            onDeleteSelected={handleDeleteSelected}
            onToggleWatermark={handleToggleWatermark}
            onExport={handleExport}
          />
          <A4CanvasEditor
            document={document}
            onNodeMove={updateNodePosition}
            selectedNodeId={selectedNodeId}
            onSelectNode={setSelectedNodeId}
          />
        </section>

        <aside className="space-y-3">
          <UploadPanel onUpload={handleUpload} />
          <AssistantPanel onRun={handleCommand} />
          <ImageGenerationPanel images={images} onGenerate={handleGenerateImages} onInsertImage={handleInsertImage} />
          <div className="rounded border border-cyan-700 bg-cyan-950/30 p-3 text-sm text-cyan-100">{status}</div>
        </aside>
      </div>
    </main>
  );
}

export default App;
