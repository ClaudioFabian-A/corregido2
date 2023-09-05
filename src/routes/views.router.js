
import { Router } from "express"
import ProductManager from "../managers/productManager.js"
import __dirname from "../utils.js";
const manager = new ProductManager(__dirname + '/files/Products.json')
const router = Router()




router.get('/', async (req, res) => {
    const productosManager = manager.getProducts();

    res.render('Home', { productosManager });
})
router.get("/realTimeProducts", async (req, res) => {
    const productosManager = manager.getProducts()
    res.render('realTimeProducts', { productosManager });
})





export default router;
