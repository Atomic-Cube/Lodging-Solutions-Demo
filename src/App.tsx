import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import usePortalWindow from './usePortalWindow';

const App = () => {
  const { openPortalWindow } = usePortalWindow();

  return (
    <Routes>
      <Route
        path="/"
        element={<Login openPortal={openPortalWindow} />}
      />
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default App;
