import express from "express";

// controllers
import {
    createCustomer,
    getAllCustomer,
    getSingleCustomer,
    updateCustomer,
    getCustomerForAuth,
    loginCustomer
} from "../Controllers/customer.controller.js";

// router
const router = express.Router();

/**
 * ROOT URL: /api/customer/
 **/
router.get("/", getAllCustomer);
router.get("/login", loginCustomer)
router.get("/:email", getSingleCustomer);
router.post("/createCustomer", createCustomer);
router.put("/updateCustomer/:email", updateCustomer);
router.get("/auth/:email", getCustomerForAuth);

export { router as customerRoutes }
