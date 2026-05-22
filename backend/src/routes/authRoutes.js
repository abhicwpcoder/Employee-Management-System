import express from 'express';
import { login, register, changePassword, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateLogin, validateRegister, validate } from '../middleware/validationMiddleware.js';
import Employee from '../models/Employee.js';

const router = express.Router();

// Public routes
router.post('/register', validateRegister, validate, register);
router.post('/login', validateLogin, validate, login);

// Protected routes
router.post('/change-password', protect, changePassword);
router.get('/me', protect, getMe);

// DEBUG ROUTE - Remove after testing
router.get('/debug-users', async (req, res) => {
  try {
    const users = await Employee.findAll({
      attributes: ['id', 'username', 'email', 'role', 'password_hash']
    });
    res.json({ 
      message: 'Users in database', 
      count: users.length,
      users: users.map(u => ({
        id: u.id,
        username: u.username,
        email: u.email,
        role: u.role,
        hasPassword: !!u.password_hash,
        passwordHashLength: u.password_hash?.length
      }))
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

export default router;