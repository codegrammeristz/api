import express from "express";

// controllers
import {createAdmin, getAllAdmin, getSingleAdmin, updateAdmin, getAdminForAuth} from "../Controllers/admin.controller.js";

// router
const router = express.Router();

/**
 * ROOT URL: /api/admin/
 **/
router.get("/", getAllAdmin);
router.get("/:id", getSingleAdmin);
router.post("/createAdmin", createAdmin);
router.put("/updateAdmin/:id", updateAdmin);
router.get("/auth/:username", getAdminForAuth);

export { router as adminRoutes }
