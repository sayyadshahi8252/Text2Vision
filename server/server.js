import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"

import connectDb from "./config/connectDb.js";
import userRoutes from "./routes/user.routes.js";
import ImageGenerateRouter from "./routes/ImageGenerate.route.js"


const app=express();
dotenv.config();
app.use(cookieParser())
app.use(cors({
    origin:`${process.env.CORS_ORIGIN}`,
    credentials:true
}))
console.log("CORS ORIGIN:", process.env.CORS_ORIGIN);
app.use(express.json())
app.use(express.urlencoded({extended:true}))



connectDb()

app.use("/api/users",userRoutes)
app.use("/api/imagegenerate",ImageGenerateRouter)

app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})