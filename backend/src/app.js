import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import errorMiddleware from './middleware/errorMiddleware.js';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use(
  cors({
    origin: [
      "https://employee-management-system-kohl-six.vercel.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
  })
);
app.options("*", cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api', limiter);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

app.use(errorMiddleware);

export default app;