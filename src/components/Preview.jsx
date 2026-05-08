export function Preview({ mjReady, svgHtml, error }) {
  let content;

  if (!mjReady) {
    content = (
      <div className="mj-loading">
        <i className="ti ti-loader" aria-hidden="true" />
        Cargando MathJax...
      </div>
    );
  } else if (error) {
    content = (
      <span className="preview-error">
        <i className="ti ti-alert-triangle" aria-hidden="true" />
        <br />
        {error}
      </span>
    );
  } else if (svgHtml) {
    content = <div dangerouslySetInnerHTML={{ __html: svgHtml }} />;
  } else {
    content = <span className="preview-placeholder">Escribe una ecuación...</span>;
  }

  return (
    <div className="panel">
      <div className="panel-label">Vista previa</div>
      <div id="preview-box">{content}</div>
    </div>
  );
}
