import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import './config/passportStrategies.js';
import sessionsRouter from './routes/sessionsRouter.js';
import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Rutas
app.use('/api/sessions', sessionsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(8080, () => console.log('Servidor corriendo en el puerto 8080'));
