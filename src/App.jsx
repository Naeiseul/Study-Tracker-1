import { useState, useEffect } from 'react';
import Dashboard from './Dashboard.jsx';
import DemoDashboard from './DemoDashboard.jsx';
import './App.css';

const SUBSCRIBE_OPTIONS = [
  { id: 'cambridge', label: 'Cambridge', img: '/assets/cambridge.jpg' },
  { id: 'dbe', label: 'DBE', img: '/assets/dbe.jpg' },
  { id: 'ieb', label: 'IEB', img: '/assets/ieb.webp' },
  { id: 'university', label: 'University', img: '/assets/university.svg' },
];

function getUsers() {
  const saved = localStorage.getItem('st-users');
  return saved ? JSON.parse(saved) : {
    'ilovemyhyang@nae': { password: 'myhyang', name: 'Dev' },
  };
}

function saveUser(email, password, name) {
  const users = getUsers();
  users[email.toLowerCase()] = { password, name };
  localStorage.setItem('st-users', JSON.stringify(users));
}

export default function App() {
  const [view, setView] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [failType, setFailType] = useState(null);
  const [shaking, setShaking] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [fading, setFading] = useState(false);
  const [demoMode, setDemoMode] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('st-current-user');
    return saved || null;
  });

  useEffect(() => {
    if (currentUser) {
      setLoggedIn(true);
    }
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    setError('');
    setFailType(null);

    if (!email || !password) {
      setError('Please fill in all fields');
      triggerShake();
      return;
    }

    const users = getUsers();
    const user = users[email.toLowerCase()];

    if (!user) {
      setError('Account not found');
      setFailType('username');
      triggerShake();
      return;
    }

    if (user.password !== password) {
      setError('Incorrect password');
      setFailType('password');
      triggerShake();
      return;
    }

    localStorage.setItem('st-current-user', email.toLowerCase());
    setCurrentUser(email.toLowerCase());
    setFading(true);
    setTimeout(() => setLoggedIn(true), 350);
  }

  function handleRegister(e) {
    e.preventDefault();
    setError('');
    setFailType(null);

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      triggerShake();
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setFailType('password');
      triggerShake();
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setFailType('password');
      triggerShake();
      return;
    }

    const users = getUsers();
    if (users[email.toLowerCase()]) {
      setError('Account already exists');
      setFailType('username');
      triggerShake();
      return;
    }

    saveUser(email, password, name);
    localStorage.setItem('st-current-user', email.toLowerCase());
    setCurrentUser(email.toLowerCase());
    setFading(true);
    setTimeout(() => setLoggedIn(true), 350);
  }

  function triggerShake() {
    setShaking(true);
    setTimeout(() => setShaking(false), 400);
  }

  function handleLogout() {
    localStorage.removeItem('st-current-user');
    setCurrentUser(null);
    setLoggedIn(false);
    setFading(false);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setError('');
    setFailType(null);
    setView('login');
  }

  function resetForm() {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setError('');
    setFailType(null);
  }

  if (demoMode) {
    return (
      <DemoDashboard
        curriculum={demoMode}
        onBack={() => setDemoMode(null)}
        onSubscribe={() => {
          setDemoMode(null);
          setView('register');
        }}
      />
    );
  }

  if (loggedIn) {
    return <Dashboard onLogout={handleLogout} userEmail={currentUser} />;
  }

  return (
    <div className={`login-page${fading ? ' fade-out' : ''}`}>
      <video
        className="login-video"
        src="/assets/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        onContextMenu={(e) => e.preventDefault()}
        controlsList="nodownload"
      />
      <div className="login-overlay" />

      {/* Sidebar */}
      <div className={`login-sidebar${sidebarOpen ? '' : ' collapsed'}`}>
        <div className="sidebar-content">
          <div className="sidebar-header">
            <span>Subscribe</span>
            <span>here</span>
          </div>
          <div className="sidebar-arrow">↓</div>
          <div className="sidebar-options">
            {SUBSCRIBE_OPTIONS.map(opt => (
              <button
                key={opt.id}
                className="sidebar-btn"
                onClick={() => setDemoMode(opt.id)}
                aria-label={`Preview ${opt.label}`}
              >
                <img
                  className={`sidebar-img${opt.id !== 'cambridge' ? ' sidebar-img-contain' : ''}`}
                  src={opt.img}
                  alt={opt.label}
                />
                <span className="sidebar-label">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <button
        className={`sidebar-toggle${sidebarOpen ? '' : ' show'}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
      >
        {sidebarOpen ? '‹' : '›'}
      </button>

      {/* Login / Register box */}
      {view === 'login' ? (
        <form className="login-box" onSubmit={handleLogin}>
          <div className="login-title">
            <img className="login-logo" src="/assets/logo.png" alt="a+ logo" />
            Study Tracker
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="email">Email</label>
            <input
              id="email"
              className={`login-input${shaking && failType === 'username' ? ' error' : ''}`}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="password">Password</label>
            <input
              id="password"
              className={`login-input${shaking && failType === 'password' ? ' error' : ''}`}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <div className="login-error">{error}</div>

          <button className="login-btn" type="submit">
            Log in
          </button>

          <div className="login-forgot-row">
            <button type="button" className="login-forgot" onClick={() => alert('Check your email address')}>
              Forgot username?
            </button>
            <button type="button" className="login-forgot" onClick={() => alert('Password reset coming soon')}>
              Forgot password?
            </button>
          </div>

          <div className="login-divider">
            <span className="login-divider-line" />
            <span className="login-divider-text">new here?</span>
            <span className="login-divider-line" />
          </div>

          <button
            type="button"
            className="login-btn login-btn-register"
            onClick={() => { resetForm(); setView('register'); }}
          >
            Create account
          </button>

          <div className="login-try-text">
            Or try a free <span className="login-demo-highlight">DEMO</span> — pick your board on the left.
          </div>
        </form>
      ) : (
        <form className="login-box login-box-register" onSubmit={handleRegister}>
          <div className="login-title">
            <img className="login-logo" src="/assets/logo.png" alt="a+ logo" />
            Create Account
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="reg-name">Full Name</label>
            <input
              id="reg-name"
              className="login-input"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="reg-email">Email</label>
            <input
              id="reg-email"
              className={`login-input${shaking && failType === 'username' ? ' error' : ''}`}
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="reg-password">Password</label>
            <input
              id="reg-password"
              className={`login-input${shaking && failType === 'password' ? ' error' : ''}`}
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="reg-confirm">Confirm Password</label>
            <input
              id="reg-confirm"
              className={`login-input${shaking && failType === 'password' ? ' error' : ''}`}
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <div className="login-error">{error}</div>

          <button className="login-btn" type="submit">
            Create account
          </button>

          <div className="login-divider">
            <span className="login-divider-line" />
            <span className="login-divider-text">already have an account?</span>
            <span className="login-divider-line" />
          </div>

          <button
            type="button"
            className="login-btn login-btn-register"
            onClick={() => { resetForm(); setView('login'); }}
          >
            Log in instead
          </button>
        </form>
      )}
    </div>
  );
}
