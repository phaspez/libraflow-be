const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/dashboard.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

router.get("/stats", protect, authorize("staff", "admin"), getDashboardStats);

module.exports = router;
