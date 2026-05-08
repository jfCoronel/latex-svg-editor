import { useState } from 'react';

export function SvgPicker({ items, onSelect, onClose }) {
  const [expanded, setExpanded] = useState(null);

  return (
    <div className="svg-picker">
      <div className="svg-picker-header">
        <span>Selecciona la ecuación a recuperar</span>
        <button className="svg-picker-close" onClick={onClose} aria-label="Cerrar">
          <i className="ti ti-x" aria-hidden="true" />
        </button>
      </div>
      <div className="svg-picker-list">
        {items.map((svg, i) => (
          <div key={i} className="svg-picker-row">
            <button className="svg-picker-item" onClick={() => onSelect(svg)}>
              <span className="svg-picker-name">{svg.name}</span>
              {svg.latex
                ? <span className="svg-picker-latex">{svg.latex.length > 60 ? svg.latex.substring(0, 60) + '…' : svg.latex}</span>
                : <span className="svg-picker-none">sin metadatos LaTeX</span>
              }
            </button>
            {!svg.latex && (
              <button
                className="svg-picker-debug"
                title="Ver contenido SVG (diagnóstico)"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <i className={`ti ti-${expanded === i ? 'chevron-up' : 'code'}`} aria-hidden="true" />
              </button>
            )}
            {!svg.latex && expanded === i && (
              <pre className="svg-picker-raw">{svg.content.slice(0, 600)}</pre>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
