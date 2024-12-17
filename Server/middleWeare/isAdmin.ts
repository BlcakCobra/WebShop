import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import logger from '../log/logger'; 

interface DecodedToken {
  id: string;
  role: 'user' | 'admin';
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: 'user' | 'admin';
      };
    }
  }
}

export const isAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
      logger.warn('Access attempt without a token');
      res.status(403).json({ success: false, message: 'Access denied. No token provided.' });
      return;
  }

  try {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
          logger.error('JWT_SECRET is not defined');
          res.status(500).json({ success: false, message: 'Server configuration error.' });
          return;
      }

      const decoded = jwt.verify(token, secret) as DecodedToken;

      logger.info(`Decoded token: ${JSON.stringify(decoded)}`);

      if (!decoded?.id) {
          logger.warn('Invalid token payload');
          res.status(400).json({ success: false, message: 'Invalid token.' });
          return;
      }

      const user = await User.findById(decoded.id);
      if (!user) {
          logger.warn(`User not found: ${decoded.id}`);
          res.status(404).json({ success: false, message: 'User not found' });
          return;
      }

      logger.info(`User found: ${user.username}, role: ${user.role}`);

      if (user.role !== 'admin') {
          logger.warn(`Access denied for user with ID ${user._id}. Insufficient permissions.`);
          res.status(403).json({ success: false, message: 'Access denied. Admins only.' });
          return;
      }

      req.user = { id: user.id.toString(), role: user.role };
      next();
  } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
          logger.error(`Token expired for request: ${req.originalUrl}`);
          res.status(401).json({ success: false, message: 'Token expired. Please login again.' });
          return;
      }
      logger.error(`Token verification failed: ${error.message}`);
      res.status(400).json({ success: false, message: 'Invalid token.' });
  }
};
