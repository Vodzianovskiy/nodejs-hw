// src/middleware/logger.js
const logger = (req, res, next) => {
  console.log(`Time: ${new Date().toLocaleString()}`);
  next();
};

export default logger;
