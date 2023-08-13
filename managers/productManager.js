
import { error } from 'console';
import fs from 'fs'


export default class productManager {
    constructor(path) {
        (this.path = path), (this.produsts = [])
    }
    getProducts = async () => {

        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const produ = JSON.parse(data);
                return produ;
            } else {
                return [];
            }
        } catch (error) {
            console.log(Error);
        }
    };

    getProductById = async (prodID) => {

        let datas = await this.getProducts();
        const idProd = datas.find((prod) => prod.id === prodID);
        if (idProd) {
            return idProd;
        } else {
            console.log('producto no encontrado');
        }
    };

    updateProduct = async (Products) => {
        try {
            const produ = await this.getProducts();


            if (produ.length === 0) {
                Products.id = 1;

            } else {
                Products.id = produ[produ.length - 1].id + 1;
            }

            produ.push(Products);

            await fs.promises.writeFile(this.path, JSON.stringify(produ, null, '\t'));
            return Products;





        } catch (error) {
            console.log(error);

        }
    };
    deleteById = async (id) => {
        let product = await fs.promises.readFile(this.path, "utf-8");

        let allProds = JSON.parse(product);
        let deleteProduct = allProds.filter((product) => product.id !== id);
        await fs.promises.writeFile(this.path, JSON.stringify(deleteProduct), "utf-8");

        console.log('Producto eliminado de la lista');
        // console.log(deleteProduct);
    };
    addProduct = async (product) => {
        try {
            const products = await this.getProducts();
            const {
                title,
                descripcion,
                price,
                thumbnail = [],
                category,
                status = true,
                code,
                stock,

            } = product;
            const rCode = products.find((e) => e.code === product.code);
            if (rCode) { return ` El codigo ${rCode} no puede utilizarce` };
            let id;

            if (product.title || product.descripcion || product.price || product.thumbnail || category || status || product.code || product.stock) {
                if (products.length === 0) {
                    id = 1;
                } else {
                    id = products[products.length - 1].id + 1;
                }



                const product = {

                    title,
                    descripcion,
                    price,
                    thumbnail,
                    code,
                    stock,
                    id,
                }
                products.push({ ...product, id });

                await fs.promises.writeFile(
                    this.path,
                    JSON.stringify(products, null, "/t")
                );
                return product;


            } else {
                console.log("campos incompletos");
            };
        } catch (error) {
            console.log(error);
        }
    };

}
