import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiUserPlus, FiEye, FiEyeOff } from 'react-icons/fi';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', confirmPassword: '',
    firstName: '', lastName: '', phone: '', department: '', position: '', role: 'employee'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/v1/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        toast.success('Account created successfully!');
        navigate('/dashboard');
      } else {
        toast.error(data.error?.message || 'Registration failed');
      }
    } catch (err) {
      toast.error('Server error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #fef3c7 0%, #ecfdf5 100%)',
      padding: '1rem'
    }}>
      <div style={{
        maxWidth: '700px',
        width: '100%',
        background: 'white',
        borderRadius: '2rem',
        boxShadow: '0 20px 35px -10px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <div style={{
            width: '3.5rem',
            height: '3.5rem',
            background: 'linear-gradient(135deg, #f97316, #10b981)',
            borderRadius: '1.5rem',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '0.75rem'
          }}>
            <FiUserPlus size={24} color="white" />
          </div>
          <h2 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>Create Account</h2>
          <p style={{ color: '#cbd5e1', fontSize: '0.875rem' }}>Join our professional network</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem'
          }}>
            <div><label style={labelStyle}>First Name</label><input type="text" name="firstName" style={inputStyle} value={formData.firstName} onChange={handleChange} required /></div>
            <div><label style={labelStyle}>Last Name</label><input type="text" name="lastName" style={inputStyle} value={formData.lastName} onChange={handleChange} required /></div>
            <div><label style={labelStyle}>Username</label><input type="text" name="username" style={inputStyle} value={formData.username} onChange={handleChange} required /></div>
            <div><label style={labelStyle}>Email</label><input type="email" name="email" style={inputStyle} value={formData.email} onChange={handleChange} required /></div>
            <div><label style={labelStyle}>Phone (optional)</label><input type="tel" name="phone" style={inputStyle} value={formData.phone} onChange={handleChange} /></div>
            <div>
              <label style={labelStyle}>Role</label>
              <select name="role" style={inputStyle} value={formData.role} onChange={handleChange}>
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div><label style={labelStyle}>Department</label><input type="text" name="department" style={inputStyle} value={formData.department} onChange={handleChange} /></div>
            <div><label style={labelStyle}>Position</label><input type="text" name="position" style={inputStyle} value={formData.position} onChange={handleChange} /></div>
            <div>
              <label style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPassword ? 'text' : 'password'} name="password" style={inputStyle} value={formData.password} onChange={handleChange} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={eyeButtonStyle}>
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>
            <div><label style={labelStyle}>Confirm Password</label><input type="password" name="confirmPassword" style={inputStyle} value={formData.confirmPassword} onChange={handleChange} required /></div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #f97316, #10b981)',
              color: 'white',
              padding: '0.75rem',
              border: 'none',
              borderRadius: '2rem',
              fontWeight: '600',
              marginTop: '1.5rem',
              cursor: 'pointer',
              transition: '0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 8px 16px -4px rgba(249,115,22,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#f97316', fontWeight: '500', textDecoration: 'none' }}>Sign in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

// Reusable style objects
const labelStyle = {
  display: 'block',
  fontSize: '0.75rem',
  fontWeight: '500',
  color: '#1e293b',
  marginBottom: '0.25rem'
};

const inputStyle = {
  width: '100%',
  padding: '0.6rem 0.75rem',
  border: '1px solid #e2e8f0',
  borderRadius: '0.75rem',
  fontSize: '0.85rem',
  transition: 'all 0.2s'
};

const eyeButtonStyle = {
  position: 'absolute',
  right: '0.75rem',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'none',
  border: 'none',
  color: '#94a3b8',
  cursor: 'pointer'
};

// Add focus styles globally (optional – you can keep inline)
const addFocusStyles = () => {
  const style = document.createElement('style');
  style.textContent = `
    input:focus, select:focus {
      outline: none;
      border-color: #3b82f6 !important;
      box-shadow: 0 0 0 3px rgba(59,130,246,0.1) !important;
    }
  `;
  document.head.appendChild(style);
};
addFocusStyles();

export default RegisterPage;