import server from './src/server.js';
import DbConnection from './src/models/persistence/FinalClass.js';
const PORT = process.env.PORT || 8080;
const db = new DbConnection(process.env.ACTIVE_PERSISTENCE);

server.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${PORT}`);
	db.instance
		.inicializateSchemas()
		.then((response) => console.log(response))
		.catch((err) => console.log(err.message));
});
server.on('error', (error) => console.log('Error en servidor', error));

export default db.instance;
