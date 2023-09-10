import express from "express"
import Handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import productRouter from "../src/routes/products.router.js"
import ProductManager from "./managers/productManager.js"
import cartRouter from "../src/routes/carts.router.js"
import { Server } from 'socket.io'
import { __dirname } from './utils.js'
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Escuchando en puerto: ${PORT}`);
})
const prodManager = new ProductManager(__dirname + "/files/Products.json");
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.engine("handlebars", Handlebars.engine());
app.set("view engine", 'handlebars');
app.set("views", `${__dirname}/views`);



import { v4 as uuidv4 } from 'uuid';
console.log(uuidv4());

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.use('/', viewsRouter)



app.use(express.json())
app.use(express.urlencoded({ extended: true }))







io.on("connection", async (socket) => {
    console.log("Cliente conectado con id: ", io.id);
  
    const prodList = await prodManager.getProducts({});
    io.emit("sendData", prodList);
  
    socket.on("updateProduct", async (prod) => {
      await prodManager.addProduct(prod);
      const listProducts = await prodManager.getProducts({});
      io.emit("sendProducts", listProducts);
    });
  
    socket.on("deleteProduct", async (id) => {
      await pmanager.deleteProduct(id);
      const listProducts = await pmanager.getProducts({});
      io.emit("sendProducts", listProducts);
    });
    socket.on("disconnect", () => {
      console.log("Cliente desconectado");
    });
  });







// app.use((req, res, next) => {
//     req.io = io;
//     next();
// })











