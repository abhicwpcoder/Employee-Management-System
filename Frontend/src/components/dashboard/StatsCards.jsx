import React from 'react';
import { FiUsers, FiUserCheck, FiUserX, FiTrendingUp } from 'react-icons/fi';

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Employees',
      value: stats?.total || 0,
      icon: FiUsers,
      color: 'bg-indigo-500',
      change: '+12%',
    },
    {
      title: 'Active Employees',
      value: stats?.active || 0,
      icon: FiUserCheck,
      color: 'bg-green-500',
      change: '+5%',
    },
    {
      title: 'Inactive Employees',
      value: stats?.inactive || 0,
      icon: FiUserX,
      color: 'bg-yellow-500',
      change: '-2%',
    },
    {
      title: 'New Hires (30d)',
      value: stats?.recentHires?.length || 0,
      icon: FiTrendingUp,
      color: 'bg-blue-500',
      change: '+8%',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{card.title}</p>
              <p className="text-2xl font-semibold text-gray-900 mt-2">{card.value}</p>
              <p className="text-sm text-green-600 mt-2">{card.change} from last month</p>
            </div>
            <div className={`${card.color} p-3 rounded-full`}>
              <card.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;