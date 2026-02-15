import { useState } from 'react';

export default function ImageGenerationPanel({ onGenerate, images, onInsertImage }) {
  const [prompt, setPrompt] = useState('futuristic office background');

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-3">
      <h3 className="mb-2 text-sm font-semibold">AI Image Generation Agent</h3>
      <div className="mb-2 flex gap-2">
        <input
          className="w-full rounded border border-slate-600 bg-slate-950 px-2 py-1 text-sm"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button className="btn" onClick={() => onGenerate(prompt)}>Generate</button>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {images.map((image) => (
          <div key={image.id} className="rounded border border-slate-700 p-2">
            <img src={image.url} alt={image.prompt} className="mb-1 h-24 w-full rounded object-cover" />
            <div className="flex gap-2">
              <button className="btn" onClick={() => onInsertImage(image.url)}>Insert into canvas</button>
              <a className="btn inline-block" href={image.url} download target="_blank" rel="noreferrer">Download</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
