import { log } from "console";
import fs from "fs";

export default class cartsManager {
    constructor(path) {
        this.path = path;
        this.carts = [];

    }

    getOllCart = async () => {


        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.res.readFile(this.path, 'utf-8');
                const cart = JSON.parse(data);
                return cart;

            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        };
        getCartById = async (id) => {
            try {
                const cart = await this.getOllCart();
                const eCart = cart.find((cart) => cart.id === id)
                eCart ? eCart : "cart no encontrada"
            } catch (error) {
                console.log(error);
            }
        }
        addCartWithId = async (cId, pId) => {
            try {
                const ollCarts = await this.getOllCart();
                const ollCart = ollCarts.find((ollCart) => ollCart.id === cId)
                const prodFind = ollCart.products.some((e) => e.pId === pId);
                prodFind ? ollCart.products.find((e) = e.pId === pId).quantity++ : ollCart.products.push({ pId: pId, quantity: 1 });
            } catch (error) {
                console.log(error);

            }
        }
        createId = async()=>{
            try {
                
                
            } catch (error) {
                console.log(error);
            }
        }
        addCart = async () => {
            const ollCarts = await this.getOllCart();
            const id = await this.createId();
            const nCart = { id, products: [] };
            ollCarts.push(nCart);
            await fs.promises.writeFile(this.path, JSON.stringify(ollCarts, null, '/t'));

        }




    }






}