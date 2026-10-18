'use client';

import { useEffect, useRef, useState } from 'react';
import { imageSizes } from '@/data/imageSizes';

export interface CaseImage {
  src: string;
  title: string;
}

export default function CaseImageViewer({ image, onClose }: {
  image: CaseImage | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number; left: number; top: number; moved: boolean } | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const size = imageSizes[image?.src.split('/').pop() || ''] || [1200, 800];
  const fitScale = viewport.width && viewport.height
    ? Math.min(viewport.width / size[0], viewport.height / size[1], 1) : 0;
  const scale = zoomed ? Math.max(1, fitScale * 2) : fitScale;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !image) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setZoomed(false);
    dialog.showModal();
    const canvas = canvasRef.current;
    const measure = () => { if (canvas) setViewport({ width: canvas.clientWidth, height: canvas.clientHeight }); };
    measure();
    const observer = new ResizeObserver(measure);
    if (canvas) observer.observe(canvas);
    return () => {
      observer.disconnect();
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [image]);

  return (
    <dialog
      ref={dialogRef}
      className="case-image-dialog"
      aria-labelledby="image-viewer-title"
      onCancel={onClose}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
    >
      {image && <>
        <header className="case-image-dialog__header">
          <h2 id="image-viewer-title">{image.title}</h2>
          <div>
            <button type="button" onClick={() => { dragRef.current = null; setZoomed(!zoomed); }} aria-pressed={zoomed}>
              {zoomed ? 'Fit image' : 'Zoom in'}
            </button>
            <button type="button" className="case-image-dialog__close" aria-label="Close image" onClick={onClose}>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </header>
        <div ref={canvasRef} className={`case-image-dialog__canvas${zoomed ? ' is-zoomed' : ''}`}
          onPointerDown={event => {
            if (!zoomed || event.pointerType !== 'mouse' || event.button !== 0) return;
            dragRef.current = { x: event.clientX, y: event.clientY, left: event.currentTarget.scrollLeft, top: event.currentTarget.scrollTop, moved: false };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={event => {
            const drag = dragRef.current;
            if (!drag || event.buttons !== 1) return;
            const dx = event.clientX - drag.x, dy = event.clientY - drag.y;
            if (Math.abs(dx) + Math.abs(dy) > 4) drag.moved = true;
            event.currentTarget.classList.toggle('is-dragging', drag.moved);
            event.currentTarget.scrollLeft = drag.left - dx;
            event.currentTarget.scrollTop = drag.top - dy;
          }}
          onPointerUp={event => {
            event.currentTarget.classList.remove('is-dragging');
            if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
          }}
          onPointerCancel={event => { dragRef.current = null; event.currentTarget.classList.remove('is-dragging'); }}
          onClick={() => {
            const dragged = dragRef.current?.moved;
            dragRef.current = null;
            if (!dragged) setZoomed(!zoomed);
          }}>
          <div className="case-image-dialog__surface">
            <img src={image.src} alt={image.title} draggable={false}
              width={size[0]} height={size[1]}
              style={{ width: size[0] * scale, height: size[1] * scale }} />
          </div>
        </div>
        <p className="case-image-dialog__hint">{zoomed ? 'Drag or scroll to explore. Click the image to fit.' : 'Click the image or Zoom in to inspect the details.'} Press Esc to close.</p>
      </>}
    </dialog>
  );
}
