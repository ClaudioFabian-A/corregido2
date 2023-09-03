import express from "express"
import Handlebars from 'express-handlebars'
import viewRouter from './routes/views.router.js'
import productRouter from "../src/routes/products.router.js"
import cartRouter from "../src/routes/carts.router.js"
const app = express();
const PORT = process.env.PORT || 8080;

app.engine('handlebars', Handlebars.engine());
app.set('views', 'src/views')
app.set('view engine', 'handlebars')

app.use('/', viewRouter)



app.use(express.json())
app.use(express.urlencoded({ extended: true }))



import { v4 as uuidv4 } from 'uuid';
console.log(uuidv4());

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)


app.listen(PORT, () => {
    console.log(`Escuchando en puerto: ${PORT}`);
})
