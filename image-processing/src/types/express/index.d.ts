import { Request } from 'express';

// Extend Express's Request interface
declare global {
  namespace Express {
    interface Request {
      fileValidationError?: string;  // Optional property for file validation error
    }
  }
}