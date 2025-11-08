// utils/helpers.js

/**
 * Format a number as currency
 * @param {number} amount
 * @param {string} currency - e.g., 'USD', 'EUR'
 * @returns {string}
 */
export const formatCurrency = (amount, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

/**
 * Get current month in YYYY-MM format
 * @returns {string}
 */
export const getCurrentMonth = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};

/**
 * Calculate total spending for a category
 * @param {Array} transactions
 * @param {string} category
 * @returns {number}
 */
export const calculateCategoryTotal = (transactions, category) => {
  return transactions
    .filter(t => t.category === category)
    .reduce((sum, t) => sum + t.amount, 0);
};
