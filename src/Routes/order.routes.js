import express from "express";

// controllers
import {
    createOrder,
    getAllOrder,
    getSingleOrder,
    updateOrderStatus,
    getRevenue,
    getFulfilledOrderByEmail,
    getNotFulfilledOrdersByEmail
} from "../Controllers/order.controller.js";

// router
const router = express.Router();

/**
 * ROOT URL: /api/order/
 **/
router.get("/", getAllOrder);
router.get("/get/:email", getFulfilledOrderByEmail)
router.get("/get/:email/notFulfilled", getNotFulfilledOrdersByEmail)
router.get("/revenue", getRevenue)
router.get("/:id", getSingleOrder);
router.post("/createOrder", createOrder);
router.patch("/updateOrderStatus/:id", updateOrderStatus);

export {router as orderRoutes}
