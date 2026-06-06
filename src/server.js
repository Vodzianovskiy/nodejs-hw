import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { isCelebrateError } from 'celebrate';

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

// celebrate error handler
app.use((err, req, res, next) => {
  if (isCelebrateError(err)) {
    const errorMessages = [];
    for (const [, joiError] of err.details.entries()) {
      joiError.details.forEach((detail) => {
        errorMessages.push(detail.message);
      });
    }
    return res.status(400).json({
      message: 'Validation error',
      errors: errorMessages,
    });
  }
  next(err);
});

// 500 error handler
app.use(errorHandler);

// connect to MongoDB
await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
