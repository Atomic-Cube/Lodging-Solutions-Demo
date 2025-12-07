import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Portal from './Portal';

// --- CONFIGURATION ---
const DEMO_USERNAME = 'client';
const DEMO_PASSWORD = 'demo';

// --- PROPS TYPE ---
type LoginProps = {
  openPortal: () => Window | null;
};

// --- STYLES ---
const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center' as const,
    backgroundColor: '#f9f9f9',
  },
  form: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '15px',
  },
  inputGroup: {
    textAlign: 'left' as const,
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '5px 0 10px 0',
    display: 'inline-block',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box' as const,
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    margin: '0',
  },
  hint: {
    marginTop: '20px',
    fontSize: '0.9em',
    color: '#666',
    borderTop: '1px solid #eee',
    paddingTop: '10px',
  },
};

// --- LOGIN COMPONENT ---
const Login: React.FC<LoginProps> = ({ openPortal }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      console.log('Login successful! Opening secure window...');

      const newWindow = openPortal();

      if (newWindow) {
        const rootElement = newWindow.document.getElementById('root');

        const closeWindow = () => {
          newWindow.close();
        };

        if (rootElement) {
          const portalRoot = createRoot(rootElement);
          portalRoot.render(
            <Portal username={username} closeWindow={closeWindow} />
          );
        } else {
          console.error('Could not find root element in new window.');
        }
      }

      setUsername('');
      setPassword('');
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Secure Portal Login</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>
          Sign In
        </button>
      </form>

      <p style={styles.hint}>
        Demo Credentials: Username: <b>{DEMO_USERNAME}</b> | Password:{' '}
        <b>{DEMO_PASSWORD}</b>
      </p>
    </div>
  );
};

export default Login;
