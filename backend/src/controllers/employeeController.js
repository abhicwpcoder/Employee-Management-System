import Employee from '../models/Employee.js';
import { Op } from 'sequelize';

export const getEmployees = async (req, res) => {
  try {
    const { search, department, status } = req.query;
    let where = {};
    
    if (search) {
      where[Op.or] = [
        { first_name: { [Op.iLike]: `%${search}%` } },
        { last_name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } },
        { employee_id: { [Op.iLike]: `%${search}%` } }
      ];
    }
    if (department) where.department = department;
    if (status) where.is_active = status === 'active';
    
    const employees = await Employee.findAll({
      where,
      attributes: { exclude: ['password_hash'] },
      order: [['createdAt', 'DESC']]
    });
    
    res.json({ success: true, data: employees });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (req.user.role === 'employee' && req.user.id !== parseInt(id)) {
      return res.status(403).json({ 
        success: false, 
        error: { message: 'Access denied' } 
      });
    }
    
    const employee = await Employee.findByPk(id, {
      attributes: { exclude: ['password_hash'] }
    });
    
    if (!employee) {
      return res.status(404).json({ success: false, error: { message: 'Employee not found' } });
    }
    
    res.json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
};

export const createEmployee = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        error: { message: 'Admin only' } 
      });
    }
    
    const { username, email, password, role, first_name, last_name, phone, department, position, salary } = req.body;
    
    const existing = await Employee.findOne({
      where: { [Op.or]: [{ email }, { username }] }
    });
    
    if (existing) {
      return res.status(400).json({ 
        success: false, 
        error: { message: 'Employee already exists' } 
      });
    }
    
    const employee = await Employee.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password_hash: password,
      role: role || 'employee',
      first_name,
      last_name,
      phone,
      department,
      position,
      salary,
      is_active: true
    });
    
    const { password_hash, ...employeeData } = employee.toJSON();
    res.status(201).json({ success: true, data: employeeData });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByPk(id);
    
    if (!employee) {
      return res.status(404).json({ success: false, error: { message: 'Employee not found' } });
    }
    
    const isAdmin = req.user.role === 'admin';
    const isManager = req.user.role === 'manager';
    const isOwnProfile = req.user.id === parseInt(id);
    
    if (isAdmin) {
      await employee.update(req.body);
    } else if (isManager) {
      const { role, salary, ...allowedUpdates } = req.body;
      await employee.update(allowedUpdates);
    } else if (isOwnProfile) {
      const allowedFields = ['phone', 'address', 'city', 'state', 'zip_code', 'country'];
      const filteredUpdates = {};
      allowedFields.forEach(field => {
        if (req.body[field] !== undefined) filteredUpdates[field] = req.body[field];
      });
      await employee.update(filteredUpdates);
    } else {
      return res.status(403).json({ success: false, error: { message: 'Access denied' } });
    }
    
    const { password_hash, ...employeeData } = employee.toJSON();
    res.json({ success: true, data: employeeData });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        error: { message: 'Admin only' } 
      });
    }
    
    const { id } = req.params;
    if (parseInt(id) === req.user.id) {
      return res.status(400).json({ 
        success: false, 
        error: { message: 'Cannot delete yourself' } 
      });
    }
    
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ success: false, error: { message: 'Employee not found' } });
    }
    
    await employee.destroy();
    res.json({ success: true, message: 'Employee deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
};

export const getEmployeesByDepartment = async (req, res) => {
  try {
    const { dept } = req.params;
    const employees = await Employee.findAll({
      where: { department: { [Op.iLike]: dept }, is_active: true },
      attributes: { exclude: ['password_hash'] }
    });
    res.json({ success: true, data: employees });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
};