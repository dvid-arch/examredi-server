import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      error: 'Please check your input',
      data: errors.array().map((err: any) => ({
        field: err.path || err.param,
        message: err.msg
      })),
      statusCode: 400
    });
  }
  next();
};
