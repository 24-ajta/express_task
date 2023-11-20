import express from "express";
import dotenv from "dotenv";
import conn from "./connection.js";
import router from "./router.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))
app.use("/",express.static("./static"));
app.use("/api",router);

conn().then(()=>{
    app.listen(process.env.PORT,error=>{
        if(error){
            console.log(error);
            return;
        }
        return console.log("Server started on:   http://localhost:"+process.env.PORT); 
    })
})
.catch(error=>{
    console.log(error);
})