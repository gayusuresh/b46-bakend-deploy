const express = require("express");
const router = express.Router();

const productController = require("../controller/productController");
const authMiddleware=require("../middleware/auth.middleware")

router.get("/view", authMiddleware(), productController.getProducts);
router.post("/save", authMiddleware("Admin"), productController.addProducts);
router.put("/update/:id", authMiddleware("Admin"),productController.updateProducts);
router.delete("/remove/:id", productController.deleteProducts);

module.exports = router;
