const express = require("express");
const {
  getCategories,
  getCategory,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(getCategories)
  .post(protect, authorize("admin", "editor"), createCategory);

router
  .route("/:id")
  .get(getCategory)
  .put(protect, authorize("admin", "editor"), updateCategory)
  .delete(protect, authorize("admin"), deleteCategory);

router.get("/slug/:slug", getCategoryBySlug);

module.exports = router;
