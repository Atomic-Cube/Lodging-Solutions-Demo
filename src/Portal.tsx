import React, { useState, useEffect, useCallback, useRef } from 'react';
import protectedImage from './apple.jpg';
import { Document, Page, pdfjs } from 'react-pdf';
import type { PDFDocumentProxy } from 'pdfjs-dist';

// ---------- PDF WORKER SETUP ----------
try {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).toString();
} catch {
  pdfjs.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js';
}

// ---------- TYPES ----------
interface PortalProps {
  username?: string;
  closeWindow: () => void;
}

// ---------- STYLES ----------
const portalStyles: React.CSSProperties = {
  userSelect: 'none',
  height: '100vh',
  width: '100vw',
  padding: '20px',
  boxSizing: 'border-box',
  overflow: 'auto',
  position: 'relative',
  fontFamily: 'sans-serif',
};

const blurredOverlay: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0,0,0,0.8)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 10000,
  color: 'white',
  pointerEvents: 'auto', // ✅ blocks interaction correctly
};

const warningAlert: React.CSSProperties = {
  backgroundColor: '#cc0000',
  padding: '18px',
  borderRadius: '8px',
  fontSize: '1.1em',
  fontWeight: '700',
};

const pdfContainerStyle: React.CSSProperties = {
  border: '1px solid #999',
  padding: '12px',
  background: '#fafafa',
  userSelect: 'none',
  maxWidth: '900px',
  margin: '12px auto',
};

const protectedImageContainerStyles: React.CSSProperties = {
  width: '600px',
  height: '400px',
  margin: '20px auto',
  position: 'relative',
  overflow: 'hidden',
  border: '1px solid #007bff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#222',
};

const imageElementStyle: React.CSSProperties = {
  maxWidth: '100%',
  maxHeight: '100%',
  objectFit: 'cover',
  display: 'block',
  pointerEvents: 'none',
  userSelect: 'none',
};

const imageWatermarkStyle: React.CSSProperties = {
  position: 'absolute',
  transform: 'rotate(-30deg)',
  opacity: 0.24,
  color: '#fff',
  fontSize: '3rem',
  fontWeight: 700,
  pointerEvents: 'none',
  userSelect: 'none',
  whiteSpace: 'nowrap',
};

const pageWatermarkStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '2.8rem',
  color: 'red',
  opacity: 0.18,
  transform: 'rotate(-35deg)',
  pointerEvents: 'none',
  zIndex: 9999,
};

