import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectDatabase } from './config/database.js';
import apiRoutes from './routes/api.routes.js';

const app = express();
const port = Number(process.env.PORT || 5000);
const allowedOrigins = [...new Set([...(process.env.CLIENT_ORIGIN || '').split(',').map((origin) => origin.trim()).filter(Boolean), 'http://localhost:4200', 'http://localhost:4000'])];

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '20kb' }));
app.use('/api', apiRoutes);
app.use((req, res) => res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` }));
app.use((error, _req, res, _next) => {
  console.error(error);
  if (error?.name === 'ValidationError') return res.status(400).json({ message: 'Please check the booking details and try again.' });
  if (error?.type === 'entity.parse.failed') return res.status(400).json({ message: 'Invalid request body.' });
  return res.status(500).json({ message: 'Something went wrong. Please call our team.' });
});

try {
  await connectDatabase(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pm_electricals');
  app.listen(port, () => console.info(`PM Electricals API listening at http://localhost:${port}/api`));
} catch (error) {
  console.error('Could not connect to MongoDB. Check MONGODB_URI and ensure MongoDB is available.', error.message);
  process.exit(1);
}

