import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY; 

export const generateToken = (user) => jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
export const verifyToken = (token) => jwt.verify(token, SECRET_KEY);
