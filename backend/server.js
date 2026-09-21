import dns from "dns"
import "dotenv/config"
import app from "./src/app.js";
import connectDB from "./src/config/database.js";
import { testApi } from "./src/services/ai.service.js";

const PORT = process.env.PORT || 8000

dns.setServers(["8.8.8.8", "8.8.4.4"]);
testApi()
connectDB()

.then(()=> {
    app.listen(3000 , () => {
        console.log(`Server is running on port ${PORT}`);
    })
})
.catch((err) => {
    console.log("MogoDb connection failed" , err)
    process.exit(1)
})




