import express from "express";

// controllers
import {
    createCustomer,
    getAllCustomer,
    getSingleCustomer,
    updateCustomer,
    getCustomerForAuth,
    loginCustomer,
    deleteCustomer
} from "../Controllers/customer.controller.js";

// router
const router = express.Router();

/**
 * ROOT URL: /api/customer/
 **/
router.get("/", getAllCustomer);
router.post("/login", loginCustomer)
router.get("/:email", getSingleCustomer);
router.post("/createCustomer", createCustomer);
router.put("/updateCustomer/:email", updateCustomer);
router.get("/auth/:email", getCustomerForAuth);
router.delete("/delete", deleteCustomer)

export { router as customerRoutes }
