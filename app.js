import express from "express";
import router from "./routes/servproRoutes.js";
import db from "./db/db.js";
import session from "express-session";
import { v4 as uuidv4 } from 'uuid';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Configurando a engine de visualização EJS
app.set('view engine', 'ejs');
app.set("views", "./views");

// Configuração única da sessão
app.use(session({
    genid: (req) => uuidv4(), // Usando UUIDs para IDs de sessão
    secret: 'teste12',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 60000
    }
}));

// Sincronizando o banco de dados e inicializando o servidor
db.sync({
    //force: true // descomente se você precisa forçar a sincronização recriando o banco de dados
}).then(() => {
    console.log("Conectado ao db!");
    app.use(router);
    app.listen(5000, () => {
        console.log("Server listening on port 5000!");
    });
}).catch((error) => {
    console.error("\nNão foi possível conectar ao banco de dados!\n");
    process.exit(1);
});
