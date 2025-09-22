const express = require("express");
const {
  getDashboardStats,
  getAllProducts,
  uploadProductImage,
  uploadCategoryImage,
  deleteUploadedImage,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/admin");
const { protect, authorize } = require("../middleware/auth");
const { handleMulterError } = require("../middleware/upload");

const router = express.Router();

// All admin routes require admin authentication
router.use(protect);
router.use(authorize("admin"));

router.get("/stats", getDashboardStats);
router.get("/products", getAllProducts);
router.get("/users", getAllUsers);

router.post("/upload/product-image", uploadProductImage);
router.post("/upload/category-image", uploadCategoryImage);
router.delete("/upload/:filename", deleteUploadedImage);

router.route("/users/:id").put(updateUser).delete(deleteUser);

// Error handling for file uploads
router.use(handleMulterError);

module.exports = router;
