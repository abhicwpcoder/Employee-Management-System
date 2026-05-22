import Employee from '../models/Employee.js';
import { Op } from 'sequelize';

export const getStats = async (req, res) => {
  try {
    const totalEmployees = await Employee.count();
    const activeEmployees = await Employee.count({ where: { is_active: true } });
    const inactiveEmployees = await Employee.count({ where: { is_active: false } });
    
    const adminCount = await Employee.count({ where: { role: 'admin' } });
    const managerCount = await Employee.count({ where: { role: 'manager' } });
    const employeeCount = await Employee.count({ where: { role: 'employee' } });
    
    const departments = await Employee.findAll({
      attributes: ['department'],
      where: { department: { [Op.ne]: null } },
      group: ['department']
    });
    
    // Get recent hires (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentHires = await Employee.count({
      where: { hire_date: { [Op.gte]: thirtyDaysAgo } }
    });
    
    res.json({
      success: true,
      data: {
        total: totalEmployees,
        active: activeEmployees,
        inactive: inactiveEmployees,
        admins: adminCount,
        managers: managerCount,
        employees: employeeCount,
        departments: departments.length,
        recentHires: recentHires
      }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
};

export const getDepartmentDistribution = async (req, res) => {
  try {
    const distribution = await Employee.findAll({
      attributes: [
        'department',
        [Employee.sequelize.fn('COUNT', Employee.sequelize.col('id')), 'count']
      ],
      where: { 
        department: { [Op.ne]: null },
        is_active: true
      },
      group: ['department']
    });
    
    res.json({ success: true, data: distribution });
  } catch (error) {
    console.error('Get department distribution error:', error);
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
};

export const getRecentEmployees = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    
    const recentEmployees = await Employee.findAll({
      attributes: { exclude: ['password_hash'] },
      order: [['createdAt', 'DESC']],
      limit: limit
    });
    
    res.json({ success: true, data: recentEmployees });
  } catch (error) {
    console.error('Get recent employees error:', error);
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
};