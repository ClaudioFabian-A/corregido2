import express from "express"
import productRouter from "./routes/products.router.js"
const app = express();
const PORT = 8080;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use("/api", productRouter)




app.listen(PORT, () => {
    console.log(`Server on PORT : ${PORT}`);
})
