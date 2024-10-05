const express = require('express');
const fs = require('fs');
const router = express.Router();
const path = './data/products.json';

// Obtener todos los productos (con limitación opcional)
router.get('/', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error al leer los productos');
    let products = JSON.parse(data);
    if (limit) products = products.slice(0, limit);
    res.json(products);
  });
});

// Obtener un producto por ID
router.get('/:pid', (req, res) => {
  const pid = req.params.pid;
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error al leer los productos');
    const products = JSON.parse(data);
    const product = products.find(p => p.id == pid);
    if (!product) return res.status(404).send('Producto no encontrado');
    res.json(product);
  });
});

// Actualizar un producto por ID
router.put('/:pid', (req, res) => {
  const pid = req.params.pid;
  const updatedProduct = req.body;
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error al leer los productos');
    let products = JSON.parse(data);
    const productIndex = products.findIndex(p => p.id == pid);
    if (productIndex === -1) return res.status(404).send('Producto no encontrado');
    
    // Mantener el id del producto
    updatedProduct.id = pid;
    products[productIndex] = { ...products[productIndex], ...updatedProduct };

    fs.writeFile(path, JSON.stringify(products), (err) => {
      if (err) return res.status(500).send('Error al actualizar el producto');
      res.send('Producto actualizado con éxito');
    });
  });
});

// Eliminar un producto por ID
router.delete('/:pid', (req, res) => {
  const pid = req.params.pid;
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error al leer los productos');
    let products = JSON.parse(data);
    products = products.filter(p => p.id != pid);

    fs.writeFile(path, JSON.stringify(products), (err) => {
      if (err) return res.status(500).send('Error al eliminar el producto');
      res.send('Producto eliminado con éxito');
    });
  });
});

module.exports = router;
