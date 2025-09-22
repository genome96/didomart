const db = require('./src/config/database');
const { Product, Category } = require('./src/models');

(async () => {
  try {
    await db.testConnection();
    
    const products = await Product.findAll({ 
      include: { model: Category, as: 'category' }
    });
    
    console.log(`Products in database: ${products.length}`);
    products.forEach(p => {
      console.log(`- ${p.title} (Category: ${p.category.name})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
})();
