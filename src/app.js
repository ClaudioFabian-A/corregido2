import express from "express"
import Handlebars from 'express-handlebars'
import viewRouter from './routes/views.router.js'
import productRouter from "../src/routes/products.router.js"
import cartRouter from "../src/routes/carts.router.js"
import { Server } from 'socket.io'
import { __dirname } from "./utils.js"
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Escuchando en puerto: ${PORT}`);
})


app.use(express.static(`${__dirname}/public`));
app.engine('handlebars', Handlebars.engine());
app.set('views', `${__dirname}`)
app.set('view engine', 'handlebars')

app.use('/', viewRouter)



app.use(express.json())
app.use(express.urlencoded({ extended: true }))



import { v4 as uuidv4 } from 'uuid';
console.log(uuidv4());

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)


const io = new Server(server);