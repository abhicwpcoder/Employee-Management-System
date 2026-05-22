import React from 'react';
import { formatDate, formatCurrency } from '../../utils/formatters';

const EmployeeDetails = ({ employee }) => {
  const InfoRow = ({ label, value }) => (
    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
      <dt className="text-sm font-medium text-gray-500">{label}</dt>
      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{value || '-'}</dd>
    </div>
  );

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Employee Information</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and employment information.</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <InfoRow label="Full Name" value={`${employee.first_name} ${employee.last_name}`} />
          <InfoRow label="Email" value={employee.email} />
          <InfoRow label="Phone Number" value={employee.phone_number} />
          <InfoRow label="Department" value={employee.department} />
          <InfoRow label="Position" value={employee.position} />
          <InfoRow label="Salary" value={formatCurrency(employee.salary)} />
          <InfoRow label="Hire Date" value={formatDate(employee.hire_date)} />
          <InfoRow label="Date of Birth" value={formatDate(employee.date_of_birth)} />
          <InfoRow label="Status" value={employee.status} />
          <InfoRow label="Manager" value={employee.manager ? `${employee.manager.first_name} ${employee.manager.last_name}` : 'None'} />
          <InfoRow label="Address" value={employee.address} />
        </dl>
      </div>
    </div>
  );
};

export default EmployeeDetails;