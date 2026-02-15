import { Layer, Rect, Stage, Text, Image as KonvaImage } from 'react-konva';
import { useEffect, useState } from 'react';

function ImageNode({ node, onDragEnd }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const img = new window.Image();
    img.src = node.src;
    img.onload = () => setImage(img);
  }, [node.src]);

  if (!image) return null;
  return (
    <KonvaImage
      image={image}
      x={node.x}
      y={node.y}
      width={node.width}
      height={node.height}
      draggable
      onDragEnd={(e) => onDragEnd(node.id, e.target.x(), e.target.y())}
    />
  );
}

export default function A4CanvasEditor({ document, onNodeMove, selectedNodeId, onSelectNode }) {
  const page = document?.pages?.[0] ?? { width: 595, height: 842, nodes: [] };

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-3">
      <h2 className="mb-2 text-sm font-semibold text-slate-300">A4 Preview (595x842)</h2>
      <Stage width={page.width} height={page.height} className="bg-white shadow-xl">
        <Layer>
          <Rect x={0} y={0} width={page.width} height={page.height} fill="#ffffff" />
          {page.nodes.map((node) => {
            if (node.type === 'image') {
              return <ImageNode key={node.id} node={node} onDragEnd={onNodeMove} />;
            }

            return (
              <Text
                key={node.id}
                x={node.x}
                y={node.y}
                width={node.width}
                height={node.height}
                text={node.content ?? ''}
                fontSize={node.font_size ?? 14}
                align={node.align ?? 'left'}
                fill={selectedNodeId === node.id ? '#0284c7' : '#0f172a'}
                draggable
                onClick={() => onSelectNode(node.id)}
                onTap={() => onSelectNode(node.id)}
                onDragEnd={(e) => onNodeMove(node.id, e.target.x(), e.target.y())}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
}
