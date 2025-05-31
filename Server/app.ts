// Server/app.ts
import express from 'express';
import { json } from 'body-parser';
import { rateLimit } from 'express-rate-limit';
import router from './routes/routes';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler, notFoundHandler } from './middleWeare/errorHandler';

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5000,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json({ limit: '1000mb' }));
app.use(json());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ['Authorization', 'Content-Type']
}));
app.use(helmet());

app.use('/api', limiter);
app.use('/', router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
