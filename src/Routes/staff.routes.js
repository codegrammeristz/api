import express from "express";

// controllers
import {createStaff, getAllStaff, getSingleStaff, updateStaff, getStaffForAuth} from "../Controllers/staff.controller.js";

// router
const router = express.Router();

/**
 * ROOT URL: /api/staff/
 **/
router.get("/", getAllStaff);
router.get("/:username", getSingleStaff);
router.post("/createStaff", createStaff);
router.put("/updateStaff/:id", updateStaff);
router.get("/auth/:username", getStaffForAuth);

export { router as staffRoutes }

