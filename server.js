const express = require("express");
const routes = require("./routes/productos")
const carritos = require('./routes/carrito');
const fs = require('fs')
require('dotenv').config({path: __dirname + '/.env'})

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Servidor HTTP escuando en el puerto ${PORT}`));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes)
app.use("/api", carritos)


