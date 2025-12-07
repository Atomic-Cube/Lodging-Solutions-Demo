import { useState, useCallback } from 'react';

const usePortalWindow = () => {
  // ✅ Properly typed state: can be Window OR null
  const [portalWindow, setPortalWindow] = useState<Window | null>(null);

  const openPortalWindow = useCallback((): Window | null => {
    const windowFeatures =
      'toolbar=no,scrollbars=no,resizable=no,status=no,width=800,height=600';

    // ✅ window.open can return Window | null
    const newWindow = window.open('', '_blank', windowFeatures);

    if (!newWindow) {
      alert(
        'Popup blocker prevented opening the secure portal window. Please disable it.'
      );
      return null;
    }

    // ✅ Safe document write
    newWindow.document.open();
    newWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Secure Confidential Portal</title>
          <style>
            body { margin: 0; overflow: hidden; }
            #root { height: 100vh; width: 100vw; }
          </style>
        </head>
        <body>
          <div id="root">Loading Secure Content...</div>
        </body>
      </html>
    `);
    newWindow.document.close();

    // ✅ Now TypeScript is happy
    setPortalWindow(newWindow);
    return newWindow;
  }, []);

  return { portalWindow, openPortalWindow };
};

export default usePortalWindow;
