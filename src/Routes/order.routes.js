import express from "express";

// controllers
import {createOrder, getAllOrder, getSingleOrder, updateOrderStatus, getRevenue} from "../Controllers/order.controller.js";

// router
const router = express.Router();

/**
 * ROOT URL: /api/order/
 **/
router.get("/", getAllOrder);
router.get("/:id", getSingleOrder);
router.post("/createOrder", createOrder);
router.patch("/updateOrderStatus/:id", updateOrderStatus);
router.get("/revenue", getRevenue)

export { router as orderRoutes }