// ---------- COMPONENT ----------
const Portal: React.FC<PortalProps> = ({ username = 'UNKNOWN', closeWindow }) => {
  const [isBlurred, setIsBlurred] = useState(false);
  const [warningMessage, setWarningMessage] = useState<string>('');

  // ✅ LIVE FORENSIC CLOCK (FIXES YOUR 28:45 BUG)
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // PDF STATE
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const pageWrapperRef = useRef<HTMLDivElement | null>(null);
  const [pageWidth, setPageWidth] = useState<number>(600);

  useEffect(() => {
    const setWidth = () => {
      const w = pageWrapperRef.current
        ? pageWrapperRef.current.clientWidth - 40
        : 600;
      setPageWidth(Math.max(300, Math.min(w, 900)));
    };

    setWidth();
    window.addEventListener('resize', setWidth);
    return () => window.removeEventListener('resize', setWidth);
  }, []);

  const onDocumentLoadSuccess = useCallback((pdf: PDFDocumentProxy) => {
    setNumPages(pdf.numPages);
    setPageNumber(1);
  }, []);

  const showTempWarning = useCallback((msg: string, ms = 2500) => {
    setWarningMessage(msg);
    setTimeout(() => setWarningMessage(''), ms);
  }, []);



const firstRunRef = useRef(true);

useEffect(() => {
  const handleBlur = () => {
    if (firstRunRef.current) return;

    console.log('BLUR TRIGGERED');
    setIsBlurred(true);
    showTempWarning('Window lost focus — content blurred');
  };

  const handleFocus = () => {
    if (firstRunRef.current) return;

    console.log('FOCUS RESTORED');
    setTimeout(() => {
      setIsBlurred(false); // ✅ THIS IS THE UNBLOCK
    }, 150);
  };

  const handleVisibility = () => {
    if (firstRunRef.current) return;

    if (document.hidden) {
      console.log('TAB HIDDEN');
      setIsBlurred(true);
      showTempWarning('Tab hidden — content blurred');
    } else {
      console.log('TAB VISIBLE');
      setTimeout(() => {
        setIsBlurred(false); // ✅ THIS IS THE UNBLOCK
      }, 150);
    }
  };

  window.addEventListener('blur', handleBlur);
  window.addEventListener('focus', handleFocus);
  document.addEventListener('visibilitychange', handleVisibility);

  // ✅ allow security AFTER initial load
  const unlock = setTimeout(() => {
    firstRunRef.current = false;
  }, 600);

  return () => {
    clearTimeout(unlock);
    window.removeEventListener('blur', handleBlur);
    window.removeEventListener('focus', handleFocus);
    document.removeEventListener('visibilitychange', handleVisibility);
  };
}, [showTempWarning]);




  const handleNoCopy = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    showTempWarning('Copy blocked');
  }, [showTempWarning]);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    showTempWarning('Right click blocked');
  }, [showTempWarning]);

  return (
    <div style={portalStyles} onCopy={handleNoCopy} onContextMenu={handleContextMenu}>
      {isBlurred && (
        <div style={blurredOverlay}>
          <div style={warningAlert}>⚠️ SECURITY ALERT — CONTENT BLURRED</div>
        </div>
      )}

      {/* ✅ FORENSIC WATERMARK WITH LIVE TIME */}
      <div style={pageWatermarkStyle}>
        USER: {username.toUpperCase()} —{' '}
        {now.toLocaleDateString('en-CA')} {now.toLocaleTimeString('en-GB')}
      </div>

      <h1>CONFIDENTIAL PORTAL</h1>

      <button onClick={closeWindow} style={{ marginBottom: '16px' }}>
        Close Secure Window
      </button>

      {/* ✅ INLINE PDF */}
      <div style={pdfContainerStyle} ref={pageWrapperRef}>
        <h3>Secure Inline PDF</h3>

        <Document
          file="/print-pdf.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={(err) => {
            console.error('PDF load failed', err);
            showTempWarning('Failed to load PDF');
          }}
          
        >
         <Page
  pageNumber={pageNumber}
  scale={1.4}
  renderMode="canvas"
  renderTextLayer={false}        // ✅ DISABLE duplicate corrupted text
  renderAnnotationLayer={false}
  loading={<div>Rendering page…</div>}
/>

        </Document>

        <div style={{ marginTop: 12, textAlign: 'center' }}>
          <button
            onClick={() => setPageNumber(p => Math.max(1, p - 1))}
            disabled={pageNumber <= 1}
          >
            Previous
          </button>

          <span style={{ margin: '0 12px' }}>
            Page {pageNumber} of {numPages ?? '—'}
          </span>

          <button
            onClick={() => setPageNumber(p => Math.min(numPages || 1, p + 1))}
            disabled={!numPages || pageNumber >= (numPages || 1)}
          >
            Next
          </button>
        </div>
      </div>

      {/* ✅ PROTECTED IMAGE */}
      <div style={protectedImageContainerStyles}>
        <img src={protectedImage} alt="protected" style={imageElementStyle} />
        <div style={imageWatermarkStyle}>CONFIDENTIAL — {username}</div>
      </div>

      {warningMessage && (
        <div style={{ color: 'red', marginTop: 12, fontWeight: 700 }}>
          {warningMessage}
        </div>
      )}
    </div>
  );
};

export default Portal;
