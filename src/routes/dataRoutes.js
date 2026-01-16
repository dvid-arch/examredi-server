import { Router } from 'express';
import { getPerformance, savePerformance, getGuides, getLeaderboard, updateLeaderboard, searchData } from '../controllers/dataController.js';
import { authenticate } from '../middleware/auth.js';
import { validatePerformance, validateLeaderboardEntry } from '../middleware/validation.js';
import { handleValidationErrors } from '../middleware/errorHandler.js';

const router = Router();

router.get('/performance', authenticate, getPerformance);
router.post('/performance', authenticate, validatePerformance, handleValidationErrors, savePerformance);
router.get('/guides', getGuides);
router.get('/search', searchData);
router.get('/leaderboard', getLeaderboard);
router.post('/leaderboard', validateLeaderboardEntry, handleValidationErrors, updateLeaderboard);

export default router;
