let carrito = require("../../models/carritos");
const fs = require('fs')

class Funciones {
    getSiguienteId = (carritos) => {
        let ultimoId = 0;
        carritos.forEach((carrito) => {
            if (carrito.id > ultimoId) {
                ultimoId = carrito.id;
            }
        });
        return ++ultimoId;
    };
    inicializar = (carritos) => {
        let id = 1
        carritos.forEach((carrito) => {
            if (!carrito.id) {
                carrito.id = id++
            }
        });
    }
}
const funciones = new Funciones();
funciones.inicializar(carrito)

const crearCarrito = (req, res) => {
    let carritos = fs.readFileSync("./carrito.txt", 'utf-8')
    carritos = JSON.parse(carritos)
    carrito = {
        id: funciones.getSiguienteId(carritos),
        timestamp: Date.now(),
        productos: [
        ]
    }
    carritos.push(carrito)
    fs.writeFileSync('./carrito.txt', JSON.stringify(carritos));
}

const borrarCarrito = (req, res) => {
    const { id_carrito } = req.params
    let carritos = fs.readFileSync("./carrito.txt", 'utf-8')
    carritos = JSON.parse(carritos)
    const index = carritos.findIndex((carrito) => carrito.id == id_carrito);
    carritos.splice(index, 1);
    fs.writeFileSync('./carrito.txt', JSON.stringify(carritos));
    return index
}

const getProductos = (req, res) => {
    const { id_carrito } = req.params;
    let carritos = fs.readFileSync("./carrito.txt", 'utf-8')
    carritos = JSON.parse(carritos)
    const carrito = carritos.find((carrito) => carrito.id == id_carrito);
    return carrito
}

const nuevoProducto = (req, res) => {
    const { id_carrito } = req.params;
    const { id_producto } = req.params;
    let productos = fs.readFileSync("./productos.txt", 'utf-8')
    productos = JSON.parse(productos)
    let carritos = fs.readFileSync("./carrito.txt", 'utf-8')
    carritos = JSON.parse(carritos)
    const carrito = carritos.find((carrito) => carrito.id == id_carrito);
    const producto = productos.find((producto) => producto.id == id_producto);
    carrito.productos.push(producto);
    fs.writeFileSync('./carrito.txt', JSON.stringify(carritos));
    return carrito
}

const borrarProducto = (req, res) => {
    const { id_carrito } = req.params;
    const { id_producto } = req.params;
    let carritos = fs.readFileSync("./carrito.txt", 'utf-8')
    carritos = JSON.parse(carritos)
    const carrito = carritos.find((carrito) => carrito.id == id_carrito);
    const index = carrito.productos.findIndex((producto) => producto.id == id_producto);
    carrito.productos.splice(index, 1);
    fs.writeFileSync('./carrito.txt', JSON.stringify(carritos));
}

module.exports = { crearCarrito, borrarCarrito, getProductos, nuevoProducto, borrarProducto }