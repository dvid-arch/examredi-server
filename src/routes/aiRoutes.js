import { Router } from 'express';
import { chatWithAI, generateStudyGuide, researchTopic } from '../controllers/aiController.js';
import { authenticate } from '../middleware/auth.js';
import { validateAIChat, validateGenerateGuide, validateResearchTopic } from '../middleware/validation.js';
import { handleValidationErrors } from '../middleware/errorHandler.js';

const router = Router();

router.use(authenticate);

router.post('/chat', validateAIChat, handleValidationErrors, chatWithAI);
router.post('/generate-guide', validateGenerateGuide, handleValidationErrors, generateStudyGuide);
router.post('/research', validateResearchTopic, handleValidationErrors, researchTopic);

export default router;
