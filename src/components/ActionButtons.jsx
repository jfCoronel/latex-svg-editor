export function ActionButtons({ onDownloadSvg }) {
  return (
    <div className="actions">
      <button className="act-btn primary" onClick={onDownloadSvg}>
        <i className="ti ti-download" aria-hidden="true" />
        Descargar SVG
      </button>
    </div>
  );
}
