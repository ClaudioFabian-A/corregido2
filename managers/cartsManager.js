
import fs from "fs";

export default class CartsManager {
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
            // const { cid } = id;
            // if (fs.existsSync(this.path)) {
            const cart = await this.getOllCart();
            const eCart = cart.find((e) => e.id === id);
            if (eCart) {
                console.log("ok");
                return eCart;
            } else {
                console.log("error el get");
            }

        } catch (error) {
            console.log(error);

        }
    }
    addPCartWithId = async (cId, pId) => {
        // try {
        const ollCarts = await this.getOllCart();
        const ollCart = ollCarts.find((e) => e.id === cId)
        const prodFind = ollCart.products.findIndex((e) => e.pId === pId);
        prodFind ? ollCart.products.find((e) = e.pId === pId).quantity++ : ollCart.products.push({ pId: pId, quantity: 1 });
        await fs.promises.writeFile(this.path, JSON.stringify(ollCarts, null, 2))
        // } catch (error) {
        //     console.log(error);

        // }
    }
    createId = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const cIooCart = await fs.promises.readFile(this.path, "utf-8");
                const parCart = JSON.parse(cIooCart);
                const lenCart = parCart.length;
                if (lenCart != 0) { return parCart[lenCart - 1].id + 1; } else { return 1 }
            }

        } catch (error) {
            console.log(error);
        }
    }
    addCart = async () => {
        const ollCarts = await this.getOllCart();
        const id = await this.createId();
        const nCart = { id, products: [] };
        ollCarts.push(nCart);
        await fs.promises.writeFile(this.path, JSON.stringify(ollCarts, null, 2));

    }
}

