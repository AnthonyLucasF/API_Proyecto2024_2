import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import clientesRoutes from './routes/clientes.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import productosRoutes from './routes/productos.router.js';
import pedidosRoutes from './routes/pedidos.route.js';
import pedidosDetalleRoutes from './routes/pedidos_detalle.route.js';

// Definir módulo de ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuración de CORS
const corsOptions = {
    origin: '*', // Dirección del dominio del servidor
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
};
app.use(cors(corsOptions));

// Middleware para interpretar objetos JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas
app.use('/api', clientesRoutes);
app.use('/api', usuariosRoutes);
app.use('/api', productosRoutes);
app.use('/api', pedidosRoutes);
app.use('/api', pedidosDetalleRoutes);

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

// Ruta protegida para crear posts, requiere token JWT
app.post("/api/posts", verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if (error) {
            res.sendStatus(403);
        } else {
            res.json({
                mensaje: "Post fue creado",
                authData: authData
            });
        }
    });
});

// Middleware para verificar el token JWT
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

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
