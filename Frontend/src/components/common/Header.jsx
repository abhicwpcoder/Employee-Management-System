import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiLogOut } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
    toast.success('Logged out');
  };

  // Show hamburger only on mobile/tablet (via CSS media query in component)
  const isMobile = window.innerWidth < 1024;

  return (
    <header style={{
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      padding: '0.75rem 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#f97316',
            padding: '0.5rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FiMenu size={24} />
        </button>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(135deg, #f97316, #10b981)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
          XCELTECH
        </div>
      </div>

      {/* Desktop nav (hidden on mobile) */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }} className="desktop-nav">
        <Link
          to="/dashboard"
          className={location.pathname === '/dashboard' ? 'active' : ''}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '2rem',
            textDecoration: 'none',
            color: location.pathname === '/dashboard' ? '#f97316' : '#e2e8f0',
            background: location.pathname === '/dashboard' ? 'rgba(249,115,22,0.1)' : 'transparent',
          }}
        >
          Dashboard
        </Link>
        <Link
          to="/employees"
          className={location.pathname === '/employees' ? 'active' : ''}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '2rem',
            textDecoration: 'none',
            color: location.pathname === '/employees' ? '#f97316' : '#e2e8f0',
            background: location.pathname === '/employees' ? 'rgba(249,115,22,0.1)' : 'transparent',
          }}
        >
          Employees
        </Link>
        <Link
          to="/profile"
          className={location.pathname === '/profile' ? 'active' : ''}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '2rem',
            textDecoration: 'none',
            color: location.pathname === '/profile' ? '#f97316' : '#e2e8f0',
            background: location.pathname === '/profile' ? 'rgba(249,115,22,0.1)' : 'transparent',
          }}
        >
          My Profile
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ textAlign: 'right', display: isMobile ? 'none' : 'block' }}>
          <div style={{ fontSize: '0.875rem', fontWeight: '500', color: 'white' }}>{user.firstName || user.username || 'User'}</div>
          <div style={{ fontSize: '0.75rem', opacity: 0.8, color: '#cbd5e1' }}>{user.role || 'employee'}</div>
        </div>
        <div style={{
          width: '2.5rem', height: '2.5rem', borderRadius: '50%',
          background: 'linear-gradient(135deg, #f97316, #10b981)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 'bold', color: 'white'
        }}>
          {(user.firstName?.charAt(0) || user.username?.charAt(0) || 'U').toUpperCase()}
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            color: '#f97316',
            padding: '0.5rem 1rem',
            borderRadius: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontWeight: '500'
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#f97316'; e.currentTarget.style.color = 'white'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = '#f97316'; }}
        >
          <FiLogOut size={16} /> <span className="logout-text">Logout</span>
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .logout-text {
            display: none;
          }
        }
        @media (min-width: 769px) {
          .desktop-nav {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;