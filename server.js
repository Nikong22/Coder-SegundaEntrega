const express = require("express");
const routes = require("./api/productos")
const carritos = require('./api/carrito');
require('dotenv').config({path: __dirname + '/.env'})


const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Servidor HTTP escuando en el puerto ${PORT}`));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes)
app.use("/api", carritos)


