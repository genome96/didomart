const { syncDatabase, Product } = require("../models");

// Updated working Unsplash image URLs
const workingImageUpdates = {
  1: [
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=600&fit=crop&crop=center",
  ],
  2: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=600&fit=crop&crop=center",
  ],
  3: [
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=600&fit=crop&crop=center",
  ],
  4: [
    "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=600&fit=crop&crop=center",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=600&fit=crop&crop=center",
  ],
};

async function updateWorkingImages() {
  try {
    console.log("🔧 Updating to working image URLs...");

    await syncDatabase();

    const products = await Product.findAll();
    console.log(`Found ${products.length} products to update`);

    for (const product of products) {
      const images = workingImageUpdates[product.id];
      if (images) {
        await product.update({ images });
        console.log(`✅ Updated images for: ${product.title}`);
      } else {
        // Set reliable default image
        await product.update({
          images: [
            "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=600&fit=crop&crop=center",
          ],
        });
        console.log(`✅ Set default image for: ${product.title}`);
      }
    }

    console.log("🎉 Working image update completed!");
  } catch (error) {
    console.error("❌ Image update failed:", error);
  } finally {
    process.exit(0);
  }
}

updateWorkingImages();
