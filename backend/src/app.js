import express from "./app"
import cookieParser from "cookie-parser"

const app = express()

//Middleware 
app.use(express.json())
app.use(express.urlecoded( {extends : true}))
app.use(cookieParser())


// Health check
app.get("/" , ( req , res) =>{
    res.json({
        message : "Server is running"
    })
})

export default app