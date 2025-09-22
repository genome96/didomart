const express = require("express");
const {
  getProducts,
  getFeaturedProducts,
  getHotDeals,
  getProduct,
  getProductBySlug,
  getRelatedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.get("/featured", getFeaturedProducts);
router.get("/hot-deals", getHotDeals);

router
  .route("/")
  .get(getProducts)
  .post(protect, authorize("admin", "editor"), createProduct);

router
  .route("/:id")
  .get(getProduct)
  .put(protect, authorize("admin", "editor"), updateProduct)
  .delete(protect, authorize("admin"), deleteProduct);

router.get("/:id/related", getRelatedProducts);
router.get("/slug/:slug", getProductBySlug);

module.exports = router;
