const { syncDatabase, Product, Category } = require('../models');

const sampleProducts = [
  {
    title: "Professional Power Drill Set",
    description: "High-performance 18V cordless drill with 2 batteries, charger, and premium carrying case. Perfect for professionals and DIY enthusiasts.",
    price: 129.99,
    compareAtPrice: 159.99,
    categoryId: 1, // Assuming Tools category has ID 1
    stockQuantity: 25,
    sku: "DRILL-PRO-18V",
    images: [
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=600&fit=crop"
    ],
    tags: ["power tools", "cordless", "professional", "bestseller"],
    isFeatured: true,
    isHotDeal: true,
    status: "active"
  },
  {
    title: "Stainless Steel Hammer Set",
    description: "Premium hammer set with ergonomic handles. Includes claw hammer, ball peen hammer, and rubber mallet.",
    price: 49.99,
    compareAtPrice: 69.99,
    categoryId: 1,
    stockQuantity: 40,
    sku: "HAMMER-SET-SS",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=600&fit=crop"
    ],
    tags: ["hand tools", "hammer", "steel", "professional"],
    isFeatured: false,
    isHotDeal: true,
    status: "active"
  },
  {
    title: "100W Solar Panel Kit",
    description: "Complete solar panel system with charge controller, inverter, and installation hardware. Perfect for RVs, boats, and off-grid applications.",
    price: 299.99,
    compareAtPrice: 399.99,
    categoryId: 2, // Assuming Electronics category has ID 2
    stockQuantity: 15,
    sku: "SOLAR-100W-KIT",
    images: [
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=600&fit=crop"
    ],
    tags: ["solar", "renewable energy", "electronics", "off-grid"],
    isFeatured: true,
    isHotDeal: false,
    status: "active"
  },
  {
    title: "Digital Multimeter Pro",
    description: "Professional-grade digital multimeter with auto-ranging, True RMS, and data logging capabilities. Essential for electrical work.",
    price: 89.99,
    categoryId: 2,
    stockQuantity: 30,
    sku: "METER-DIGITAL-PRO",
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581092582021-ac94b7b4e786?w=600&h=600&fit=crop"
    ],
    tags: ["electronics", "measurement", "professional", "digital"],
    isFeatured: false,
    isHotDeal: false,
    status: "active"
  },
  {
    title: "Heavy Duty Work Gloves",
    description: "Cut-resistant work gloves with reinforced palms and fingers. EN388 certified for maximum protection in industrial environments.",
    price: 19.99,
    categoryId: 3, // Assuming Safety category has ID 3
    stockQuantity: 100,
    sku: "GLOVES-HD-CUT",
    images: [
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop"
    ],
    tags: ["safety", "gloves", "protection", "industrial"],
    isFeatured: false,
    isHotDeal: true,
    status: "active"
  },
  {
    title: "Safety Helmet with LED Light",
    description: "ANSI-approved safety helmet with built-in LED headlamp and adjustable suspension system. Lightweight and comfortable for all-day wear.",
    price: 39.99,
    categoryId: 3,
    stockQuantity: 50,
    sku: "HELMET-LED-ANSI",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=600&fit=crop"
    ],
    tags: ["safety", "helmet", "LED", "construction"],
    isFeatured: true,
    isHotDeal: false,
    status: "active"
  },
  {
    title: "Precision Screwdriver Set",
    description: "45-piece precision screwdriver set with magnetic tips and rotating caps. Includes Phillips, flathead, Torx, and hex bits.",
    price: 24.99,
    categoryId: 1,
    stockQuantity: 60,
    sku: "SCREWDRIVER-PRECISION-45",
    images: [
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=600&fit=crop"
    ],
    tags: ["tools", "precision", "screwdriver", "electronics"],
    isFeatured: false,
    isHotDeal: false,
    status: "active"
  },
  {
    title: "LED Work Light 50W",
    description: "Portable LED work light with adjustable stand and 360-degree rotation. IP65 waterproof rating for outdoor use.",
    price: 79.99,
    categoryId: 2,
    stockQuantity: 35,
    sku: "LED-WORK-50W",
    images: [
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=600&fit=crop"
    ],
    tags: ["lighting", "LED", "portable", "waterproof"],
    isFeatured: false,
    isHotDeal: true,
    status: "active"
  }
];

async function seedProducts() {
  try {
    console.log('🌱 Starting product seeding...');
    
    // Sync database first
    await syncDatabase();
    
    // Check if products already exist
    const existingProducts = await Product.count();
    if (existingProducts > 0) {
      console.log(`⚠️  Found ${existingProducts} existing products. Skipping seed.`);
      console.log('💡 Delete existing products if you want to reseed.');
      return;
    }
    
    // Check if categories exist
    const categories = await Category.findAll();
    if (categories.length === 0) {
      console.log('❌ No categories found. Please seed categories first.');
      return;
    }
    
    console.log(`✅ Found ${categories.length} categories`);
    
    // Create products
    console.log('📦 Creating sample products...');
    
    for (const productData of sampleProducts) {
      try {
        // Check if category exists
        const category = await Category.findByPk(productData.categoryId);
        if (!category) {
          console.log(`⚠️  Category ${productData.categoryId} not found for product ${productData.title}`);
          productData.categoryId = 1; // Default to first category
        }
        
        const product = await Product.create(productData);
        console.log(`✅ Created: ${product.title} (ID: ${product.id})`);
      } catch (error) {
        console.error(`❌ Failed to create ${productData.title}:`, error.message);
      }
    }
    
    const totalProducts = await Product.count();
    console.log(`🎉 Product seeding completed! Total products: ${totalProducts}`);
    
  } catch (error) {
    console.error('❌ Product seeding failed:', error);
  } finally {
    process.exit(0);
  }
}

// Run the seeder
seedProducts();