import { Router } from "express"
import ProductManager from "../managers/productManager.js"
import __dirname from "../utils.js";
const manager = new ProductManager(__dirname + "/files/Products.json");
const router = Router();


router.get("/", async (req, res) => {
    const { limit } = req.query;
    const products = await manager.getProducts();
    const part = products.slice(0, limit);
    limit ? res.status(206).json(products.slice(0, limit)) : res.status(200).json(products)
    console.log(products);

});
router.get("/:pid", async (req, res) => {
    const id = parseInt(req.params.pid);
    const datas = await manager.getProductById(id);
    datas ? res.status(200).json(datas) : res.status(400).json({ message: 'no encontrado' })

});




router.put("/:pid", async (req, res) => {

    const product = await manager.updateProduct(req.params, req.body);
    product ? res.status(400).json({ message: "Prducto no agregado" }) : res.status(200).json({ message: "producto actualizado" })



});
router.delete("/:pid", async (req, res) => {

    const product = await manager.deleteById(req.params);
    product ? res.status(400).json({ message: `error al eliminar el producto` }) : res.status(200).json({ message: `Producto eliminado con exito` })
});

router.post("/", async (req, res) => {
    const product = await manager.addProduct(req.body);
    product ? res.status(201).json({ message: `Producto creado con exito`, product }) : res.status(400).json({ message: `error al crear el producto` });
    
})

export default router