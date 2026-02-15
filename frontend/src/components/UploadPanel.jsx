import { useState } from 'react';

export default function UploadPanel({ onUpload }) {
  const [file, setFile] = useState(null);

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-3">
      <h3 className="mb-2 text-sm font-semibold">Upload PDF</h3>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        className="mb-2 block text-sm"
      />
      <button className="btn" disabled={!file} onClick={() => file && onUpload(file)}>
        Process with PDFParserAgent
      </button>
    </div>
  );
}
