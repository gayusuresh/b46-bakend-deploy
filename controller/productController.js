const productModel = require("../model/product.model");

const getProducts = async (req, res) => {
    try {
        const viewproducts = await productModel.find();
        
        return res.json({ sucess: true, viewproducts });

    }
    catch (err)
    {
        return res.status(500).json("fetch user data failed")
    }
}

const addProducts = async (req, res) => {
    try {
        const { pname, price, quantity } = req.body
        if (pname == "" || price == "" || quantity == "") {
          res.status(404).json({ message: "pname required" });
        }
        const addProduct = await productModel.create({ pname, price, quantity });
           return res.status(200).json(addProduct);

    }
    catch (err)
    {
        return res.status(500).json({message:"product data added task failed"})
    }
}

//req.params.id,re.body,{new:true}
const updateProducts = async (req, res) => {
    try {
        const updateuser = await productModel.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true },
        );
        return res.status(200).json(updateProducts);
    }
    catch (err) {
        return res.status(500).json({message:"product data updated failed"})
    }
}


const deleteProducts = async (req, res) => {
    try {
        const deleteProduct = await productModel.findByIdAndDelete(req.params.id);

        return res
          .status(200)
          .json({ message: "product data deleted", deleteProduct });
    }
    catch (err)
    {
        return res.status(500).json({message:"product  delete operation failed"})
    }
}
module.exports = { getProducts, addProducts, updateProducts, deleteProducts };