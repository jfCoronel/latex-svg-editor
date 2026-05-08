import { useRef } from 'react';
import { EXAMPLES } from '../data/examples';

export function LatexInput({ value, onChange, onRender }) {
  const debounceRef = useRef(null);

  function handleChange(e) {
    const val = e.target.value;
    onChange(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onRender(val), 450);
  }

  function handleKeyDown(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      clearTimeout(debounceRef.current);
      onRender(value);
    }
  }

  function handleExample(src) {
    onChange(src);
    clearTimeout(debounceRef.current);
    onRender(src);
  }

  return (
    <div className="panel">
      <div className="panel-label">
        Fuente LaTeX{' '}
        <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0, fontSize: 10, marginLeft: 4 }}>
          (Ctrl+Enter para renderizar)
        </span>
      </div>
      <textarea
        id="latex-input"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        autoCorrect="off"
        autoCapitalize="off"
        placeholder="\int_0^\infty e^{-x^2}\,dx = \frac{\sqrt{\pi}}{2}"
      />
      <select
        className="ex-select"
        value=""
        onChange={e => { if (e.target.value) handleExample(e.target.value); }}
      >
        <option value="" disabled>Ejemplos de ecuaciones…</option>
        {EXAMPLES.map(ex => (
          <option key={ex.label} value={ex.src}>{ex.label}</option>
        ))}
      </select>
    </div>
  );
}
