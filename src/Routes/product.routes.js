import express from "express";

// controllers
import {
    createProduct,
    getAllProduct, getProductFrequency,
    getSingleProduct, searchProduct,
    updateProduct,
    updateProductVisibility
} from "../Controllers/product.controller.js";

// router
const router = express.Router();

/**
 * ROOT URL: /api/product/
 **/
router.get("/", getAllProduct);
router.get("/frequency", getProductFrequency)
router.get("/search/:query", searchProduct)
router.get("/:code", getSingleProduct);
router.post("/createProduct", createProduct);
router.patch("/updateProductVisibility/:code", updateProductVisibility);
router.put("/updateProduct/:code", updateProduct);

export { router as productRoutes }
