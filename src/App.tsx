import React from "react";
import Login from "./Login";
import "./App.css";

const App: React.FC = () => {
  const openPortal = () => {
    const newWindow = window.open("", "_blank", "width=1200,height=800,left=200,top=100");
    if (!newWindow) return null;

    // Write a minimal HTML skeleton
    newWindow.document.write(`
      <html>
        <head><title>Secure Portal</title></head>
        <body><div id="root"></div></body>
      </html>
    `);

    // Important: clone all <meta>, <link>, <style> tags from current document.head
    // so the popup receives the same CSS (Tailwind/App.css/fonts...)
    const currentHead = document.head;
    const newHead = newWindow.document.head;

    // Copy meta, link and style nodes
    currentHead.querySelectorAll("meta, link, style").forEach((node) => {
      try {
        newHead.appendChild(node.cloneNode(true));
      } catch (err) {
        // ignore clone errors for any odd nodes
        // eslint-disable-next-line no-console
        console.warn("Could not clone head node for popup", err);
      }
    });

    // Close the document so resources begin loading
    newWindow.document.close();

    return newWindow;
  };

  return <Login openPortal={openPortal} />;
};

export default App;

