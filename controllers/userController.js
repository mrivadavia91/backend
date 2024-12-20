import User from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/bcryptUtils.js';
import { generateToken } from '../utils/jwtUtils.js';

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

        const isValid = comparePassword(password, user.password);
        if (!isValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

        const token = generateToken({ id: user._id, role: user.role });
        res.cookie('token', token, { httpOnly: true }).json({ message: 'Inicio de sesión exitoso' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getCurrentUser = (req, res) => {
    res.json(req.user);
};
