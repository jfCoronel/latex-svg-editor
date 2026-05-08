import { useState, useRef } from 'react';

export function DropZone({ onFile }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave() {
    setIsDragOver(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragOver(false);
    onFile(e.dataTransfer.files[0]);
  }

  function handleClick() {
    fileInputRef.current?.click();
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      fileInputRef.current?.click();
    }
  }

  function handleFileChange(e) {
    onFile(e.target.files[0]);
    e.target.value = '';
  }

  return (
    <>
      <div
        className={`drop-zone${isDragOver ? ' drag-over' : ''}`}
        role="button"
        tabIndex={0}
        aria-label="Arrastra un SVG aquí para recuperar el LaTeX"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        <i className="ti ti-file-upload" aria-hidden="true" />
        Arrastra aquí un <strong>.svg</strong> o un documento <strong>.odt · .odp · .docx · .pptx</strong> para extraer las ecuaciones
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".svg,image/svg+xml,.odt,.odp,.ods,.docx,.pptx,.xlsx"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </>
  );
}
