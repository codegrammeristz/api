import express from "express";

// controllers
import {createProduct, getAllProduct, getSingleProduct, updateProduct} from "../Controllers/product.controller.js";

// router
const router = express.Router();

/**
 * ROOT URL: /api/product/
 **/
router.get("/", getAllProduct);
router.get("/:id", getSingleProduct);
router.post("/createProduct", createProduct);
router.put("/updateProduct/:id", updateProduct);

export { router as productRoutes }
