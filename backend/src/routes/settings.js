const express = require("express");
const router = express.Router();
const { getSettings, updateSettings } = require("../controllers/settings");
const { protect, authorize } = require("../middleware/auth");

// Public route to get settings
router.get("/", getSettings);

// Admin only route to update settings
router.put("/", protect, authorize("admin"), updateSettings);

module.exports = router;
