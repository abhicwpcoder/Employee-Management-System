import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { getStats, getDepartmentDistribution, getRecentEmployees } from '../controllers/dashboardController.js';

const router = express.Router();

// All dashboard routes require authentication and admin/manager role
router.use(protect);
router.use(authorize('admin', 'manager'));

router.get('/stats', getStats);
router.get('/department-distribution', getDepartmentDistribution);
router.get('/recent-employees', getRecentEmployees);

export default router;