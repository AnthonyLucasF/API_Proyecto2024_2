-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-11-2024 a las 15:53:59
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `baseproyecto20242`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `corte`
--

CREATE TABLE `corte` (
  `id_corte` int(11) NOT NULL,
  `estado` enum('entero','cola') NOT NULL,
  `descripcion_corte` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `corte`
--

INSERT INTO `corte` (`id_corte`, `estado`, `descripcion_corte`) VALUES
(1, 'cola', 'Shell-On'),
(2, 'cola', 'PUD Tail-Off'),
(3, 'entero', 'No aplica'),
(4, 'cola', 'PUD Tail-On'),
(5, 'cola', 'PYD Tail-Off'),
(6, 'cola', 'PYD Tail-On'),
(7, 'cola', 'Butterfly Tail-On'),
(8, 'cola', 'Butterfly Tail-Off'),
(9, 'cola', 'Caracol'),
(10, 'cola', 'Brocheta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empaque`
--

CREATE TABLE `empaque` (
  `id_empaque` int(11) NOT NULL,
  `id_materia_prima` int(11) DEFAULT NULL,
  `id_talla` int(11) DEFAULT NULL,
  `id_peso` int(11) DEFAULT NULL,
  `cantidad_libras` float NOT NULL,
  `fecha_empaque` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empaque`
--

INSERT INTO `empaque` (`id_empaque`, `id_materia_prima`, `id_talla`, `id_peso`, `cantidad_libras`, `fecha_empaque`) VALUES
(1, 1, 1, 1, 50, '2024-11-07'),
(2, 2, 2, 2, 75.5, '2024-11-08'),
(3, 7, 1, 6, 100, '2024-11-26'),
(6, 7, 1, 1, 50.5, '2024-11-26'),
(7, 2, 1, 1, 50, '2024-11-26'),
(8, 7, 1, 2, 20, '2024-11-26'),
(9, 14, 9, 2, 3210, '2024-11-26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `maquina`
--

CREATE TABLE `maquina` (
  `id_maquina` int(11) NOT NULL,
  `nombre_maquina` varchar(50) NOT NULL,
  `descripcion` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `maquina`
--

INSERT INTO `maquina` (`id_maquina`, `nombre_maquina`, `descripcion`) VALUES
(1, 'Máquina 1', 'Clasificadora principal'),
(2, 'Máquina 2', 'Clasificadora secundaria');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materiaprima`
--

CREATE TABLE `materiaprima` (
  `id_materia_prima` int(11) NOT NULL,
  `estado` enum('entero','cola') NOT NULL,
  `lote` varchar(50) NOT NULL,
  `cantidad` float NOT NULL,
  `id_proveedor` int(11) DEFAULT NULL,
  `fecha_ingreso` date DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materiaprima`
--

INSERT INTO `materiaprima` (`id_materia_prima`, `estado`, `lote`, `cantidad`, `id_proveedor`, `fecha_ingreso`, `id_usuario`) VALUES
(1, 'entero', 'Lote001', 100.5, 1, '2024-11-01', NULL),
(2, 'cola', 'Lote002', 200, 2, '2024-11-02', NULL),
(3, 'entero', 'Lote003', 310.5, 1, NULL, NULL),
(7, 'entero', 'Lote005', 150, 2, NULL, NULL),
(14, 'entero', 'Loteedsadasda', 32131, 6, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peso`
--

CREATE TABLE `peso` (
  `id_peso` int(11) NOT NULL,
  `estado` enum('entero','cola') NOT NULL,
  `descripcion_peso` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `peso`
--

INSERT INTO `peso` (`id_peso`, `estado`, `descripcion_peso`) VALUES
(1, 'entero', 'Caja de 2kg'),
(2, 'cola', 'Caja de 2kg'),
(3, 'entero', 'Caja de 3.8kg'),
(4, 'entero', 'Funda de 5kg'),
(5, 'cola', 'Caja de 3.8lb'),
(6, 'cola', 'Caja de 5lb'),
(7, 'cola', 'Funda de 5kg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proceso`
--

CREATE TABLE `proceso` (
  `id_proceso` int(11) NOT NULL,
  `id_materia_prima` int(11) DEFAULT NULL,
  `id_corte` int(11) DEFAULT NULL,
  `id_maquina` int(11) DEFAULT NULL,
  `fecha_proceso` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proceso`
--

INSERT INTO `proceso` (`id_proceso`, `id_materia_prima`, `id_corte`, `id_maquina`, `fecha_proceso`) VALUES
(1, 1, 3, 1, '2024-11-05'),
(2, 2, 1, 2, '2024-11-06'),
(5, 2, 9, 1, '2024-11-27'),
(7, 14, 9, 2, '2024-11-26');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedor`
--

CREATE TABLE `proveedor` (
  `id_proveedor` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `direccion` varchar(150) DEFAULT NULL,
  `contacto` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedor`
--

INSERT INTO `proveedor` (`id_proveedor`, `nombre`, `direccion`, `contacto`) VALUES
(1, 'Proveedor A', 'Dirección A', '123456789'),
(2, 'Proveedor B', 'Dirección B', '987654321'),
(4, 'Proveedor Prueba', 'Santa Elena', '09151522'),
(6, 'Otro Proveedor', 'dasda', 'dasdas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `talla`
--

CREATE TABLE `talla` (
  `id_talla` int(11) NOT NULL,
  `estado` enum('entero','cola') NOT NULL,
  `descripcion_talla` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `talla`
--

INSERT INTO `talla` (`id_talla`, `estado`, `descripcion_talla`) VALUES
(1, 'entero', '20/30'),
(2, 'cola', '16/20'),
(3, 'entero', '30/40'),
(4, 'entero', '40/50'),
(5, 'entero', '50/60'),
(6, 'entero', '60/70'),
(7, 'entero', '70/80'),
(8, 'entero', '80/90'),
(9, 'entero', '90/110'),
(10, 'cola', '21/25'),
(11, 'cola', '26/30'),
(12, 'cola', '31/35'),
(13, 'cola', '36/40'),
(14, 'cola', '41/50'),
(15, 'cola', '51/60'),
(16, 'cola', '61/70'),
(17, 'cola', '71/90'),
(18, 'cola', '91/110');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `usr_activo` tinyint(1) NOT NULL DEFAULT 1,
  `usr_clave` varchar(255) NOT NULL,
  `usr_correo` varchar(100) NOT NULL,
  `usr_nombre` varchar(100) NOT NULL,
  `usr_telefono` varchar(20) DEFAULT NULL,
  `usr_usuario` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `usr_activo`, `usr_clave`, `usr_correo`, `usr_nombre`, `usr_telefono`, `usr_usuario`) VALUES
(1, 1, 'clave123', 'usuario1@correo.com', 'Juan Pérez', '0991234567', 'juanperez'),
(2, 1, 'clave456', 'usuario2@correo.com', 'Ana Gómez', '0987654321', 'anagomez'),
(3, 0, 'clave789', 'usuario3@correo.com', 'Carlos Ruiz', '0976543210', 'carlosruiz');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `corte`
--
ALTER TABLE `corte`
  ADD PRIMARY KEY (`id_corte`);

--
-- Indices de la tabla `empaque`
--
ALTER TABLE `empaque`
  ADD PRIMARY KEY (`id_empaque`),
  ADD KEY `id_materia_prima` (`id_materia_prima`),
  ADD KEY `id_talla` (`id_talla`),
  ADD KEY `id_peso` (`id_peso`);

--
-- Indices de la tabla `maquina`
--
ALTER TABLE `maquina`
  ADD PRIMARY KEY (`id_maquina`);

--
-- Indices de la tabla `materiaprima`
--
ALTER TABLE `materiaprima`
  ADD PRIMARY KEY (`id_materia_prima`),
  ADD KEY `id_proveedor` (`id_proveedor`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `peso`
--
ALTER TABLE `peso`
  ADD PRIMARY KEY (`id_peso`);

--
-- Indices de la tabla `proceso`
--
ALTER TABLE `proceso`
  ADD PRIMARY KEY (`id_proceso`),
  ADD KEY `id_materia_prima` (`id_materia_prima`),
  ADD KEY `id_corte` (`id_corte`),
  ADD KEY `id_maquina` (`id_maquina`);

--
-- Indices de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  ADD PRIMARY KEY (`id_proveedor`);

--
-- Indices de la tabla `talla`
--
ALTER TABLE `talla`
  ADD PRIMARY KEY (`id_talla`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `usr_correo` (`usr_correo`),
  ADD UNIQUE KEY `usr_usuario` (`usr_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `corte`
--
ALTER TABLE `corte`
  MODIFY `id_corte` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `empaque`
--
ALTER TABLE `empaque`
  MODIFY `id_empaque` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `maquina`
--
ALTER TABLE `maquina`
  MODIFY `id_maquina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `materiaprima`
--
ALTER TABLE `materiaprima`
  MODIFY `id_materia_prima` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `peso`
--
ALTER TABLE `peso`
  MODIFY `id_peso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `proceso`
--
ALTER TABLE `proceso`
  MODIFY `id_proceso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `proveedor`
--
ALTER TABLE `proveedor`
  MODIFY `id_proveedor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `talla`
--
ALTER TABLE `talla`
  MODIFY `id_talla` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `empaque`
--
ALTER TABLE `empaque`
  ADD CONSTRAINT `empaque_ibfk_1` FOREIGN KEY (`id_materia_prima`) REFERENCES `materiaprima` (`id_materia_prima`),
  ADD CONSTRAINT `empaque_ibfk_2` FOREIGN KEY (`id_talla`) REFERENCES `talla` (`id_talla`),
  ADD CONSTRAINT `empaque_ibfk_3` FOREIGN KEY (`id_peso`) REFERENCES `peso` (`id_peso`);

--
-- Filtros para la tabla `materiaprima`
--
ALTER TABLE `materiaprima`
  ADD CONSTRAINT `materiaprima_ibfk_1` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`),
  ADD CONSTRAINT `materiaprima_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);

--
-- Filtros para la tabla `proceso`
--
ALTER TABLE `proceso`
  ADD CONSTRAINT `proceso_ibfk_1` FOREIGN KEY (`id_materia_prima`) REFERENCES `materiaprima` (`id_materia_prima`),
  ADD CONSTRAINT `proceso_ibfk_2` FOREIGN KEY (`id_corte`) REFERENCES `corte` (`id_corte`),
  ADD CONSTRAINT `proceso_ibfk_3` FOREIGN KEY (`id_maquina`) REFERENCES `maquina` (`id_maquina`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
