import logger from "../log/logger";
import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);
  res.status(500).json({ message: err.message || 'Внутренняя ошибка сервера' });
};

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: 'Ресурс не найден' });
};

export { errorHandler, notFoundHandler };