import Employee from '../models/Employee.js';
import generateToken from '../utils/generateToken.js';
import { validationResult } from 'express-validator';
import { Op } from 'sequelize';
import bcrypt from 'bcryptjs';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt:', { email, passwordProvided: !!password });
    
    // Find employee
    const employee = await Employee.findOne({
      where: {
        [Op.or]: [
          { email: email.toLowerCase() },
          { username: email.toLowerCase() }
        ]
      }
    });
    
    if (!employee) {
      console.log('Employee not found');
      return res.status(401).json({ 
        success: false, 
        error: { message: 'Invalid credentials' } 
      });
    }
    
    console.log('Employee found:', employee.email);
    console.log('Stored hash length:', employee.password_hash?.length);
    
    // Compare password
    const isValid = await bcrypt.compare(password, employee.password_hash);
    console.log('Password valid:', isValid);
    
    if (!isValid) {
      return res.status(401).json({ 
        success: false, 
        error: { message: 'Invalid credentials' } 
      });
    }
    
    if (!employee.is_active) {
      return res.status(401).json({ 
        success: false, 
        error: { message: 'Account deactivated' } 
      });
    }
    
    await employee.update({ last_login: new Date() });
    const token = generateToken(employee.id);
    
    res.json({
      token,
      user: {
        id: employee.id,
        username: employee.username,
        email: employee.email,
        role: employee.role,
        firstName: employee.first_name,
        lastName: employee.last_name,
        employeeId: employee.employee_id,
        department: employee.department,
        position: employee.position
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: { message: 'Server error: ' + error.message } });
  }
};

export const register = async (req, res) => {
  try {
    const { username, email, password, role, firstName, lastName, phone, department, position } = req.body;
    
    const existing = await Employee.findOne({
      where: { [Op.or]: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }] }
    });
    
    if (existing) {
      return res.status(400).json({ success: false, error: { message: 'Employee already exists' } });
    }
    
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const employee = await Employee.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password_hash: hashedPassword,
      role: role || 'employee',
      first_name: firstName,
      last_name: lastName,
      phone: phone || null,
      department: department || null,
      position: position || null,
      hire_date: new Date(),
      is_active: true
    });
    
    const token = generateToken(employee.id);
    
    res.status(201).json({
      token,
      user: {
        id: employee.id,
        username: employee.username,
        email: employee.email,
        role: employee.role,
        firstName: employee.first_name,
        lastName: employee.last_name,
        employeeId: employee.employee_id,
        department: employee.department,
        position: employee.position
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, error: { message: 'Server error: ' + error.message } });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const employee = await Employee.findByPk(req.user.id);
    
    if (!employee) {
      return res.status(404).json({ success: false, error: { message: 'Employee not found' } });
    }
    
    const isValid = await bcrypt.compare(currentPassword, employee.password_hash);
    if (!isValid) {
      return res.status(401).json({ success: false, error: { message: 'Current password incorrect' } });
    }
    
    const salt = await bcrypt.genSalt(10);
    employee.password_hash = await bcrypt.hash(newPassword, salt);
    await employee.save();
    
    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
};

export const getMe = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.user.id, {
      attributes: { exclude: ['password_hash'] }
    });
    res.json({ success: true, data: employee });
  } catch (error) {
    res.status(500).json({ success: false, error: { message: 'Server error' } });
  }
};