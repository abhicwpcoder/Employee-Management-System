import React from 'react';

const EmployeeFilters = ({ filters, onFilterChange, onReset }) => {
  const departments = ['', 'Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Operations', 'IT', 'Customer Support'];
  const statuses = ['', 'active', 'inactive', 'terminated'];

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select
            name="department"
            value={filters.department || ''}
            onChange={onFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {departments.map(dept => (
              <option key={dept || 'all'} value={dept}>
                {dept || 'All Departments'}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={filters.status || ''}
            onChange={onFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {statuses.map(status => (
              <option key={status || 'all'} value={status}>
                {status ? status.charAt(0).toUpperCase() + status.slice(1) : 'All Status'}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <select
            name="sortBy"
            value={filters.sortBy || 'created_at'}
            onChange={onFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="created_at">Date Created</option>
            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
            <option value="hire_date">Hire Date</option>
            <option value="salary">Salary</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
          <select
            name="order"
            value={filters.order || 'DESC'}
            onChange={onFilterChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="DESC">Descending</option>
            <option value="ASC">Ascending</option>
          </select>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default EmployeeFilters;