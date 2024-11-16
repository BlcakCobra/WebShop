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
    res.status(403).json({ message: 'Access denied. No token provided.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    const user = await User.findById(decoded.id);

    if (!user) {
      logger.warn(`User not found: ${decoded.id}`);
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (user.role !== 'admin') {
      logger.warn(`Access denied for user with ID ${user._id}. Insufficient permissions.`);
      res.status(403).json({ message: 'Access denied. Admins only.' });
      return;
    }

    req.user = { id: (user._id as typeof user._id & { toString: () => string }).toString(), role: user.role };

    if (decoded.role !== user.role) {
      const newToken = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );
      res.setHeader('Authorization', `Bearer ${newToken}`);
      logger.info(`Token updated for user ID ${user._id}`);
    }

    next();
  } catch (error: any) {
    logger.error(`Token verification failed: ${error.message}`);
    res.status(400).json({ message: 'Invalid token.' });
  }
};
