import express from "express"
import Handlebars from 'express-handlebars'
import viewsRouter from './routes/views.router.js'
import productRouter from "../src/routes/products.router.js"
import ProductManager from "./managers/productManager.js"
import cartRouter from "../src/routes/carts.router.js"
import { Server } from 'socket.io'
import __dirname from './utils.js'
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Escuchando en puerto: ${PORT}`);
})
const prodManager = new ProductManager(`${__dirname}/files/Products.json`);
const io = new Server(server);


app.use(express.static(`${__dirname}/public`));
app.engine('handlebars', Handlebars.engine());
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')



io.on('connection', async (socket) => {

    socket.on('addProduct', async (data) => {
        await prodManager.addProduct(data);
        const prodList = await prodManager.getProducts({});
        io.emit('logs', logs)
    })
})
app.use((req, res, next) => {
    req.io = io;
    next();
})




app.use('/', viewsRouter)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



import { v4 as uuidv4 } from 'uuid';
console.log(uuidv4());

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)




