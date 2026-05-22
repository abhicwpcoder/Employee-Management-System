import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiEdit2 } from 'react-icons/fi';
import EmployeeForm from '../components/employees/EmployeeForm';
import toast from 'react-hot-toast';

const EditEmployeePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const token = localStorage.getItem('token');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api/v1';

  const fetchEmployee = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/employees/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) setEmployee(data.data);
      else toast.error('Employee not found');
    } catch (error) {
      toast.error('Failed to load employee');
    } finally {
      setLoading(false);
    }
  }, [id, token, API_URL]);

  useEffect(() => { fetchEmployee(); }, [fetchEmployee]);

  const handleSubmit = async (data) => {
    setSaving(true);
    try {
      const response = await fetch(`${API_URL}/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        toast.success('Employee updated successfully');
        navigate(`/employees/${id}`);
      } else {
        toast.error('Update failed');
      }
    } catch (error) {
      toast.error('Server error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div></div>;
  if (!employee) return null;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6"><Link to={`/employees/${id}`} className="text-slate-400 hover:text-white flex items-center gap-2 transition"><FiArrowLeft /> Back to Profile</Link></div>
        <div className="glass rounded-2xl p-8"><div className="flex items-center gap-3 mb-6"><div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"><FiEdit2 className="h-6 w-6 text-white" /></div><h1 className="text-2xl font-bold text-white">Edit Employee</h1></div><EmployeeForm initialData={employee} onSubmit={handleSubmit} isLoading={saving} /></div>
      </div>
    </div>
  );
};

export default EditEmployeePage;