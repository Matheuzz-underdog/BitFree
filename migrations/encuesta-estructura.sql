CREATE DATABASE IF NOT EXISTS encuesta
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE encuesta;

CREATE TABLE IF NOT EXISTS encuesta_linux (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_completo VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    sexo ENUM('Masculino', 'Femenino', 'Otro') NOT NULL,
    correo VARCHAR(100) NOT NULL UNIQUE,
    distro VARCHAR(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
