const { optionsSQL } = require('../../../options/SQLite3');
const knexSQL = require('knex')(optionsSQL);

const carritos = []

// knexSQL.schema.dropTableIfExists('carritos')
// .then(()=>console.log('Tabla borrada carritos...'))
// .catch(e=>{
//     console.log('Error en drop:', e);
//     knexSQL.destroy();
//     process.exit(500);
// });

knexSQL.schema.createTableIfNotExists('carritos', table => {
    table.increments('id'),
        table.timestamp('timestamp'),
        table.text('productos')
})
    .catch(e => {
        console.log('Error en proceso:', e);
        knexSQL.destroy();
    });
knexSQL.from('carritos').select('*')
    .then((carritosDB) => {
        for (let carrito of carritosDB) {
            carritos.push(carrito)
        }
    })

let CarritosDaoSQLite3 = class CarritosDaoSQLite3 {

    crearCarrito = async (req, res) => {
        let carritoNuevo = {
            timestamp: new Date(),
            productos: JSON.stringify([])
        };
        const carritos_id = await
            knexSQL('carritos').insert(carritoNuevo)
                .then(function (result) {
                    console.log(result)
                    return result
                })
        const carrito = await
            knexSQL.from('carritos').select('*').where('id', '=', carritos_id)
                .then((carrito) => {
                    return carrito
                })
        return carrito
    }

    borrarCarrito = (req, res) => {
        const { id_carrito } = req.params
        knexSQL.from('carritos').where('id', '=', id_carrito).del()
            .then(() => {
                console.log('carrito borrado')
            })
    }

    getProducto = async (req, res) => {
        const { id_carrito } = req.params;
        const carrito = await
            knexSQL.from('carritos').select('*').where('id', '=', id_carrito).first()
                .then((carrito) => {
                    return carrito
                })
        return carrito
    }

    nuevoProducto = async (req, res) => {
        const { id_carrito } = req.params;
        const { id_producto } = req.params;
       const producto = await knexSQL.from('productos').select('*').where('id', '=', id_producto).first()
       .then((producto) => {
           return producto
       })
   if (producto) {
       const carrito = await knexSQL.from('carritos').select('*').where('id', '=', id_carrito).first()
           .then((carrito) => {
               return carrito
           })
       if (carrito) {
           let productos = JSON.parse(carrito.productos)
           productos.push(producto)
           carrito.productos = JSON.stringify(productos)
           const updated = await knexSQL.from('carritos').where('id', '=', id_carrito).update(({
               productos: carrito.productos
           }))
               .then((updated) => {
                   return updated
               })
           if (updated) {
               return carrito
           } else {
               return null
           }
       } else {
           return null
       }
   } else {
       return null
   }
    }

    borrarProducto = async (req, res) => {
        const { id_carrito } = req.params;
        const { id_producto } = req.params;
        const producto = await knexSQL.from('productos').select('*').where('id', '=', id_producto).first()
            .then((producto) => {
                return producto
            })
        if (producto) {
            const carrito = await knexSQL.from('carritos').select('*').where('id', '=', id_carrito).first()
                .then((carrito) => {
                    return carrito
                })
            if (carrito) {
                let productos = JSON.parse(carrito.productos)
                const index = productos.findIndex((producto) => producto.id == id_producto);
                productos.splice(index, 1);
                carrito.productos = JSON.stringify(productos)
                const updated = await knexSQL.from('carritos').where('id', '=', id_carrito).update(({
                    productos: carrito.productos
                }))
                    .then((updated) => {
                        return updated
                    })
                if (updated) {
                    return carrito
                } else {
                    return null
                }
            } else {
                return null
            }
        } else {
            return null
        }

    }
}

module.exports = CarritosDaoSQLite3