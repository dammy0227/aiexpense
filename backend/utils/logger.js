// utils/logger.js

/**
 * Log informational messages
 * @param {string} message
 */
export const logInfo = (message) => {
  console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
};

/**
 * Log error messages
 * @param {string} message
 */
export const logError = (message) => {
  console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
};
