import { Router } from "express";
import cartsManager from "../managers/cartsManager.js";
import { __dirname } from "../utils.js";
const manager = new cartsManager(__dirname + "/files/Carts.json");
const router = Router();

router.get('/', async (req, res) => {
    const carts = await manager.getOllCart();
    carts.length === 0 ? res.status(400).json({ message: `No existen Carts` }) : res.status(200).json(carts)

})
router.get('/:cid', async (req, res) => {
    const cartsId = parseInt(req.params.cid);
    const carts = await manager.getCartById(cartsId);
    carts ? res.status(200).json(carts) : res.status(400).json({ message: `Cart inexistente` })
})
router.post('/', async (req, res) => {
    const cart = await manager.addCart();
    cart ? res.status(201).json({ message: `Cart creada con exito`, cart }) : res.status(400).json({ message: `Error al crear el Cart`, cart })
})
router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const cid = parseInt(req.params.cid);
        const pid = parseInt(req.params.pid);
        await manager.addPCartWithId(cid, pid);
        res.status(201).json({ message: "producto agregado con exito" })

    } catch (error) {
        console.log("Error al cargar el producto", error);
        res.status(525).json({ message: `error al cargar el cart` })
    }
})
// router.delete('/carts/:cid', async (req, res) => {
//     const id = parseInt(req.params.id)
//     const cart = await manager.getCartsById(id)
//     cart ? res.status(200).json({ message: `Cart eliminada con exito` }) : res.status(400).json({ message: `error al eliminarel cart` })
// })
// router.put('/carts/:cid', async (req, res) => {
//     const id = parseInt(req.params.id)
//     const cart = await manager.getCartsById(id);
//     cart ? res.status(200).json(cart) : res.status(400).json({ message: `Cart no agregada.` })
// })
export default router