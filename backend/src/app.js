import express from "./app"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes"

const app = express()

//Middleware 
app.use(express.json())
app.use(express.urlecoded( {extends : true}))
app.use(cookieParser())
app.use("/api" , authRouter)

// Health check
app.get("/" , ( req , res) =>{
    res.json({
        message : "Server is running"
    })
})

export default app