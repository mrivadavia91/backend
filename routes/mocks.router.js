import { Router } from 'express';
import { generateMockUsers, generateMockPets } from '../utils/mocking.utils.js';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import Pet from '../models/pet.model.js';

const router = Router();

// Endpoint para generar 50 usuarios falsos
router.get('/mockingusers', async (req, res) => {
    try {
        const mockUsers = generateMockUsers(50);
        res.json({ status: 'success', users: mockUsers });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Endpoint para recibir parámetros y generar datos en la DB
router.post('/generateData', async (req, res) => {
    const { users, pets } = req.body;

    try {
        // Generar y guardar usuarios ficticios
        if (users) {
            const mockUsers = generateMockUsers(users).map(user => ({
                ...user,
                password: bcrypt.hashSync(user.password, 10)
            }));
            await User.insertMany(mockUsers);
        }

        // Generar y guardar mascotas ficticias
        if (pets) {
            const mockPets = generateMockPets(pets);
            await Pet.insertMany(mockPets);
        }

        res.json({ status: 'success', message: 'Datos generados correctamente' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

export default router;
