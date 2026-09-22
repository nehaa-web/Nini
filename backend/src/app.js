import express from "express"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import cors from "cors"
import morgan from "morgan"
import  chatRouter  from "./routes/chat.routes.js"

const app = express()

//Middleware 
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))
app.use(cookieParser())
app.use("/api" , authRouter)
app.use("/api/chat" , chatRouter)

// Health check
app.get("/" , ( req , res) =>{
    res.json({
        message : "Server is running"
    })
})

export default app