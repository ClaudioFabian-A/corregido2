import { Router } from "express"
import productManager from "../managers/productManager.js";
import { __dirname } from "../utils.js";
const manager=new productManager(__dirname+'/files/products.json')
const router = Router()


router.get('/products', async (req, res) => {
     //const { limit } = req.query;
    const products = await manager.getProducts();
     //const part = products.slice(0, limit)
     //limit ? res.status(200).json(part) : res.status(200).json(products)
    res.json({ products })


});
router.get('/products/:id', async (req, res) => {
    const prodID = parseInt(req.params.id)
    const product = await manager.getProductById(prodID)
    product ? res.status(200).json(product) : res.status(400).json({ message: "Product not found" })
});
export default router