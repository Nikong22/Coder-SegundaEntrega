import dotenv from 'dotenv';
dotenv.config();
import Express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import {errorHandlerMiddleware} from './middlewares/errorHandler.js';
import carritoRouter from './routes/carrito.routes.js';
import productosRouter from './routes/productos.routes.js';

const server = Express();

server.use(Express.json());
server.use(Express.urlencoded({extended: false}));
server.use(morgan('dev'));
server.use(
	cors({
		origin: '*', // sólo en amb desarrollo
		credentials: true,
		methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
		allowedHeaders: [
			'Origin',
			'X-Requested-With',
			'Content-Type',
			'Accept',
			'Authorization',
		],
	})
);
server.get('/', (_, res) => {
	return res.json({message: 'Bienvenido al root'});
});

server.use('/productos', productosRouter);
server.use('/carrito', carritoRouter);
server.use(errorHandlerMiddleware);

export default server;
