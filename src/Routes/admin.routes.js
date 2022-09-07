import express from "express";

// controllers
import {getAdmin} from "../Controllers/admin.controller.js";

// router
const router = express.Router();

/**
 * ROOT URL: /admin/
 **/
router.get("/", getAdmin);

export { router as adminRoutes }
