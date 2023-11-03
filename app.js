import express from "express";
import router from "./routes/servproRoutes.js";
import db from "./db/db.js";

const app = express();
app.use(express.urlencoded({extended: true}));


app.set('view engine', 'ejs');
app.set("views", "./views");

app.use(express.urlencoded({extended: true}));

db.sync().then(()=>{
    console.log("Conectado ao db!");
}).then(()=>{
    app.listen(5000,()=>{
        app.use(router);
        console.log("Server listening on port 5000!")
    })
});
