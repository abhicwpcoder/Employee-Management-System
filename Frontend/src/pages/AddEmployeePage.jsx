import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiSave } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AddEmployeePage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api/v1';

  const [formData, setFormData] = useState({
    first_name: '', last_name: '', email: '', phone: '',
    department: '', position: '', hire_date: '', salary: '',
    username: '', password: '', confirmPassword: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        toast.success('Employee created');
        navigate('/employees');
      } else toast.error('Failed');
    } catch (err) { toast.error('Server error'); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <Link to="/employees" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563', textDecoration: 'none' }}>
          <FiArrowLeft /> Back to Employees
        </Link>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>Add New Employee</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            <div className="form-group"><label className="form-label">First Name</label><input name="first_name" className="form-input" required onChange={handleChange} /></div>
            <div className="form-group"><label className="form-label">Last Name</label><input name="last_name" className="form-input" required onChange={handleChange} /></div>
            <div className="form-group"><label className="form-label">Email</label><input name="email" type="email" className="form-input" required onChange={handleChange} /></div>
            <div className="form-group"><label className="form-label">Phone</label><input name="phone" className="form-input" onChange={handleChange} /></div>
            <div className="form-group"><label className="form-label">Department</label><input name="department" className="form-input" onChange={handleChange} /></div>
            <div className="form-group"><label className="form-label">Position</label><input name="position" className="form-input" onChange={handleChange} /></div>
            <div className="form-group"><label className="form-label">Hire Date</label><input name="hire_date" type="date" className="form-input" onChange={handleChange} /></div>
            <div className="form-group"><label className="form-label">Salary</label><input name="salary" type="number" className="form-input" onChange={handleChange} /></div>
            <div className="form-group"><label className="form-label">Username</label><input name="username" className="form-input" required onChange={handleChange} /></div>
            <div className="form-group"><label className="form-label">Password</label><input name="password" type="password" className="form-input" required onChange={handleChange} /></div>
            <div className="form-group"><label className="form-label">Confirm Password</label><input name="confirmPassword" type="password" className="form-input" required onChange={handleChange} /></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <Link to="/employees" className="btn-secondary">Cancel</Link>
            <button type="submit" disabled={loading} className="btn-primary"><FiSave /> {loading ? 'Saving...' : 'Save Employee'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeePage;