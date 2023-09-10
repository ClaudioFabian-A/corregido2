import express from "express"
import { Server } from "socket.io";
import Handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import productRouter from "../src/routes/products.router.js"
import ProductManager from "./managers/productManager.js"
import cartRouter from "../src/routes/carts.router.js"
import __dirname from "./utils.js";

const app = express();

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));


const prodManager = new ProductManager(__dirname + "/files/Products.json");
const io = new Server(server);
console.log(`esto ${io}`);








app.engine("handlebars", Handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", 'handlebars');



io.on("connection", async (socket) => {
    
    const prodList = await prodManager.getProducts({});
    io.emit("sendData", prodList);
    console.log("se escucha", socket.id)
    
    


    socket.on("updateProduct", async (prod) => {
        await prodManager.addProduct(prod);
        const listProducts = await prodManager.getProducts({});
        io.emit("sendProducts", listProducts);
    });

    socket.on("deleteProduct", async (id) => {
        await prodManager.deleteProduct(id);
        const listProducts = await prodManager.getProducts({});
        io.emit("sendProducts", listProducts);
    });
    socket.on("disconnect", () => {
        console.log("Cliente desconectado");
    });
});





app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use('/', viewsRouter);





import { v4 as uuidv4 } from 'uuid';
console.log(uuidv4());








// app.use((req, res, next) => {
//     req.io = io;
//     next();
// })











