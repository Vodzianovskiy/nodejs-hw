import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());

// middleware
app.use(logger);

// routes
app.use(notesRoutes);

// 404 handler
app.use(notFoundHandler);

// 500 error handler
app.use(errorHandler);

// connect to MongoDB
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
