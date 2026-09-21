import dns from "dns"
import "dotenv/config"
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import  http from "http"
import { initSocket } from "./src/sockets/server.sockets.js";


const PORT = process.env.PORT || 8000

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const httpServer = http.createServer(app);
initSocket(httpServer);

connectDB()

.catch((err) => {
    console.log("MongoDB connection failed" , err)
    process.exit(1)
})

httpServer.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`)
})




