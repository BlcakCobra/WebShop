import express from 'express';
import { json } from 'body-parser';
import { rateLimit } from 'express-rate-limit';
import router from './routes/routes';
import connectDB from './db';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler, notFoundHandler } from './middleWeare/errorHandler';
import logger from './log/logger';

export const app = express();
const PORT = process.env.EXPRESS_PORT || 5001;

connectDB().catch(error => {
  logger.error('Database connection error:', error);
  process.exit();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(json());
app.use(limiter);
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
}));
app.use(helmet());

app.use('/', router);

app.use(notFoundHandler);
app.use(errorHandler);

if (require.main === module) {
  app.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}/`);
  });
}
