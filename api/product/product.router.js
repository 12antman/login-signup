const { createProduct,
    getProducts,
    updateProduct,
    deleteProduct
    } = require("./product.controller");
const router = require("express").Router();

router.post("/", createProduct);
router.get("/", getProducts);
router.patch("/", updateProduct);  
router.delete("/", deleteProduct); 
module.exports = router;