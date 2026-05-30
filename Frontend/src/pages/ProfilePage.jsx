import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiBriefcase, FiMapPin, FiEdit2} from 'react-icons/fi';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api/v1';

  const fetchProfile = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) setProfile(data.data);
    } catch (error) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  }, [token, API_URL]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTopColor: '#f97316', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}></div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
      {/* Header Card */}
      <div style={{
        background: 'linear-gradient(135deg, #f97316, #10b981)',
        borderRadius: '1rem',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        color: 'white'
      }}>
        {/* Use flex-wrap to avoid overlap */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', fontWeight: 'bold', color: '#f97316'
            }}>
              {profile.first_name?.charAt(0)}{profile.last_name?.charAt(0)}
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.25rem' }}>{profile.first_name} {profile.last_name}</h1>
              <p style={{ opacity: 0.9 }}>@{profile.username}</p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem' }}>
                  {profile.role}
                </span>
                <span style={{ background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.75rem', borderRadius: '2rem', fontSize: '0.75rem' }}>
                  Active
                </span>
              </div>
            </div>
          </div>
          <Link
            to={`/employees/edit/${profile.id}`}
            style={{
              background: 'white',
              color: '#f97316',
              padding: '0.5rem 1rem',
              borderRadius: '2rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: '500',
              transition: '0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f97316'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#f97316'; }}
          >
            <FiEdit2 /> Edit Profile
          </Link>
        </div>
      </div>

      {/* Responsive Grid - stacks on mobile */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* Personal Info */}
        <div style={{ background: 'white', borderRadius: '1rem', padding: '1.25rem', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiUser style={{ color: '#f97316' }} /> Personal Info
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div><label style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Full Name</label><p style={{ fontWeight: '500' }}>{profile.first_name} {profile.last_name}</p></div>
            <div><label style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Email</label><p style={{ wordBreak: 'break-all' }}>{profile.email}</p></div>
            <div><label style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Phone</label><p>{profile.phone || 'Not provided'}</p></div>
            <div><label style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Employee ID</label><p>{profile.employee_id || 'Not assigned'}</p></div>
          </div>
        </div>

        {/* Employment */}
        <div style={{ background: 'white', borderRadius: '1rem', padding: '1.25rem', border: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiBriefcase style={{ color: '#10b981' }} /> Employment
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div><label style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Department</label><p>{profile.department || 'Not assigned'}</p></div>
            <div><label style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Position</label><p>{profile.position || 'Not assigned'}</p></div>
            <div><label style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Hire Date</label><p>{profile.hire_date ? new Date(profile.hire_date).toLocaleDateString() : 'N/A'}</p></div>
          </div>
        </div>

        {/* Address - full width on larger screens */}
        <div style={{ background: 'white', borderRadius: '1rem', padding: '1.25rem', border: '1px solid #e2e8f0', gridColumn: '1 / -1' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiMapPin style={{ color: '#f97316' }} /> Address
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0.75rem'
          }}>
            <div><label style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Address</label><p>{profile.address || 'Not provided'}</p></div>
            <div><label style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>City</label><p>{profile.city || 'N/A'}</p></div>
            <div><label style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>State</label><p>{profile.state || 'N/A'}</p></div>
            <div><label style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Zip Code</label><p>{profile.zip_code || 'N/A'}</p></div>
            <div><label style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase' }}>Country</label><p>{profile.country || 'N/A'}</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;