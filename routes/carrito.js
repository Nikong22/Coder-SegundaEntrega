const express = require("express");
const carrito_controller = require('./controllers/carrito.controller');
const fs = require('fs')

const { Router } = express;

let router = new Router();

router.post("/carrito", (req, res) => {//crear carrito
  const carrito = carrito_controller.crearCarrito()
  res.status(200).end();
});

router.delete("/carrito/:id_carrito", (req, res) => { //borrar carrito
  const index = carrito_controller.borrarCarrito(req);
  if (index == -1) {
    return res.status(404).json({ msg: "Carrito no encontrado" });
  }
  res.status(200).end();
});

router.get("/carrito/:id_carrito/productos", (req, res) => {//lista los productos del carrito
  const productos = carrito_controller.getProductos(req, res)
  res.json(productos)
});

router.post("/carrito/:id_carrito/productos/:id_producto", (req, res) => {//agrega productos al carrito
  const carrito = carrito_controller.nuevoProducto(req);
  res.json(carrito);
});

router.delete("/carrito/:id_carrito/productos/:id_producto", (req, res) => { //borrar un producto del carrito por su id de carrito y de producto
  const index = carrito_controller.borrarProducto(req);
  if (index == -1) {
    return res.status(404).json({ msg: "Carrito no encontrado" });
  }
  res.status(200).end();
});

module.exports = router;