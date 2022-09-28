import express from "express";

// controllers
import {createCustomer, getAllCustomer, getSingleCustomer, updateCustomer, getCustomerForAuth} from "../Controllers/customer.controller.js";

// router
const router = express.Router();

/**
 * ROOT URL: /api/customer/
 **/
router.get("/", getAllCustomer);
router.get("/:id", getSingleCustomer);
router.post("/createCustomer", createCustomer);
router.put("/updateCustomer/:id", updateCustomer);
router.get("/auth/:email", getCustomerForAuth);

export { router as customerRoutes }
