import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { VOICES, CAMPS } from '../voices.js';

const Ctx = createContext({ open: () => {}, close: () => {} });
export const useVoices = () => useContext(Ctx);

export function VoicesProvider({ children }) {
  const [openId, setOpenId] = useState(null);
  const open = useCallback((id) => setOpenId(id), []);
  const close = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [openId, close]);

  const v = openId ? VOICES[openId] : null;

  return (
    <Ctx.Provider value={{ open, close }}>
      {children}
      {v &&
        createPortal(
          <div className="vmodal-back" onClick={close}>
            <div
              className={`vmodal camp-${v.camp}`}
              role="dialog"
              aria-modal="true"
              aria-label={`Quote from ${v.name}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="vmodal-x" onClick={close} aria-label="Close">
                ×
              </button>
              <span className="vmodal-camp">
                {CAMPS[v.camp].label}
                {v.verbatim === false && <span className="vmodal-para">paraphrase</span>}
              </span>
              <blockquote className={`vmodal-quote ${v.verbatim === false ? 'para' : ''}`}>{v.quote}</blockquote>
              {v.verbatim === false && (
                <p className="vmodal-note">
                  A summary of their argument, not a verbatim quote — follow the link for their exact words.
                </p>
              )}
              <div className="vmodal-attr">
                <span className="vmodal-mono">{v.monogram}</span>
                <div>
                  <strong>{v.name}</strong>
                  <span>{v.role}</span>
                </div>
              </div>
              <p className="vmodal-context">{v.context}</p>
              <a className="vmodal-source" href={v.source.url} target="_blank" rel="noopener noreferrer">
                {v.source.label} ↗
              </a>
            </div>
          </div>,
          document.body
        )}
    </Ctx.Provider>
  );
}
