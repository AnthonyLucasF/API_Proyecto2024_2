import jwt from 'jsonwebtoken';

// Importa la clave secreta desde el archivo .env
const secretKey = process.env.SECRET_KEY;

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Obtén el token del header

    if (!token) {
        return res.status(403).json({ message: "Se requiere un token de autenticación" });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token no válido" });
        }
        req.userId = decoded.id; // Almacena el id del usuario decodificado
        next();
    });
};
