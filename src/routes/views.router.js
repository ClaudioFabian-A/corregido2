const socket = io();
import { Router } from "express"
import ProductManager from "../managers/productManager.js"
import __dirname from "../utils.js";
const manager = new ProductManager(__dirname + '/files/Products.json')
const router = Router()




router.get('/', (req, res) => {

    res.render('Home');
})





export default router;
