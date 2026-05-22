import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/formatters';

const RecentHires = ({ hires }) => {
  if (!hires || hires.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Hires</h3>
        <p className="text-gray-500 text-center py-8">No recent hires</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Hires</h3>
        <Link to="/employees" className="text-sm text-indigo-600 hover:text-indigo-900">
          View All
        </Link>
      </div>
      
      <div className="space-y-4">
        {hires.map((hire) => (
          <div key={hire.id} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-medium">
                  {hire.first_name?.[0]}{hire.last_name?.[0]}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {hire.first_name} {hire.last_name}
                </p>
                <p className="text-sm text-gray-500">{hire.position} • {hire.department}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Hired</p>
              <p className="text-sm font-medium text-gray-900">{formatDate(hire.hire_date)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentHires;