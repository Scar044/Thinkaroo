USE Thinkaroo;
CREATE TABLE Usuario
(
id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
correo_electronico VARCHAR(150) NOT NULL,
contrasena VARCHAR(200) NOT NULL, 
nombre_de_responsable VARCHAR(150),
fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Temas (
id_tema INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
numero_de_nivel INT UNIQUE,
dificultad VARCHAR(50)
);

CREATE TABLE Logros(
    Id_logro INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    imagen_url VARCHAR(255)
);

CREATE TABLE Avatares (
    Id_avatar INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Imagen_url VARCHAR(255) NOT NULL
);

CREATE TABLE Hijos(
    Id_hijo INT AUTO_INCREMENT PRIMARY KEY,
    Id_usuario INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    Id_avatar INT NOT NULL,
    estilo_aprendizaje ENUM(
        'Visual',
        'Auditivo',
        'Kinestesico'
    ) NOT NULL,
    Nivel_actual INT DEFAULT 1,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(Id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Actividades(
id_actividad INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
id_tema INT NOT NULL,
numero_de_clase INT NOT NULL,
descripcion TEXT,
instrucciones TEXT NOT NULL,
titulo VARCHAR(200),
estado ENUM('sin iniciar','en proceso','completado') NOT NULL,
audio_instrucciones_url VARCHAR(255) NOT NULL,
FOREIGN KEY(id_tema) REFERENCES Temas(id_tema)
);

CREATE TABLE Logros_hijos (
    Id_logro_hijo INT AUTO_INCREMENT PRIMARY KEY,
    Id_hijo INT NOT NULL,
    Id_logro INT NOT NULL,
    Fecha_obtenido DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(Id_logro) REFERENCES Logros(Id_logro),
    FOREIGN KEY(Id_hijo) REFERENCES Hijos(Id_hijo)
);

CREATE TABLE progreso(
id_progreso INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
id_usuario INT NOT NULL,
id_actividad INT NOT NULL,
id_tema INT NOT NULL, /*borrar*/
progreso INT NOT NULL,
estado ENUM(
    'sin iniciar',
    'en proceso',
    'completado') NOT NULL,
FOREIGN KEY(id_tema) REFERENCES Temas(id_tema),
FOREIGN KEY(id_usuario) REFERENCES Usuario(id_usuario),
FOREIGN KEY(id_actividad) REFERENCES Actividades(id_actividad)
);

INSERT INTO `usuario` (`id_usuario`, `correo_electronico`, `contrasena`, `nivel_detectado`, `nombre_niño`, `nombre_de_responsable`, `avatar`, `estilo_de_aprendizaje`, `edad`, `Fecha_de_registro`, `Estado`, `correo_responsable`) VALUES (1, 'alli@gmail.com', '$2y$10$zzZfaLi4amiSAQ4M4GYgK.uDYi2.1tCteVEVkMegSgP3T00qDW/OK', NULL, NULL, NULL, NULL, NULL, NULL, '2026-07-28 23:51:25', 'Activo', NULL);
INSERT INTO `usuario` (`id_usuario`, `correo_electronico`, `contrasena`, `nivel_detectado`, `nombre_niño`, `nombre_de_responsable`, `avatar`, `estilo_de_aprendizaje`, `edad`, `Fecha_de_registro`, `Estado`, `correo_responsable`) VALUES (3, 'scar@gmail.com', '$2y$10$VgfV1X.Ml/abB3Li8zT4MuKe34.EfCDziwDhIk2ILQ453Y4Dg3p0e', NULL, 'Xime', 'Scarleth', NULL, NULL, 5, '2026-07-29 14:08:48', 'Activo', 'alvaradoscarlett08@gmail.com');
INSERT INTO `usuario` (`id_usuario`, `correo_electronico`, `contrasena`, `nivel_detectado`, `nombre_niño`, `nombre_de_responsable`, `avatar`, `estilo_de_aprendizaje`, `edad`, `Fecha_de_registro`, `Estado`, `correo_responsable`) VALUES (2, 'alvaradoscarlett08@gmail.com', '$2y$10$gz0ZI4nX6gU3rn9wxpHwWueWzDPYAci2/89WF5VoXatnQKOk4JhSq', NULL, 'Xime', 'Scarleth', NULL, NULL, 5, '2026-07-29 00:16:01', 'Activo', 'alvaradoscarlett08@gmail.com');
