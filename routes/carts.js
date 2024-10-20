import express from 'express';
const fs = require('fs');
const router = express.Router();
const path = './data/carts.json';

// Crear un nuevo carrito
router.post('/', (req, res) => {
  const newCart = { id: Date.now().toString(), products: [] };
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error al leer los carritos');
    const carts = JSON.parse(data);
    carts.push(newCart);
    fs.writeFile(path, JSON.stringify(carts), (err) => {
      if (err) return res.status(500).send('Error al crear el carrito');
      res.send('Carrito creado con éxito');
    });
  });
});

// Obtener productos de un carrito por ID
router.get('/:cid', (req, res) => {
  const cid = req.params.cid;
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error al leer los carritos');
    const carts = JSON.parse(data);
    const cart = carts.find(c => c.id == cid);
    if (!cart) return res.status(404).send('Carrito no encontrado');
    res.json(cart.products);
  });
});

// Agregar un producto al carrito
router.post('/:cid/product/:pid', (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error al leer los carritos');
    let carts = JSON.parse(data);
    const cart = carts.find(c => c.id == cid);
    if (!cart) return res.status(404).send('Carrito no encontrado');

    const productIndex = cart.products.findIndex(p => p.product === pid);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    fs.writeFile(path, JSON.stringify(carts), (err) => {
      if (err) return res.status(500).send('Error al agregar el producto al carrito');
      res.send('Producto agregado con éxito');
    });
  });
});

module.exports = router;
