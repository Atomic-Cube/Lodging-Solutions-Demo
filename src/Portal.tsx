import React, { useState, useEffect, useCallback, useRef } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import protectedImage from "./apple.jpg";
import { Document, Page, pdfjs } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";

// ---------- teammate UI imports ----------
import MainLayout from "./frontend/layouts/MainLayout";
import Home from "./frontend/pages/Home";
import About from "./frontend/pages/About";
import Photos from "./frontend/pages/Photos";
import Videos from "./frontend/pages/Videos";
import ThreeSixty from "./frontend/pages/ThreeSixty";
import TimeLapses from "./frontend/pages/TimeLapses";
import Sitemap from "./frontend/pages/Sitemap";
import NotFound from "./frontend/pages/NotFound";

// ---------- PDF WORKER ----------
try {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
  ).toString();
} catch {
  pdfjs.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js";
}

// ---------- TYPES ----------
interface PortalProps {
  username?: string;
  closeWindow: () => void;
}

/* ===================== ✅ STABLE SECURE PDF COMPONENT (NO REFRESH) ===================== */
const SecurePDF = React.memo(function SecurePDF({
  pageNumber,
  setPageNumber,
}: {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const onLoad = useCallback((pdf: PDFDocumentProxy) => {
    setNumPages(pdf.numPages);
  }, []);

  return (
    <div style={pdfContainerStyle} ref={wrapperRef}>
      <h3>Secure Inline PDF</h3>

      <Document file="/print1.pdf" onLoadSuccess={onLoad}>
        <Page
          pageNumber={pageNumber}
          scale={1.4}
          renderMode="canvas"
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>

      <div style={{ marginTop: 12, textAlign: "center" }}>
        <button onClick={() => setPageNumber((p) => Math.max(1, p - 1))} disabled={pageNumber <= 1}>
          Previous
        </button>

        <span style={{ margin: "0 12px" }}>
          Page {pageNumber} of {numPages ?? "—"}
        </span>

        <button
          onClick={() => setPageNumber((p) => Math.min(numPages || 1, p + 1))}
          disabled={!numPages || pageNumber >= (numPages || 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
});

/* ===================== ✅ MAIN PORTAL ===================== */
const Portal: React.FC<PortalProps> = ({ username = "UNKNOWN", closeWindow }) => {
  const [isBlurred, setIsBlurred] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
  const disableRightClick = (e: MouseEvent) => {
    e.preventDefault();
  };

  window.addEventListener("contextmenu", disableRightClick);

  return () => {
    window.removeEventListener("contextmenu", disableRightClick);
  };
}, []);

  // ✅ LIVE FORENSIC CLOCK (NO PDF REFRESH NOW)

  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const showTempWarning = useCallback((msg: string, ms = 2500) => {
    setWarningMessage(msg);
    setTimeout(() => setWarningMessage(""), ms);
  }, []);

  const firstRunRef = useRef(true);

  useEffect(() => {
    const handleBlur = () => {
      if (firstRunRef.current) return;
      setIsBlurred(true);
      showTempWarning("Window lost focus — content blurred");
    };

    const handleFocus = () => {
      if (firstRunRef.current) return;
      setTimeout(() => setIsBlurred(false), 150);
    };

    const handleVisibility = () => {
      if (firstRunRef.current) return;
      if (document.hidden) {
        setIsBlurred(true);
        showTempWarning("Tab hidden — content blurred");
      } else {
        setTimeout(() => setIsBlurred(false), 150);
      }
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleVisibility);

    const unlock = setTimeout(() => {
      firstRunRef.current = false;
    }, 600);

    return () => {
      clearTimeout(unlock);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [showTempWarning]);

  return (
    <BrowserRouter>
      <div style={portalStyles}>
        {isBlurred && (
          <div style={blurredOverlay}>
            <div style={warningAlert}>⚠️ SECURITY ALERT — CONTENT BLURRED</div>
          </div>
        )}

        <div style={pageWatermarkStyle}>
          USER: {username.toUpperCase()} —{" "}
          {now.toLocaleDateString("en-CA")} {now.toLocaleTimeString("en-GB")}
        </div>


        {/* ✅ ROUTE CONTAINER LOCKED TO GRID SLOT */}
<div style={{ minHeight: 0, overflow: "hidden", display: "flex" }}>
  {/* ✅ ONLY THIS AREA SCROLLS */}
<div style={{ flex: 1, overflowY: "auto", minHeight: 0 }}>
  <Routes>
    <Route path="/" element={<MainLayout><Home /></MainLayout>} />
    <Route path="/about" element={<MainLayout><About /></MainLayout>} />

    <Route
      path="/photos"
      element={
        <MainLayout>
          <Photos />
          <div style={protectedImageContainerStyles}>
            <img src={protectedImage} style={imageElementStyle} />
            
            <div style={imageWatermarkStyle}>
              CONFIDENTIAL — {username}
            </div>
          </div>
          <div style={protectedImageContainerStyles}>
            <img src={protectedImage} style={imageElementStyle} />
            
            <div style={imageWatermarkStyle}>
              CONFIDENTIAL — {username}
            </div>
          </div>
          <div style={protectedImageContainerStyles}>
            <img src={protectedImage} style={imageElementStyle} />
            
            <div style={imageWatermarkStyle}>
              CONFIDENTIAL — {username}
            </div>
          </div>
        </MainLayout>
      }
    />

    {/*
    <Route path="/videos" element={<MainLayout><Videos /></MainLayout>} />
    <Route path="/360" element={<MainLayout><ThreeSixty /></MainLayout>} />
    }*/} 

    {/* ✅ SPECSSHEET — PDF ONLY, SCROLLS PROPERLY */}
    <Route
      path="/specsheet"
      element={
        <MainLayout>
          <SecurePDF
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </MainLayout>
      }
    />

    
    <Route path="/sitemap" element={<MainLayout><Sitemap /></MainLayout>} />
    <Route path="/404" element={<MainLayout><NotFound /></MainLayout>} />
    <Route path="*" element={<Navigate to="/404" replace />} />
  </Routes>
</div>

</div>


        {warningMessage && (
          <div style={{ color: "red", marginTop: 12, fontWeight: 700 }}>
            {warningMessage}
          </div>
        )}
      </div>
    </BrowserRouter>
  );
};

export default Portal;

/* ===================== ✅ STYLES ===================== */
const portalStyles: React.CSSProperties = {
  userSelect: "none",
  height: "100vh",
  width: "100vw",
  boxSizing: "border-box",
  fontFamily: "sans-serif",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden", // ✅ lock outer shell only
};



const blurredOverlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10000,
  color: "white",
};

const warningAlert: React.CSSProperties = {
  backgroundColor: "#cc0000",
  padding: "18px",
  borderRadius: "8px",
  fontSize: "1.1em",
  fontWeight: "700",
};

const pdfContainerStyle: React.CSSProperties = {
  border: "1px solid #999",
  padding: "12px",
  background: "#fafafa",
  userSelect: "none",
  maxWidth: "900px",
  margin: "0 auto",
  height: "100%",        // ✅ LOCKED
  minHeight: 0,          // ✅ ✅ ✅ THIS FIXES THE SCROLL BUG
  overflowY: "auto",     // ✅ ONLY PDF SCROLLS
  overflowX: "hidden",
};



const protectedImageContainerStyles: React.CSSProperties = {
  width: "600px",
  height: "400px",
  margin: "20px auto",
  position: "relative",
  overflow: "hidden",
  border: "1px solid #007bff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#222",
};

const imageElementStyle: React.CSSProperties = {
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "cover",
  display: "block",
  pointerEvents: "none",
  userSelect: "none",
};

const imageWatermarkStyle: React.CSSProperties = {
  position: "absolute",
  transform: "rotate(-30deg)",
  opacity: 0.24,
  color: "#fff",
  fontSize: "3rem",
  fontWeight: 700,
  pointerEvents: "none",
  userSelect: "none",
  whiteSpace: "nowrap",
};

const pageWatermarkStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "2.8rem",
  color: "red",
  opacity: 0.18,
  transform: "rotate(-35deg)",
  pointerEvents: "none",
  zIndex: 9999,
};
