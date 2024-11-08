import express from 'express';
import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

// Conexión a MongoDB 
const mongoURI = 'mongodb+srv://dbUser:dbUserPassword@cluster0.hakta.mongodb.net/Proyecto 0?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(error => console.error('Error conectando a MongoDB:', error));

// Montar las rutas para productos y carritos
app.use('/products', productsRouter);
app.use('/api/carts', cartsRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
