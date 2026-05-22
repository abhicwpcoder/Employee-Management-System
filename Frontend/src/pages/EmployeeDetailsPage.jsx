import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, FiEdit2, FiTrash2, FiUser, FiMail, FiPhone, 
  FiBriefcase, FiMapPin, FiCalendar, FiShield, FiCheckCircle, FiXCircle
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const EmployeeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('token');
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api/v1';

  const fetchEmployee = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/employees/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setEmployee(data.data);
      } else {
        toast.error('Employee not found');
        navigate('/employees');
      }
    } catch (error) {
      toast.error('Failed to load employee');
    } finally {
      setLoading(false);
    }
  }, [id, token, API_URL, navigate]);

  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const response = await fetch(`${API_URL}/employees/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          toast.success('Employee deleted successfully');
          navigate('/employees');
        }
      } catch (error) {
        toast.error('Delete failed');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>;
  }

  if (!employee) return null;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <Link to="/employees" className="flex items-center text-gray-600 hover:text-gray-900">
          <FiArrowLeft className="mr-2" /> Back to Employees
        </Link>
        <div className="flex gap-3">
          {(user.role === 'admin' || user.role === 'manager' || user.id === employee.id) && (
            <Link to={`/employees/edit/${employee.id}`} className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg">
              <FiEdit2 className="mr-2" /> Edit
            </Link>
          )}
          {user.role === 'admin' && user.id !== employee.id && (
            <button onClick={handleDelete} className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              <FiTrash2 className="mr-2" /> Delete
            </button>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-6">
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-3xl font-bold">
            {employee.first_name?.charAt(0)}{employee.last_name?.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold">{employee.first_name} {employee.last_name}</h1>
            <p className="text-purple-100 mt-1">@{employee.username}</p>
            <div className="flex gap-3 mt-2">
              <span className={`px-3 py-1 text-sm rounded-full capitalize ${employee.role === 'admin' ? 'bg-purple-500' : employee.role === 'manager' ? 'bg-blue-500' : 'bg-green-500'}`}>
                <FiShield className="inline mr-1" /> {employee.role}
              </span>
              <span className={`px-3 py-1 text-sm rounded-full flex items-center gap-1 ${employee.is_active ? 'bg-green-500' : 'bg-red-500'}`}>
                {employee.is_active ? <FiCheckCircle /> : <FiXCircle />}
                {employee.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><FiUser className="text-purple-600" /> Personal Information</h2>
          <div className="space-y-3">
            <div><label className="text-xs text-gray-500 uppercase">Full Name</label><p className="font-medium">{employee.first_name} {employee.last_name}</p></div>
            <div><label className="text-xs text-gray-500 uppercase">Email Address</label><p className="font-medium flex items-center gap-2"><FiMail className="text-gray-400" /> {employee.email}</p></div>
            <div><label className="text-xs text-gray-500 uppercase">Phone Number</label><p className="font-medium flex items-center gap-2"><FiPhone className="text-gray-400" /> {employee.phone || 'Not provided'}</p></div>
            <div><label className="text-xs text-gray-500 uppercase">Employee ID</label><p className="font-medium">{employee.employee_id || 'Not assigned'}</p></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><FiBriefcase className="text-purple-600" /> Employment Information</h2>
          <div className="space-y-3">
            <div><label className="text-xs text-gray-500 uppercase">Department</label><p className="font-medium">{employee.department || 'Not assigned'}</p></div>
            <div><label className="text-xs text-gray-500 uppercase">Position</label><p className="font-medium">{employee.position || 'Not assigned'}</p></div>
            <div><label className="text-xs text-gray-500 uppercase">Hire Date</label><p className="font-medium flex items-center gap-2"><FiCalendar className="text-gray-400" /> {employee.hire_date ? new Date(employee.hire_date).toLocaleDateString() : 'Not specified'}</p></div>
            {(user.role === 'admin' || user.role === 'manager') && (
              <div><label className="text-xs text-gray-500 uppercase">Salary</label><p className="font-medium">${employee.salary ? Number(employee.salary).toLocaleString() : 'Confidential'}</p></div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><FiMapPin className="text-purple-600" /> Address</h2>
          <div className="space-y-3">
            <div><label className="text-xs text-gray-500 uppercase">Address</label><p className="font-medium">{employee.address || 'Not provided'}</p></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs text-gray-500 uppercase">City</label><p className="font-medium">{employee.city || 'N/A'}</p></div>
              <div><label className="text-xs text-gray-500 uppercase">State</label><p className="font-medium">{employee.state || 'N/A'}</p></div>
              <div><label className="text-xs text-gray-500 uppercase">Zip Code</label><p className="font-medium">{employee.zip_code || 'N/A'}</p></div>
              <div><label className="text-xs text-gray-500 uppercase">Country</label><p className="font-medium">{employee.country || 'N/A'}</p></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><FiShield className="text-purple-600" /> Account Information</h2>
          <div className="space-y-3">
            <div><label className="text-xs text-gray-500 uppercase">Username</label><p className="font-medium">@{employee.username}</p></div>
            <div><label className="text-xs text-gray-500 uppercase">Role</label><p className="font-medium capitalize">{employee.role}</p></div>
            <div><label className="text-xs text-gray-500 uppercase">Last Login</label><p className="font-medium">{employee.last_login ? new Date(employee.last_login).toLocaleString() : 'Never'}</p></div>
            <div><label className="text-xs text-gray-500 uppercase">Member Since</label><p className="font-medium">{new Date(employee.createdAt).toLocaleDateString()}</p></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsPage;