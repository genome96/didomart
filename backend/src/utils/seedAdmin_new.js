const { User, Category, Product } = require("../models");

const seedAdmin = async () => {
  try {
    // Check if admin user already exists
    const adminExists = await User.findOne({ 
      where: { email: process.env.ADMIN_EMAIL || "admin@yourbusiness.com" }
    });

    if (!adminExists) {
      const admin = await User.create({
        name: "Admin",
        email: process.env.ADMIN_EMAIL || "admin@yourbusiness.com",
        password: process.env.ADMIN_PASSWORD || "AdminPassword123!",
        role: "admin",
      });
      console.log("Admin user created successfully");
    }

    // Create default categories
    await seedCategories();

    // Create sample products
    await seedProducts();
  } catch (error) {
    console.error("Error seeding admin:", error);
  }
};

const seedCategories = async () => {
  try {
    const categoriesCount = await Category.count();

    if (categoriesCount === 0) {
      const categories = [
        {
          name: "Power Tools",
          slug: "power-tools",
          description: "High-quality power tools for professional and home use",
          seoTitle: "Power Tools - Professional Grade Equipment",
          seoDescription:
            "Shop our extensive collection of power tools including drills, grinders, and saws for all your projects.",
          sortOrder: 1,
        },
        {
          name: "Hand Tools",
          slug: "hand-tools",
          description: "Essential hand tools for every toolbox",
          seoTitle: "Hand Tools - Quality Manual Tools",
          seoDescription:
            "Discover our range of hand tools including wrenches, hammers, and measuring tools.",
          sortOrder: 2,
        },
        {
          name: "Solar Systems",
          slug: "solar-systems",
          description:
            "Complete solar power solutions for homes and businesses",
          seoTitle: "Solar Systems - Renewable Energy Solutions",
          seoDescription:
            "Explore our solar panels, inverters, and complete solar kits for sustainable energy.",
          sortOrder: 3,
        },
        {
          name: "Water Pumps",
          slug: "water-pumps",
          description: "Reliable water pumping solutions",
          seoTitle: "Water Pumps - Reliable Pumping Solutions",
          seoDescription:
            "Find the perfect water pump for your needs including submersible and surface pumps.",
          sortOrder: 4,
        },
        {
          name: "Welding Equipment",
          slug: "welding-equipment",
          description: "Professional welding machines and accessories",
          seoTitle: "Welding Equipment - Professional Welding Solutions",
          seoDescription:
            "Shop welding machines, electrodes, and welding accessories for all your welding needs.",
          sortOrder: 5,
        },
        {
          name: "Weighing Scales",
          slug: "weighing-scales",
          description: "Accurate weighing solutions for various applications",
          seoTitle: "Weighing Scales - Precision Measurement",
          seoDescription:
            "Digital and mechanical weighing scales for industrial and commercial use.",
          sortOrder: 6,
        },
      ];

      await Category.bulkCreate(categories);
      console.log("Default categories created successfully:", categories.length, "categories");
    } else {
      console.log("Categories already exist, count:", categoriesCount);
    }
  } catch (error) {
    console.error("Error seeding categories:", error);
  }
};

