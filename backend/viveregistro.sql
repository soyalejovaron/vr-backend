-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-04-2021 a las 07:38:09
-- Versión del servidor: 10.4.14-MariaDB

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `viveregistro`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estados`
--

CREATE TABLE `estados` (
  `id_estado` int(12) NOT NULL,
  `nombre_estado` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `estados`
--

INSERT INTO `estados` (`id_estado`, `nombre_estado`) VALUES
(1, 'Activo'),
(2, 'Inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `plantas`
--

CREATE TABLE `plantas` (
  `id_planta` int(12) NOT NULL,
  `nombre_planta` varchar(200) NOT NULL,
  `descripcion_planta` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `plantas`
--

INSERT INTO `plantas` (`id_planta`, `nombre_planta`, `descripcion_planta`) VALUES
(2, 'Millonaria', 'Es una planta con grandes caracteristicas'),
(3, 'Suculenta 2', 'Es una pequeña planta y bonita'),
(4, 'Menta', 'Es una planta suave, que sirve para hacer chicles');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sensorh`
--

CREATE TABLE `sensorh` (
  `idSensorH` int(12) NOT NULL,
  `id_planta` int(12) NOT NULL,
  `nombreSensorH` varchar(255) NOT NULL,
  `tipoSensorH` varchar(200) NOT NULL,
  `datosSensorH` varchar(255) NOT NULL,
  `colorSensorH` varchar(255) NOT NULL,
  `estadoSensorH` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sensorh`
--

INSERT INTO `sensorh` (`idSensorH`, `id_planta`, `nombreSensorH`, `tipoSensorH`, `datosSensorH`, `colorSensorH`, `estadoSensorH`) VALUES
(2, 2, 'sensor 2', 'Humedad', '12,32,12,43', '#000000', 'activo'),
(5, 3, 'sensor 4', 'Humedad', '23,4,12,12', '#ff0000', 'inactivo'),
(7, 3, 'sensor 1', 'Humedad', '12,32,12,32,12,42', '#000bff', 'Activo'),
(8, 2, 'sensor 3', 'Humedad', '12,32,12,32,12,42', '#5bff00', 'Activo'),
(11, 2, 'sensor 5', 'Humedad', '21,13,43,2', '#ffbd00', 'Activo'),
(16, 2, 'sensor 10', 'Humedad', '12,43,23,54', '#7220df', 'Inactivo'),
(18, 2, 'sensor 11', 'Humedad', '12,32,12,32,12,42', '#efb819', 'activo'),
(19, 2, 'sensor 12', 'Humedad', '12,32,12,43,12', '#177901', 'activo'),
(22, 4, 'sensor 20', 'Humedad', '12,43,12,43,12', '#9900ff', 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sensort`
--

CREATE TABLE `sensort` (
  `idSensorT` int(11) NOT NULL,
  `id_estado` int(12) NOT NULL,
  `id_planta` int(12) NOT NULL,
  `nombreSensorT` varchar(255) NOT NULL,
  `tipoSensorT` varchar(255) NOT NULL,
  `datosSensorT` varchar(255) NOT NULL,
  `colorSensorT` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sensort`
--

INSERT INTO `sensort` (`idSensorT`, `id_estado`, `id_planta`, `nombreSensorT`, `tipoSensorT`, `datosSensorT`, `colorSensorT`) VALUES
(2, 1, 2, 'sensor 1', 'Temperatura', '12,32,12,43,12', '#f11010'),
(3, 1, 2, 'sensor 2', 'Temperatura', '12,43,23,54', '#9c4206');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `estados`
--
ALTER TABLE `estados`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `plantas`
--
ALTER TABLE `plantas`
  ADD PRIMARY KEY (`id_planta`);

--
-- Indices de la tabla `sensorh`
--
ALTER TABLE `sensorh`
  ADD PRIMARY KEY (`idSensorH`),
  ADD KEY `id_planta` (`id_planta`);

--
-- Indices de la tabla `sensort`
--
ALTER TABLE `sensort`
  ADD PRIMARY KEY (`idSensorT`),
  ADD KEY `id_estado` (`id_estado`),
  ADD KEY `id_planta` (`id_planta`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `estados`
--
ALTER TABLE `estados`
  MODIFY `id_estado` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `plantas`
--
ALTER TABLE `plantas`
  MODIFY `id_planta` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `sensorh`
--
ALTER TABLE `sensorh`
  MODIFY `idSensorH` int(12) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `sensort`
--
ALTER TABLE `sensort`
  MODIFY `idSensorT` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `sensorh`
--
ALTER TABLE `sensorh`
  ADD CONSTRAINT `sensorh_ibfk_1` FOREIGN KEY (`id_planta`) REFERENCES `plantas` (`id_planta`);

--
-- Filtros para la tabla `sensort`
--
ALTER TABLE `sensort`
  ADD CONSTRAINT `sensort_ibfk_1` FOREIGN KEY (`id_estado`) REFERENCES `estados` (`id_estado`),
  ADD CONSTRAINT `sensort_ibfk_2` FOREIGN KEY (`id_planta`) REFERENCES `plantas` (`id_planta`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
