import express from 'express';
import { createServer } from 'http';  
import { Server as SocketIO } from 'socket.io';  
import { engine } from 'express-handlebars';
import productsRouter from './routes/products.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';  // Importar fs/promises

// Configurar __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);  
const io = new SocketIO(httpServer);

// Configurar Handlebars como motor de plantillas
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
// app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/api/products', productsRouter);

// Vista home
app.get('/', async (req, res) => {
  const products = JSON.parse(await fs.readFile(path.join(__dirname,'data', 'products.json'), 'utf-8'));
  res.render('home', { products });
});

// Vista realtime
app.get('/realtimeproducts', async (req, res) => {
  const products = JSON.parse(await fs.readFile(path.join(__dirname,'data', 'products.json'), 'utf-8'));
  res.render('realTimeProducts', { products });
});

// Socket.io
io.on('connection', (socket) => {
  console.log('Usuario conectado via WebSocket');
  socket.on('newProduct', async (product) => {
    const products = JSON.parse(await fs.readFile(path.join(__dirname, 'products.json'), 'utf-8'));
    products.push(product);
    await fs.writeFile(path.join(__dirname,'data', 'products.json'), JSON.stringify(products, null, 2));
    io.emit('updateProducts', products);
  });

  socket.on('deleteProduct', async (id) => {
    let products = JSON.parse(await fs.readFile(path.join(__dirname,'data', 'products.json'), 'utf-8'));
    products = products.filter(p => p.id !== id);
    await fs.writeFile(path.join(__dirname,'data', 'products.json'), JSON.stringify(products, null, 2));
    io.emit('updateProducts', products);
  });
});

const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
