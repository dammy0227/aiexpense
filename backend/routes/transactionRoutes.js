// routes/transactionRoutes.js
import express from "express";
import {
  getTransactions,
  addTransaction,
  processReceipt,
  updateTransaction,
  deleteTransaction
} from "../controllers/transactionController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// GET /api/transactions/ - get all transactions
router.get("/", protect, getTransactions);

// POST /api/transactions/ - add a manual transaction
router.post("/", protect, addTransaction);

// POST /api/transactions/receipt - upload a receipt
router.post("/receipt", protect, upload.single("file"), processReceipt);

router.put("/:id", protect, updateTransaction);

router.delete("/:id", protect, deleteTransaction);

export default router;
