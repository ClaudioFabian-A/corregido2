
import fs from "fs"
export default class cartsManager {
    constructor(path) {
        this.path = path;
        this.carts = [];

    }

    getCart = async () => {


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
        }
    }






}