const { syncDatabase, Product } = require("../models");

const imageUpdates = {
  1: [
    "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=600&fit=crop",
  ],
  2: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=600&fit=crop",
  ],
  3: [
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=600&fit=crop",
  ],
  4: [
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1581092582021-ac94b7b4e786?w=600&h=600&fit=crop",
  ],
};

async function updateProductImages() {
  try {
    console.log("🖼️  Updating product images...");

    await syncDatabase();

    const products = await Product.findAll();
    console.log(`Found ${products.length} products to update`);

    for (const product of products) {
      const images = imageUpdates[product.id];
      if (images) {
        await product.update({ images });
        console.log(`✅ Updated images for: ${product.title}`);
      } else {
        // Set default image if no specific images
        await product.update({
          images: [
            "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600&h=600&fit=crop",
          ],
        });
        console.log(`✅ Set default image for: ${product.title}`);
      }
    }

    console.log("🎉 Product image update completed!");
  } catch (error) {
    console.error("❌ Image update failed:", error);
  } finally {
    process.exit(0);
  }
}

updateProductImages();
