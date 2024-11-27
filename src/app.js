import express from 'express';
import jwt from 'jsonwebtoken';
import materiaprimaRoutes from './routes/materiaprima.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import corteRoutes from './routes/corte.routes.js';
import pesoRoutes from './routes/peso.routes.js';
import tallaRoutes from './routes/talla.routes.js';
import proveedorRoutes from './routes/proveedor.routes.js';
import maquinaRoutes from './routes/maquina.routes.js';
import procesoRoutes from './routes/proceso.routes.js';
import empaqueRoutes from './routes/empaque.routes.js';
import { fileURLToPath } from 'url'; // Importar fileURLToPath
import path from 'path'; // Importar path
import cors from 'cors'; // Importar cors

const app = express();
app.use(express.json()); // Para que interprete los objetos json

// Definir módulo de ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de CORS
const corsOptions = {
    origin: '*', // Dirección del dominio del servidor
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
};
app.use(cors(corsOptions)); // Aquí ahora funciona correctamente

// Rutas
app.use('/api', materiaprimaRoutes);
app.use('/api', usuariosRoutes);
app.use('/api', corteRoutes);
app.use('/api', pesoRoutes);
app.use('/api', tallaRoutes);
app.use('/api', proveedorRoutes);
app.use('/api', maquinaRoutes);
app.use('/api', procesoRoutes);
app.use('/api', empaqueRoutes);

// Ruta de prueba para API
app.get("/api", (req, res) => {
    res.json({
        mensaje: "Nodejs and JWT"
    });
});

// Ruta de login para generar un token JWT
app.get("/api/login", (req, res) => {
    const user = {
        id: 1,
        nombre: "Maritza",
        email: "kchalen14@gmail.com"
    };

    jwt.sign({ user }, 'secretkey', (err, token) => {
        res.json({
            token
        });
    });
});

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(400).json({
        message: 'Endpoint not found'
    });
});

// Iniciar servidor
app.listen(3001, function() {
    console.log("Node.js app running on port 3001...");
});

export default app;
