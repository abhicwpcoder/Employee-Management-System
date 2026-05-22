import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiBriefcase, FiMapPin, FiCalendar, FiDollarSign } from 'react-icons/fi';

const EmployeeForm = ({ initialData, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState(initialData || {
    first_name: '', last_name: '', email: '', phone: '', username: '',
    password: '', confirmPassword: '', department: '', position: '', 
    hire_date: '', salary: '', address: '', city: '', state: '', zip_code: '', country: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="input-group"><input type="text" name="first_name" className="input-field" placeholder=" " value={formData.first_name} onChange={handleChange} required /><label className="input-label">First Name</label></div>
        <div className="input-group"><input type="text" name="last_name" className="input-field" placeholder=" " value={formData.last_name} onChange={handleChange} required /><label className="input-label">Last Name</label></div>
      </div>

      <div className="input-group"><input type="email" name="email" className="input-field" placeholder=" " value={formData.email} onChange={handleChange} required /><label className="input-label"><FiMail className="inline mr-2" /> Email Address</label></div>
      <div className="input-group"><input type="tel" name="phone" className="input-field" placeholder=" " value={formData.phone} onChange={handleChange} /><label className="input-label"><FiPhone className="inline mr-2" /> Phone Number</label></div>

      {!initialData && (
        <>
          <div className="input-group"><input type="text" name="username" className="input-field" placeholder=" " value={formData.username} onChange={handleChange} required /><label className="input-label"><FiUser className="inline mr-2" /> Username</label></div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="input-group"><input type="password" name="password" className="input-field" placeholder=" " value={formData.password} onChange={handleChange} required /><label className="input-label">Password</label></div>
            <div className="input-group"><input type="password" name="confirmPassword" className="input-field" placeholder=" " value={formData.confirmPassword} onChange={handleChange} required /><label className="input-label">Confirm Password</label></div>
          </div>
        </>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="input-group"><input type="text" name="department" className="input-field" placeholder=" " value={formData.department} onChange={handleChange} /><label className="input-label"><FiBriefcase className="inline mr-2" /> Department</label></div>
        <div className="input-group"><input type="text" name="position" className="input-field" placeholder=" " value={formData.position} onChange={handleChange} /><label className="input-label">Position</label></div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="input-group"><input type="date" name="hire_date" className="input-field" placeholder=" " value={formData.hire_date?.split('T')[0] || ''} onChange={handleChange} /><label className="input-label"><FiCalendar className="inline mr-2" /> Hire Date</label></div>
        <div className="input-group"><input type="number" name="salary" className="input-field" placeholder=" " value={formData.salary} onChange={handleChange} /><label className="input-label"><FiDollarSign className="inline mr-2" /> Salary</label></div>
      </div>

      <div className="input-group"><textarea name="address" className="input-field" placeholder=" " rows="2" value={formData.address} onChange={handleChange} style={{ paddingTop: '16px' }} /><label className="input-label" style={{ top: '16px' }}><FiMapPin className="inline mr-2" /> Address</label></div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="input-group"><input type="text" name="city" className="input-field" placeholder=" " value={formData.city} onChange={handleChange} /><label className="input-label">City</label></div>
        <div className="input-group"><input type="text" name="state" className="input-field" placeholder=" " value={formData.state} onChange={handleChange} /><label className="input-label">State</label></div>
        <div className="input-group"><input type="text" name="zip_code" className="input-field" placeholder=" " value={formData.zip_code} onChange={handleChange} /><label className="input-label">Zip Code</label></div>
        <div className="input-group"><input type="text" name="country" className="input-field" placeholder=" " value={formData.country} onChange={handleChange} /><label className="input-label">Country</label></div>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <button type="button" onClick={() => window.history.back()} className="btn-secondary">Cancel</button>
        <button type="submit" disabled={isLoading} className="btn-primary">{isLoading ? 'Saving...' : 'Save Employee'}</button>
      </div>
    </form>
  );
};

export default EmployeeForm;