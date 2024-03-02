const ProductService = require('./product.service');

module.exports = {
  createProduct: (req, res) => {
    const body = req.body;
    ProductService.createProduct(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error"
        });
      }
      return res.status(201).json({ 
        success: 1,
        message: "Product created successfully",
        data: results
      });
    });
  },

  getProducts: (req, res) => {
    ProductService.getProducts((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results
      });
    });
  },

  updateProduct: (req, res) => {
    const body = req.body;
    ProductService.updateProduct(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error"
        });
      }
      if (!results) {
        return res.status(404).json({
          success: 0,
          message: "Product not found or no changes made"
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Product updated successfully"
      });
    });
  },

  deleteProduct: (req, res) => {
    const data = req.body;
    ProductService.deleteProduct(data, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "Database connection error"
        });
      }
      if (!result) {
        return res.status(404).json({ 
          success: 0,
          message: "Product not found or no changes made"
        });
      }
      return res.status(200).json({ 
        success: 1, 
        message: "Product deleted successfully" 
      });
    });
  }
};