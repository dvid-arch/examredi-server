import { body } from 'express-validator';

export const validateRegister = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number'),
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  body('phone')
    .optional()
    .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/)
    .withMessage('Please provide a valid phone number'),
  body('educationalLevel')
    .optional()
    .trim()
    .isIn(['Elementary', 'Middle School', 'High School', 'Undergraduate', 'Graduate'])
    .withMessage('Please select a valid educational level'),
  body('state')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('State cannot be empty if provided'),
  body('institution')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Institution cannot be empty if provided'),
];

export const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

export const validateRefreshToken = [
  body('token')
    .notEmpty()
    .withMessage('Refresh token is required'),
];

export const validatePerformance = [
  body('score')
    .isInt({ min: 0, max: 100 })
    .withMessage('Score must be between 0 and 100'),
  body('quizId')
    .trim()
    .notEmpty()
    .withMessage('Quiz ID is required'),
  body('timeTaken')
    .isInt({ min: 1 })
    .withMessage('Time taken must be a positive number (in seconds)'),
];

export const validateLeaderboardEntry = [
  body('userId')
    .trim()
    .notEmpty()
    .withMessage('User ID is required'),
  body('userName')
    .trim()
    .notEmpty()
    .isLength({ min: 2, max: 100 })
    .withMessage('User name must be between 2 and 100 characters'),
  body('score')
    .isInt({ min: 0, max: 100 })
    .withMessage('Score must be between 0 and 100'),
];

export const validateAIChat = [
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 1, max: 5000 })
    .withMessage('Message must be between 1 and 5000 characters'),
];

export const validateGenerateGuide = [
  body('topic')
    .trim()
    .notEmpty()
    .withMessage('Topic is required')
    .isLength({ min: 2, max: 200 })
    .withMessage('Topic must be between 2 and 200 characters'),
];

export const validateResearchTopic = [
  body('query')
    .trim()
    .notEmpty()
    .withMessage('Query is required')
    .isLength({ min: 2, max: 500 })
    .withMessage('Query must be between 2 and 500 characters'),
];
