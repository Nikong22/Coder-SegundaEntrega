const express = require("express");
const {carritosDao} = require('./dao/daos.js');

const { Router } = express;

let router = new Router();

router.post("/carrito", async (req, res) => {//crear carrito
  const carrito = await carritosDao.crearCarrito(req)
  res.json(carrito);
  res.status(200).end();
});

router.delete("/carrito/:id_carrito", (req, res) => { //borrar carrito
  const index = carritosDao.borrarCarrito(req);
  if (index == null) {
    return res.status(404).json({ msg: "Carrito no encontrado" });
  }
  res.status(200).end();
});

router.get("/carrito/:id_carrito/productos", async (req, res) => {//lista los productos del carrito
  const producto = await carritosDao.getProducto(req, res)
  if(producto == null){
    return res.send("No existe el carrito")
}
  res.json(producto);
});

router.post("/carrito/:id_carrito/productos/:id_producto", async (req, res) => {//agrega productos al carrito
  const carrito = await carritosDao.nuevoProducto(req);
  if(carrito){
    res.json(carrito);
  }else{
    res.json('No se pudo agregar el producto al carrito');
  }
});

router.delete("/carrito/:id_carrito/productos/:id_producto", async (req, res) => { //borrar un producto del carrito por su id de carrito y de producto
  const index = await carritosDao.borrarProducto(req);
  if (index == null) {
    return res.status(404).json({ msg: "Carrito no encontrado" });
  }
  res.status(200).end();
});

module.exports = router;