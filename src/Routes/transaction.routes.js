import express from "express";

// controllers
import {createTransaction, getAllTransaction} from "../Controllers/transaction.controller.js";

// router
const router = express.Router();

/**
 * ROOT URL: /api/transaction/
 **/
router.get("/", getAllTransaction);
router.post("/createTransaction", createTransaction);

export { router as transactionRoutes }
