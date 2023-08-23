import express from "express"
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"
const app = express();
const PORT = 8080;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



import { v4 as uuidv4 } from 'uuid';
console.log(uuidv4());

app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)


app.listen(PORT, () => {
    console.log(`escuchando por ${PORT}`);
})
