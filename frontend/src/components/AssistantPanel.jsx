import { useState } from 'react';

export default function AssistantPanel({ onRun }) {
  const [command, setCommand] = useState('remove images');

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-3">
      <h3 className="mb-2 text-sm font-semibold">Agent Command Panel</h3>
      <input
        className="mb-2 w-full rounded border border-slate-600 bg-slate-950 px-2 py-1 text-sm"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder='Try "remove images" or "add watermark"'
      />
      <button className="btn" onClick={() => onRun(command)}>Run Command</button>
    </div>
  );
}
