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

/* ===================== ✅ SECURE PDF WITH ZOOM ===================== */
const SecurePDF = React.memo(function SecurePDF({
  pageNumber,
  setPageNumber,
}: {
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [scale, setScale] = useState(1); // zoom factor
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [pdfWidth, setPdfWidth] = useState(800); // default PDF page width

  const onLoad = useCallback((pdf: PDFDocumentProxy) => {
    setNumPages(pdf.numPages);

    // Get first page dimensions to compute initial scale
    pdf.getPage(1).then((page) => {
      const viewport = page.getViewport({ scale: 1 });
      setPdfWidth(viewport.width);

      const containerWidth = (wrapperRef.current?.clientWidth ?? 900) - 40; // ✅ add 20px margin on each side
      setScale(containerWidth / viewport.width); // fit width initially
    });
  }, []);

  const zoomIn = () => setScale((s) => Math.min(s + 0.2, 3));
  const zoomOut = () => setScale((s) => Math.max(s - 0.2, 0.5));

  return (
    <div style={pdfContainerStyle} ref={wrapperRef}>
      {/* Zoom buttons at top */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
        <button onClick={zoomOut} style={{ marginRight: 8 }}>- Zoom Out</button>
        <button onClick={zoomIn} style={{ marginRight: 8 }}>+ Zoom In</button>
        <span>Zoom: {(scale * 100).toFixed(0)}%</span>
      </div>

      <Document file="/Laundry-Slick.pdf" onLoadSuccess={onLoad}>
        <Page
          pageNumber={pageNumber}
          scale={scale}
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
      e.stopImmediatePropagation();
    };
    document.addEventListener("contextmenu", disableRightClick, {
      capture: true,
      passive: false,
    });
    return () => {
      document.removeEventListener("contextmenu", disableRightClick, true);
    };
  }, []);

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
      <div
        style={portalStyles}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {isBlurred && (
          <div style={blurredOverlay}>
            <div style={warningAlert}>⚠️ SECURITY ALERT — CONTENT BLURRED</div>
          </div>
        )}

        <div style={pageWatermarkStyle}>
          USER: {username.toUpperCase()} — {now.toLocaleDateString("en-CA")} {now.toLocaleTimeString("en-GB")}
        </div>

        <div style={{ minHeight: 0, overflow: "hidden", display: "flex" }}>
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
                      <div style={imageWatermarkStyle}>CONFIDENTIAL — {username}</div>
                    </div>
                  </MainLayout>
                }
              />

              <Route
                path="/specsheet"
                element={
                  <MainLayout>
                    <SecurePDF pageNumber={pageNumber} setPageNumber={setPageNumber} />
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
          <div style={{ color: "red", marginTop: 12, fontWeight: 700 }}>{warningMessage}</div>
        )}
      </div>
    </BrowserRouter>
  );
};

export default Portal;

/* ===================== ✅ STYLES ===================== */
const portalStyles: any = {
  userSelect: "none",
  height: "100vh",
  width: "100vw",
  boxSizing: "border-box",
  fontFamily: "sans-serif",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  WebkitUserDrag: "none",
  userDrag: "none",
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
  maxWidth: "100%",
  margin: "0 auto",
  minHeight: 0,
  height: "100%",
  overflowY: "auto",
  overflowX: "auto", // ✅ allow horizontal scroll
  display: "flex",
  flexDirection: "column",
  alignItems: "center", // center PDF
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
