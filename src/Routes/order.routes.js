import express from "express";

// controllers
import {createOrder, getAllOrder, getSingleOrder, updateOrder} from "../Controllers/order.controller.js";

// router
const router = express.Router();

/**
 * ROOT URL: /api/order/
 **/
router.get("/", getAllOrder);
router.get("/:id", getSingleOrder);
router.post("/createOrder", createOrder);
router.put("/updateOrder/:id", updateOrder);

export { router as orderRoutes }
