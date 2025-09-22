const { Product, Category } = require("../models");
const { body, validationResult } = require("express-validator");
const { Op, fn, col, where: seqWhere } = require("sequelize");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const {
      category,
      featured,
      hotdeal,
      search,
      minPrice,
      maxPrice,
      inStock,
      sort,
      page = 1,
      limit = 12,
    } = req.query;

    // Build where conditions
    let where = { isActive: true };

    if (category) {
      where.categoryId = category;
    }

    if (featured === "true") {
      where.isFeatured = true;
    }

    if (hotdeal === "true") {
      where.isHotDeal = true;
    }

    if (inStock === "true") {
      where.inStock = true;
    }

    if (search) {
      const searchTerm = search.toLowerCase();
      where[Op.or] = [
        seqWhere(fn("LOWER", col("Product.title")), Op.like, `%${searchTerm}%`),
        seqWhere(
          fn("LOWER", col("Product.description")),
          Op.like,
          `%${searchTerm}%`
        ),
      ];
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price[Op.gte] = parseFloat(minPrice);
      if (maxPrice) where.price[Op.lte] = parseFloat(maxPrice);
    }

    // Build sort
    let order = [];
    switch (sort) {
      case "price_asc":
        order.push(["price", "ASC"]);
        break;
      case "price_desc":
        order.push(["price", "DESC"]);
        break;
      case "name_asc":
        order.push(["title", "ASC"]);
        break;
      case "name_desc":
        order.push(["title", "DESC"]);
        break;
      case "newest":
        order.push(["createdAt", "DESC"]);
        break;
      case "oldest":
        order.push(["createdAt", "ASC"]);
        break;
      default:
        order.push(["createdAt", "DESC"]);
    }

    // Pagination
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;

    const { count: total, rows: products } = await Product.findAndCountAll({
      where,
      order,
      limit: limitNum,
      offset,
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name", "slug"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
exports.getFeaturedProducts = async (req, res) => {
  try {
    const { limit = 8 } = req.query;

    const products = await Product.findAll({
      where: {
        isFeatured: true,
        isActive: true,
      },
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
      include: {
        model: Category,
        as: "category",
        attributes: ["name", "slug"],
      },
    });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Error in getFeaturedProducts:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Get hot deals
// @route   GET /api/products/hot-deals
// @access  Public
exports.getHotDeals = async (req, res) => {
  try {
    const { limit = 12 } = req.query;

    const products = await Product.findAll({
      where: {
        isHotDeal: true,
        isActive: true,
      },
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
      include: {
        model: Category,
        as: "category",
        attributes: ["name", "slug"],
      },
    });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Error in getHotDeals:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name", "slug", "description"],
        },
      ],
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Increment view count
    product.viewCount += 1;
    await product.save();

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Get product by slug
// @route   GET /api/products/slug/:slug
// @access  Public
exports.getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { slug: req.params.slug },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name", "slug", "description"],
        },
      ],
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Increment view count
    product.viewCount += 1;
    await product.save();

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Get related products
// @route   GET /api/products/:id/related
// @access  Public
exports.getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const relatedProducts = await Product.findAll({
      where: {
        categoryId: product.categoryId,
        id: { [Op.ne]: product.id },
        isActive: true,
      },
      limit: 4,
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name", "slug"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      count: relatedProducts.length,
      data: relatedProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = [
  body("title")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Product title must be between 2-100 characters"),
  body("description")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10-2000 characters"),
  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("categoryId")
    .isInt({ min: 1 })
    .withMessage("Valid category ID is required"),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        });
      }

      // Check if category exists
      const category = await Category.findByPk(req.body.categoryId);
      if (!category) {
        return res.status(400).json({
          success: false,
          message: "Category not found",
        });
      }

      const product = await Product.create(req.body);

      // Fetch the product with category information
      const productWithCategory = await Product.findByPk(product.id, {
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["id", "name", "slug"],
          },
        ],
      });

      res.status(201).json({
        success: true,
        data: productWithCategory,
        message: "Product created successfully",
      });
    } catch (error) {
      console.error("Product creation error:", error);
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({
          success: false,
          message: "Product with this slug already exists",
        });
      }
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  },
];

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Product title must be between 2-100 characters"),
  body("description")
    .optional()
    .isLength({ min: 10, max: 2000 })
    .withMessage("Description must be between 10-2000 characters"),
  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("category")
    .optional()
    .isMongoId()
    .withMessage("Valid category ID is required"),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation errors",
          errors: errors.array(),
        });
      }

      // Check if category exists (if provided)
      if (req.body.category) {
        const category = await Category.findById(req.body.category);
        if (!category) {
          return res.status(400).json({
            success: false,
            message: "Category not found",
          });
        }
      }

      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      }).populate("category", "name slug");

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.status(200).json({
        success: true,
        data: product,
        message: "Product updated successfully",
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Product with this slug already exists",
        });
      }
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
];

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await product.destroy();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
