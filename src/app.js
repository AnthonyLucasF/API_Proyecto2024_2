/* import express from 'express';
import jwt from 'jsonwebtoken';

import loginRoutes from './routes/login.routes.js';

import choferRoutes from './routes/chofer.routes.js';
import claseRoutes from './routes/clase.routes.js';
//import clasificacionRoutes from './routes/clasificacion.routes.js';
import cocheRoutes from './routes/coche.routes.js';
import colorRoutes from './routes/color.routes.js';
import control_calidadRoutes from './routes/control_calidad.routes.js';
import corteRoutes from './routes/corte.routes.js';
import defectosRoutes from './routes/defectos.routes.js';
import glaseoRoutes from './routes/glaseo.routes.js';
import grupoRoutes from './routes/grupo.routes.js';
import ingresotunelRoutes from './routes/ingresotunel.routes.js';
import loteRoutes from './routes/lote.routes.js';
import liquidacionRoutes from './routes/liquidacion.routes.js';
import maquinaRoutes from './routes/maquina.routes.js';
import masterizadoRoutes from './routes/masterizado.routes.js';
import ordenRoutes from './routes/orden.routes.js';
import pesoRoutes from './routes/peso.routes.js';
import presentacionRoutes from './routes/presentacion.routes.js';
import proveedorRoutes from './routes/proveedor.routes.js';
import tallaRoutes from './routes/talla.routes.js';
import tipoRoutes from './routes/tipo.routes.js';
import usuarioRoutes from './routes/usuarios.routes.js';
import vehiculoRoutes from './routes/vehiculo.routes.js';

import { fileURLToPath } from 'url'; // Importar fileURLToPath
import path from 'path'; // Importar path
import cors from 'cors'; // Importar cors

import pg from 'pg';
import { config } from 'dotenv';

config()

const app = express();
app.use(express.json()); // Para que interprete los objetos json

const pool = new pg.Pool({
    connectionString: process.env.BD_DATABASE_URL
})

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
app.use(express.json()); // Para interpretar los objetos JSON
app.use(express.urlencoded({ extended: true }));//se añade para receptar el formulario 

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas
app.use('/api', loginRoutes);

app.use('/api', choferRoutes);
app.use('/api', claseRoutes);
//app.use('/api', clasificacionRoutes);
app.use('/api', cocheRoutes);
app.use('/api', colorRoutes);
app.use('/api', control_calidadRoutes);
app.use('/api', corteRoutes);
app.use('/api', defectosRoutes);
app.use('/api', glaseoRoutes);
app.use('/api', grupoRoutes);
app.use('/api', ingresotunelRoutes)
app.use('/api', loteRoutes);
app.use('/api', liquidacionRoutes);
app.use('/api', maquinaRoutes);
app.use('/api', masterizadoRoutes);
app.use('/api', ordenRoutes);
app.use('/api', pesoRoutes);
app.use('/api', presentacionRoutes);
app.use('/api', proveedorRoutes);
app.use('/api', tallaRoutes);
app.use('/api', tipoRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', vehiculoRoutes);

// Ruta de prueba para API
app.get("/api", (req, res) => {
    res.json({
        mensaje: "API RESTful de mi Tesis :D"
    });
});

app.get("/api/login", (req, res) => {
    const user = {
        id: 1,
        nombre: "Anthony",
        email: "anthony.lucasfloreano@gmail.com"
    };

    jwt.sign({ user }, 'secretkey', (err, token) => {
        res.json({
            token
        });
    });
});

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

// Autenticación: Bearer <token>
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken; // Agregamos el token al request
        next(); // Continuar con el middleware
    } else {
        res.sendStatus(403);
    }
}

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(400).json({
        message: 'Ruta no encontrada :('
    });
});

// Iniciar servidor
app.listen(3001, function () {
    console.log("Mi API de Node.js app running on port 3001 :D...");
});

export default app;


 */



import express from 'express';
import jwt from 'jsonwebtoken';

import loginRoutes from './routes/login.routes.js';

import choferRoutes from './routes/chofer.routes.js';
import claseRoutes from './routes/clase.routes.js';
import cocheRoutes from './routes/coche.routes.js';
import colorRoutes from './routes/color.routes.js';
import control_calidadRoutes from './routes/control_calidad.routes.js';
import corteRoutes from './routes/corte.routes.js';
import defectosRoutes from './routes/defectos.routes.js';
import glaseoRoutes from './routes/glaseo.routes.js';
import grupoRoutes from './routes/grupo.routes.js';
import ingresotunelRoutes from './routes/ingresotunel.routes.js';
import loteRoutes from './routes/lote.routes.js';
import liquidacionRoutes from './routes/liquidacion.routes.js';
import maquinaRoutes from './routes/maquina.routes.js';
import masterizadoRoutes from './routes/masterizado.routes.js';
import ordenRoutes from './routes/orden.routes.js';
import pesoRoutes from './routes/peso.routes.js';
import presentacionRoutes from './routes/presentacion.routes.js';
import proveedorRoutes from './routes/proveedor.routes.js';
import tallaRoutes from './routes/talla.routes.js';
import tipoRoutes from './routes/tipo.routes.js';
import usuarioRoutes from './routes/usuarios.routes.js';
import vehiculoRoutes from './routes/vehiculo.routes.js';

import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';

import pg from 'pg';
import { config } from 'dotenv';

config()

const app = express();
app.use(express.json());

const pool = new pg.Pool({
    connectionString: process.env.BD_DATABASE_URL
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use('/api', loginRoutes);
app.use('/api', choferRoutes);
app.use('/api', claseRoutes);
app.use('/api', cocheRoutes);
app.use('/api', colorRoutes);
app.use('/api', control_calidadRoutes);
app.use('/api', corteRoutes);
app.use('/api', defectosRoutes);
app.use('/api', glaseoRoutes);
app.use('/api', grupoRoutes);
app.use('/api', ingresotunelRoutes);
app.use('/api', loteRoutes);
app.use('/api', liquidacionRoutes);
app.use('/api', maquinaRoutes);
app.use('/api', masterizadoRoutes);
app.use('/api', ordenRoutes);
app.use('/api', pesoRoutes);
app.use('/api', presentacionRoutes);
app.use('/api', proveedorRoutes);
app.use('/api', tallaRoutes);
app.use('/api', tipoRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', vehiculoRoutes);

app.get("/api", (req, res) => {
    res.json({
        mensaje: "API RESTful de mi Tesis :D"
    });
});

app.get("/api/login", (req, res) => {
    const user = {
        id: 1,
        nombre: "Anthony",
        email: "anthony.lucasfloreano@gmail.com"
    };

    jwt.sign({ user }, 'secretkey', (err, token) => {
        res.json({
            token
        });
    });
});

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

// Autenticación: Bearer <token>
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
        message: 'Ruta no encontrada :('
    });
});

// Iniciar servidor //OJO: Antes 3001
app.listen(3001, function () {
    console.log("Mi API de Node.js app running on port 3001 :D...");
});

export default app;
