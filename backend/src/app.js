import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import cors from "cors"

const app = express()

//Middleware 
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use("/api" , authRouter)

// Health check
app.get("/" , ( req , res) =>{
    res.json({
        message : "Server is running"
    })
})

export default app