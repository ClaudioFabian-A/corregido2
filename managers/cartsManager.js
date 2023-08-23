
import { error } from "console";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';
console.log(uuidv4());


export default class cartsManager {
    constructor(path) {
        this.path = path;
        this.carts = [];

    }

    getOllCart = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, "utf-8")
                const cart = JSON.parse(data)
                return cart;

            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    };
    getCartById = async (id) => {
        try {

            const cart = await this.getOllCart();
            const eCart = cart.find((e) => e.id === id);
            if (eCart) {
                console.log("ok");
                return eCart;
            } else {
                return "error el get";
            }

        } catch (error) {
            console.log(error);
        }
    }
    addPCartWithId = async (cid, pid) => {
        try {
            const ollCarts = await this.getOllCart();
            const ollCart = ollCarts.find((e) => e.id === cid)
            // const prodFind = ollCart.findIndex((e) => e.pId === pid);
            if (ollCart) {
                const atFinded = ollCart.products.some((p) => p.pid === pid);
            
            if (atFinded) {
                ollCart.products.find((p) => p.pid === pid).quantity++;
            } else {
                ollCart.products.push({
                    pid: pid,
                    quantity: 1
                });
            }

            await fs.promises.writeFile(this.path, JSON.stringify(ollCarts, null, 2));
            // } catch (error) {
            //     console.log(error);

            }
        } catch {
            console.log('error');}
        }
    
        // createId = async () => {
        //     try {
        //         if (fs.existsSync(this.path)) {
        //             const cIooCart = await fs.promises.readFile(this.path, "utf-8");
        //             const parCart = JSON.parse(cIooCart);
        //             const lenCart = parCart.length;
        //             if (lenCart != 0) { return parCart[lenCart - 1].id + 1; } else { return 1 }
        //         }else{
        //             console.log('lidst');
        //         }


        //     } catch (error) {
        //         console.log(error);
        //     }
        // }


    
    addCart = async () => {
        try {
            const carts = await this.getOllCart();
            let id = uuidv4();

            const cart = { id: id, products: [] };
            carts.push(cart);
            await fs.promises.writeFile(this.path, JSON.stringify(carts));
            return cart;
        } catch {
            console.log(error);
            return []
        }
    }
}