const seedProducts = async () => {
  try {
    const productsCount = await Product.count();

    if (productsCount === 0) {
      const categories = await Category.findAll();
      console.log("Found categories:", categories.map(c => ({ name: c.name, id: c.id })));

      if (categories.length > 0) {
        const powerToolsCategory = categories.find(c => c.name === "Power Tools");
        const handToolsCategory = categories.find(c => c.name === "Hand Tools");
        const solarCategory = categories.find(c => c.name === "Solar Systems");

        const products = [
          {
            title: "INGCO 680W Impact Drill",
            description:
              "Powerful 680W impact drill perfect for drilling through concrete, brick, and masonry. Features variable speed control and forward/reverse rotation.",
            shortDescription:
              "Heavy-duty 680W impact drill with variable speed control",
            price: 4000,
            originalPrice: 5500,
            categoryId: powerToolsCategory ? powerToolsCategory.id : categories[0].id,
            images: [
              {
                url: "impact-drill-680w.jpg",
                alt: "INGCO 680W Impact Drill",
                isPrimary: true,
              },
            ],
            specifications: [
              { name: "Power", value: "680W" },
              { name: "Chuck Size", value: "13mm" },
              { name: "No-load Speed", value: "0-3000rpm" },
              { name: "Impact Rate", value: "0-48000bpm" },
              { name: "Weight", value: "2.1kg" },
            ],
            tags: ["drill", "impact", "ingco", "power tool"],
            inStock: true,
            stockQuantity: 15,
            isFeatured: true,
            seoTitle: "INGCO 680W Impact Drill - Heavy Duty Power Tool",
            seoDescription:
              "Professional 680W impact drill with variable speed control. Perfect for concrete, masonry, and heavy-duty drilling applications.",
            seoKeywords: [
              "impact drill",
              "680w drill",
              "ingco tools",
              "power drill",
            ],
          },
          {
            title: "100W Solar Panel Kit",
            description:
              "Complete 100W solar panel kit with charge controller, cables, and mounting hardware. Perfect for off-grid applications and backup power systems.",
            shortDescription:
              "Complete 100W solar panel kit with accessories",
            price: 8500,
            originalPrice: 11000,
            categoryId: solarCategory ? solarCategory.id : categories[0].id,
            images: [
              {
                url: "solar-panel-100w.jpg",
                alt: "100W Solar Panel Kit",
                isPrimary: true,
              },
            ],
            specifications: [
              { name: "Power Output", value: "100W" },
              { name: "Voltage", value: "12V" },
              { name: "Current", value: "5.55A" },
              { name: "Efficiency", value: "18%" },
              { name: "Dimensions", value: "1200×540×35mm" },
            ],
            tags: ["solar", "renewable energy", "off-grid", "green energy"],
            inStock: true,
            stockQuantity: 25,
            isFeatured: true,
            isHotDeal: true,
            seoTitle: "100W Solar Panel Kit - Complete Solar Solution",
            seoDescription:
              "High-efficiency 100W solar panel kit with charge controller and accessories. Perfect for off-grid and backup power applications.",
            seoKeywords: [
              "solar panel",
              "100w solar",
              "solar kit",
              "renewable energy",
            ],
          },
          {
            title: "Tool Set 142 Pieces",
            description:
              "Comprehensive 142-piece tool set in organized carrying case. Includes sockets, spanners, screwdrivers, pliers, and measuring tools.",
            shortDescription: "Complete 142-piece tool set with carrying case",
            price: 12500,
            originalPrice: 15000,
            categoryId: handToolsCategory ? handToolsCategory.id : categories[0].id,
            images: [
              {
                url: "tool-set-142pcs.jpg",
                alt: "142 Piece Tool Set",
                isPrimary: true,
              },
            ],
            specifications: [
              { name: "Pieces", value: "142 tools" },
              { name: "Socket Sizes", value: "8-32mm" },
              { name: "Spanner Sizes", value: "8-24mm" },
              { name: "Case Material", value: "Blow-molded plastic" },
              { name: "Tool Material", value: "Chrome vanadium steel" },
            ],
            tags: ["tool set", "hand tools", "142 pieces", "toolkit"],
            inStock: true,
            stockQuantity: 20,
            seoTitle: "142 Piece Tool Set - Complete Hand Tool Kit",
            seoDescription:
              "Professional 142-piece tool set with sockets, spanners, and accessories in organized carrying case.",
            seoKeywords: [
              "tool set",
              "hand tools",
              "142 piece",
              "toolkit",
              "tool kit",
            ],
          },
        ];

        await Product.bulkCreate(products);
        console.log("Sample products created successfully");
      }
    }
  } catch (error) {
    console.error("Error seeding products:", error);
  }
};

module.exports = seedAdmin;
