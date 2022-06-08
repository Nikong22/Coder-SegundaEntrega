const express = require("express");
const productos_controller = require('./controllers/productos.controller');

const { Router } = express;

let router = new Router();

router.get('/productos', function (req, res) {
  const productos = productos_controller.getProductos()
  res.json(productos);
});

router.get("/productos/:id", (req, res) => {
  const producto = productos_controller.getProducto(req, res)
  res.json(producto);
});

router.post("/productos", function (req, res) {
  if (req.query.admin) {
    productos_controller.nuevoProducto(req);
    res.send("Producto Añadido");
  } else {
    res.send({ error: -1, descripcion: "ruta 'x' método 'y' no autorizada" })
  }
});

router.put("/productos/:id", (req, res) => {
  if (req.query.admin) {
    productos_controller.actualizarProducto(req);
    res.send("Producto Actualizado");
  } else {
    res.send({ error: -1, descripcion: "ruta 'x' método 'y' no autorizada" })
  }
});

router.delete("/productos/:id", (req, res) => {
  if (req.query.admin) {
    productos_controller.borrarProducto(req);
    res.send("Producto Borrado");
  } else {
    res.send({ error: -1, descripcion: "ruta 'x' método 'y' no autorizada" })
  }
});

module.exports = router;