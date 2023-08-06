import fs from 'fs'


export default class productManager {
    constructor(path) {
        this.path = path;
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
    }
}