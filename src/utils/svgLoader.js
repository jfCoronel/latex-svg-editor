import { unescapeXml } from './svgUtils';

function decodeLatexId(id) {
  const b64    = id.slice(4).replace(/-/g, '+').replace(/_/g, '/');
  const padded = b64 + '=='.slice(0, (4 - b64.length % 4) % 4);
  const bytes  = Uint8Array.from(atob(padded), c => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export function parseSvgForLatex(svgText) {
  const parser = new DOMParser();
  const doc    = parser.parseFromString(svgText, 'image/svg+xml');
  let latex    = null;

  const svgEl = doc.querySelector('svg');

  // Method 1: id="lxs-{base64url}" — current format, survives Word
  if (svgEl?.id?.startsWith('lxs-')) {
    try { latex = decodeLatexId(svgEl.id); } catch { /* malformed */ }
  }

  // Method 2: <latex-source> inside <metadata> — current format, LibreOffice/Inkscape
  if (!latex) {
    const lsEl = doc.querySelector('latex-source');
    if (lsEl) latex = lsEl.textContent;
  }

  // Method 3: data-latex attribute — backwards compat with previously exported SVGs
  if (!latex && svgEl) latex = svgEl.getAttribute('data-latex');

  return latex ? unescapeXml(latex.trim()) : null;
}
