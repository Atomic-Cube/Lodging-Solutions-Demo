import React, { useState, useEffect, useCallback, useRef } from 'react';
import protectedImage from './apple.jpg';

/* =======================
   ✅ PROPS TYPE
======================= */
interface PortalProps {
  username?: string;
  closeWindow: () => void;
}

/* =======================
   ✅ STYLES
======================= */
const portalStyles: React.CSSProperties = {
  userSelect: 'none',
  WebkitUserSelect: 'none',
  height: '100vh',
  width: '100vw',
  padding: '20px',
  boxSizing: 'border-box',
  overflow: 'auto',
  position: 'relative',
};

const blurredOverlay: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  backdropFilter: 'blur(15px)',
  WebkitBackdropFilter: 'blur(15px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
  color: 'white',
  textAlign: 'center',
  pointerEvents: 'auto',
};

const warningAlert: React.CSSProperties = {
  backgroundColor: '#cc0000',
  padding: '20px',
  borderRadius: '8px',
  fontSize: '1.2em',
  fontWeight: 'bold',
};

const contentStyles: React.CSSProperties = {
  padding: '10px',
  position: 'relative',
  backgroundImage: `repeating-linear-gradient(45deg, rgba(0,0,0,.02) 0, rgba(0,0,0,.02) 1px, transparent 1px, transparent 100px)`,
};

const protectedImageContainerStyles: React.CSSProperties = {
  backgroundImage: `url(${protectedImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  width: '600px',
  height: '400px',
  position: 'relative',
  overflow: 'hidden',
  margin: '20px auto',
  border: '1px solid #007bff',
  userSelect: 'none',
};

const imageWatermarkStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) rotate(-45deg)',
  opacity: 0.25,
  fontSize: '3em',
  pointerEvents: 'none',
  color: '#fff',
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
  width: '150%',
  height: '150%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const pageWatermarkStyle: React.CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) rotate(-45deg)',
  opacity: 0.08,
  fontSize: '2em',
  pointerEvents: 'none',
  color: 'red',
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
};

/* =======================
   ✅ COMPONENT
======================= */
const Portal: React.FC<PortalProps> = ({ username = 'UNKNOWN', closeWindow }) => {
  const [isBlurred, setIsBlurred] = useState<boolean>(!document.hasFocus());
  const [warningMessage, setWarningMessage] = useState<string>('');

  const blurLockRef = useRef<boolean>(false);
  const devtoolsDetectedRef = useRef<boolean>(false);
  const checkIntervalRef = useRef<number | null>(null);

  const showTempWarning = (msg: string, ms = 2500) => {
    setWarningMessage(msg);
    setTimeout(() => setWarningMessage(''), ms);
  };

  const handleNoCopy = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    showTempWarning('Copying is blocked.');
  }, []);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    showTempWarning('Right-click blocked.');
  }, []);

  const handleDragStart = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  /* =======================
     ✅ EFFECTS
  ======================= */

  useEffect(() => {
    const setBlur = (msg: string) => {
      if (blurLockRef.current) return;
      blurLockRef.current = true;
      setIsBlurred(true);
      showTempWarning(msg, 4000);
      setTimeout(() => (blurLockRef.current = false), 700);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setBlur('Window lost focus — blurred.');
      } else {
        setTimeout(() => setIsBlurred(false), 500);
      }
    };

    window.addEventListener('blur', () => setBlur('Window blurred.'));
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const detectDevTools = () => {
      const widthDiff = Math.abs(window.outerWidth - window.innerWidth);
      const heightDiff = Math.abs(window.outerHeight - window.innerHeight);
      const devtoolsOpen = widthDiff > 160 || heightDiff > 160;

      if (devtoolsOpen && !devtoolsDetectedRef.current) {
        devtoolsDetectedRef.current = true;
        setIsBlurred(true);
        showTempWarning('DevTools detected.');
      } else if (!devtoolsOpen && devtoolsDetectedRef.current) {
        devtoolsDetectedRef.current = false;
        setIsBlurred(false);
      }
    };

    checkIntervalRef.current = window.setInterval(detectDevTools, 1200);

    return () => {
      if (checkIntervalRef.current) clearInterval(checkIntervalRef.current);
    };
  }, []);

  /* =======================
     ✅ RENDER
  ======================= */
  return (
    <div
      style={portalStyles}
      onCopy={handleNoCopy}
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      draggable={false}
    >
      {isBlurred && (
        <div style={blurredOverlay}>
          <div style={warningAlert}>⚠️ Security Protection Active</div>
        </div>
      )}

      <div style={contentStyles}>
        <h1>CONFIDENTIAL PORTAL</h1>
        <p>
          Welcome, <strong>{username}</strong>
        </p>

        <button onClick={closeWindow} style={{ marginBottom: '20px', padding: '10px' }}>
          Close Secure Window
        </button>

        <div style={protectedImageContainerStyles}>
          <div style={imageWatermarkStyle}>CONFIDENTIAL — {username}</div>
        </div>

        <div style={pageWatermarkStyle}>
          USER: {username.toUpperCase()} — {new Date().toLocaleString()}
        </div>

        {warningMessage && <div style={{ color: 'red', fontWeight: 'bold' }}>{warningMessage}</div>}
      </div>
    </div>
  );
};

export default Portal;
