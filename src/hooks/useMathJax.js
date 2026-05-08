import { useState, useEffect } from 'react';

export function useMathJax() {
  const [mjReady, setMjReady] = useState(false);

  useEffect(() => {
    let timeoutId;

    function waitForMathJax() {
      if (window.MathJax?.startup?.promise) {
        window.MathJax.startup.promise
          .then(() => setMjReady(true))
          .catch(err => console.error('MathJax startup failed:', err));
      } else {
        timeoutId = setTimeout(waitForMathJax, 100);
      }
    }

    waitForMathJax();
    return () => clearTimeout(timeoutId);
  }, []);

  return mjReady;
}
