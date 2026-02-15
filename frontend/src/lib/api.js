const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:8000';

export async function uploadPdf(file) {
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch(`${API_BASE}/agent/upload-pdf`, { method: 'POST', body: formData });
  return response.json();
}

export async function runCommand(command, document) {
  const response = await fetch(`${API_BASE}/agent/command`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ command, document })
  });
  return response.json();
}

export async function generateImage(prompt) {
  const response = await fetch(`${API_BASE}/agent/generate-image`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });
  return response.json();
}

export async function exportDocument(document, format) {
  const response = await fetch(`${API_BASE}/agent/export`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ document, format })
  });
  return response.json();
}
