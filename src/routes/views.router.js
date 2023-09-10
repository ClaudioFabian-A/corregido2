
import { Router } from "express";
import ProductManager from "../managers/productManager.js";
import { __dirname } from "../utils.js";
const prodManager = new ProductManager(__dirname + "/files/Products.json");
const router = Router();




router.get("/", async (req, res) => {
    const prodList = await prodManager.getProducts();

    res.render("Home", { prodList });
});
router.get("/realTimeProducts", async (req, res) => {
    const prodList = await prodManager.getProducts();
    res.render("realTimeProducts", { prodList });
});

export default router;
