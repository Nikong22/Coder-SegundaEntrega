const { optionfirebase } = require('../../../options/firebase');
var admin = require("firebase-admin");

const db = admin.firestore();

let CarritosDaoFirebase = class CarritosDaoFirebase {

    crearCarrito = async (req, res) => {
        try {
            await db
                .collection("carritos")
                .doc("/" + req.body.id + "/")
                .create({
                    fecha: new Date(),
                    productos: JSON.stringify([])
                });
            return res.json();
        } catch (error) {
            // return res.status(500).send(error);
        }
    }

    borrarCarrito = async (req, res) => {
        try {
            const doc = db.collection("carritos").doc(req.params.id);
            await doc.delete();
            return res.json();
          } catch (error) {
            // return res.send(error);
          }
    }

    getProducto = async (req, res) => {
        try {
            const doc = db.collection("carritos").doc(req.params.id);
            const item = await doc.get()
            const response = item.data();
            console.log(response)
            // return response;

        } catch (error) {
            // return res.send(error);
        }
        // return response
    }

    nuevoProducto = async (req, res) => {

    }

    borrarProducto = async (req, res) => {

    }
}

module.exports = CarritosDaoFirebase