export default function Toolbar({ onAlign, onDeleteSelected, onToggleWatermark, onExport }) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 p-3">
      <button className="btn" onClick={() => onAlign('left')}>Align Left</button>
      <button className="btn" onClick={() => onAlign('center')}>Align Center</button>
      <button className="btn" onClick={() => onAlign('right')}>Align Right</button>
      <button className="btn" onClick={onDeleteSelected}>Delete Selected</button>
      <button className="btn" onClick={onToggleWatermark}>Watermark</button>
      <button className="btn" onClick={() => onExport('html')}>Export HTML</button>
      <button className="btn" onClick={() => onExport('pdf')}>Export PDF</button>
      <button className="btn" onClick={() => onExport('docx')}>Export DOCX</button>
    </div>
  );
}
