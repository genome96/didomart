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
        const waterPumpsCategory = categories.find(c => c.name === "Water Pumps");
        const weldingCategory = categories.find(c => c.name === "Welding Equipment");
        const weighingCategory = categories.find(c => c.name === "Weighing Scales");

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
            originalPrice: 10000,
            category: categories.find((c) => c.name === "Solar Systems")?._id,
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
            title: "Electric Submersible Water Pump 1HP",
            description:
              "High-quality 1HP electric submersible water pump suitable for boreholes, wells, and water tanks. Corrosion-resistant design with thermal protection.",
            shortDescription:
              "Reliable 1HP submersible water pump with thermal protection",
            price: 18500,
            originalPrice: 22000,
            category: categories.find((c) => c.name === "Water Pumps")?._id,
            images: [
              {
                url: "submersible-pump-1hp.jpg",
                alt: "1HP Submersible Water Pump",
                isPrimary: true,
              },
            ],
            specifications: [
              { name: "Power", value: "1HP (750W)" },
              { name: "Flow Rate", value: "40L/min" },
              { name: "Head", value: "35m" },
              { name: "Inlet/Outlet", value: "1 inch" },
              { name: "Voltage", value: "220V" },
            ],
            tags: ["water pump", "submersible", "1hp", "borehole pump"],
            inStock: true,
            stockQuantity: 8,
            seoTitle:
              "1HP Electric Submersible Water Pump - Reliable Water Solution",
            seoDescription:
              "Professional 1HP submersible water pump for boreholes and wells. Corrosion-resistant with thermal protection.",
            seoKeywords: [
              "submersible pump",
              "1hp water pump",
              "borehole pump",
              "electric pump",
            ],
          },
          {
            title: "Digital Platform Scale 100kg",
            description:
              "Accurate digital platform weighing scale with 100kg capacity. Features large LCD display, tare function, and robust steel platform.",
            shortDescription:
              "Precision 100kg digital platform scale with LCD display",
            price: 7500,
            originalPrice: 9000,
            category: categories.find((c) => c.name === "Weighing Scales")?._id,
            images: [
              {
                url: "digital-scale-100kg.jpg",
                alt: "100kg Digital Platform Scale",
                isPrimary: true,
              },
            ],
            specifications: [
              { name: "Capacity", value: "100kg" },
              { name: "Accuracy", value: "±10g" },
              { name: "Platform Size", value: "40×50cm" },
              { name: "Display", value: "Large LCD" },
              { name: "Power", value: "AC adapter + rechargeable battery" },
            ],
            tags: [
              "weighing scale",
              "digital scale",
              "100kg",
              "platform scale",
            ],
            inStock: true,
            stockQuantity: 12,
            seoTitle: "100kg Digital Platform Scale - Precision Weighing",
            seoDescription:
              "Professional 100kg digital platform scale with large LCD display and tare function. Perfect for commercial use.",
            seoKeywords: [
              "digital scale",
              "platform scale",
              "100kg scale",
              "weighing scale",
            ],
          },
          {
            title: "MMA 200A Welding Machine",
            description:
              "Professional inverter-based MMA welding machine with 200A output. Features hot start, arc force, and anti-stick functions for superior welding performance.",
            shortDescription: "Professional 200A MMA inverter welding machine",
            price: 16500,
            originalPrice: 20000,
            category: categories.find((c) => c.name === "Welding Equipment")
              ?._id,
            images: [
              {
                url: "welding-machine-200a.jpg",
                alt: "MMA 200A Welding Machine",
                isPrimary: true,
              },
            ],
            specifications: [
              { name: "Output Current", value: "200A" },
              { name: "Input Voltage", value: "220V±15%" },
              { name: "Electrode Size", value: "1.6-4.0mm" },
              { name: "Duty Cycle", value: "60% at 150A" },
              { name: "Weight", value: "5.2kg" },
            ],
            tags: ["welding machine", "mma welder", "200a", "inverter welder"],
            inStock: true,
            stockQuantity: 6,
            seoTitle: "MMA 200A Welding Machine - Professional Inverter Welder",
            seoDescription:
              "High-performance 200A MMA welding machine with hot start and arc force. Perfect for professional welding applications.",
            seoKeywords: [
              "welding machine",
              "mma welder",
              "200a welder",
              "inverter welder",
            ],
          },
          {
            title: "Tool Set 142 Pieces",
            description:
              "Comprehensive 142-piece tool set in organized carrying case. Includes sockets, spanners, screwdrivers, pliers, and measuring tools.",
            shortDescription: "Complete 142-piece tool set with carrying case",
            price: 12500,
            originalPrice: 15000,
            category: categories.find((c) => c.name === "Hand Tools")?._id,
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
        console.log("Sample products created");
      }
    }
  } catch (error) {
    console.error("Error seeding products:", error);
  }
};

module.exports = seedAdmin;
