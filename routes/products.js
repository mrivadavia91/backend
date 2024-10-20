import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';

const router = Router();
const productsFilePath = path.resolve('products.json');

// Función para obtener el próximo ID disponible
const getNextId = async () => {
  const data = await fs.readFile(productsFilePath, 'utf-8');
  const products = JSON.parse(data);
  return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
};

// POST: Crear un nuevo producto
router.post('/', async (req, res) => {
  const { title, description, code, price, status = true, stock, category, thumbnails } = req.body;
  
  if (!title || !description || !code || !price || !stock || !category) {
    return res.status(400).json({ error: 'Faltan datos obligatorios.' });
  }

  try {
    const newId = await getNextId();
    const newProduct = { id: newId, title, description, code, price, status, stock, category, thumbnails };

    const data = await fs.readFile(productsFilePath, 'utf-8');
    const products = JSON.parse(data);

    products.push(newProduct);
    await fs.writeFile(productsFilePath, JSON.stringify(products, null, 2));

    res.status(201).json({ message: 'Producto creado con éxito', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto.' });
  }
});

export default router;
