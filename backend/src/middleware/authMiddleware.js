import jwt from 'jsonwebtoken';
import Employee from '../models/Employee.js';

export const protect = async (req, res, next) => {
  let token;
  
  if (req.headers.authorization?.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Employee.findByPk(decoded.id, {
        attributes: { exclude: ['password_hash'] }
      });
      next();
    } catch (error) {
      res.status(401).json({ success: false, error: { message: 'Not authorized' } });
    }
  }
  
  if (!token) {
    res.status(401).json({ success: false, error: { message: 'No token' } });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        error: { message: 'Access denied' } 
      });
    }
    next();
  };
};