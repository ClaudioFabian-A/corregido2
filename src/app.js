import express from "express";
import { Server } from "socket.io";
import handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import productRouter from "../src/routes/products.router.js"
import ProductManager from "./managers/productManager.js"
import cartRouter from "../src/routes/carts.router.js"
import { __dirname } from "./utils.js";
import { v4 as uuidv4 } from 'uuid';
console.log(uuidv4());



const app = express();

const PORT = process.env.PORT || 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));



app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");



app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use('/', viewsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`);
})

const prodManager = new ProductManager(__dirname + "/files/Products.json");
const socketServer = new Server(httpServer);



socketServer.on("connection", async (socket) => {
    console.log("Cliente conectado con id: ", socket.id);

    const prodList = await prodManager.getProducts({});
    socketServer.emit("prodList", prodList);

    socket.on("updateProduct", async (obj) => {
        await prodManager.addProduct(obj);
        const prodList = await prodManager.getProducts({});
        socketServer.emit("prodList", prodList);
    });

    socket.on("deletElement", async (id) => {
        console.log(deletElement);
    
        await prodManager.deleteById(id);
        const prodList = await prodManager.getProducts({});
        socketServer.emit("prodList", prodList);
    });
    socket.on("disconnected", () => {
        console.log("Cliente desconectado");
    });
});











