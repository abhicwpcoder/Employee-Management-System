import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeesByDepartment
} from '../controllers/employeeController.js';

const router = express.Router();

router.use(protect);
router.get('/', authorize('admin', 'manager'), getEmployees);
router.get('/department/:dept', authorize('admin', 'manager'), getEmployeesByDepartment);
router.post('/', authorize('admin'), createEmployee);
router.get('/:id', getEmployeeById);
router.put('/:id', updateEmployee);
router.delete('/:id', authorize('admin'), deleteEmployee);

export default router;