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

USE thinkaroo; 
INSERT INTO avatares
(Id_avatar, Nombre, Imagen_url)
VALUES
(1, "avatar1", "IMG/avatar1cerdo.png"),
(2, "avatar2", "IMG/avatar2conejo.png"),
(3, "avatar3", "IMG/avatar3gato.png"),
(4, "avatar4", "IMG/avatar4oveja.png"),
(5, "avatar5", "IMG/avatar5pollo.png"),
(6, "avatar6", "IMG/avatar6ratón.png"),
(7, "avatar7", "IMG/avatar7tigre.png"),
(8, "avatar8", "IMG/avatar8vaca.png"),
(9, "avatar9", "IMG/avatar9erizo.png");

CREATE TABLE Hijos(
    Id_hijo INT AUTO_INCREMENT PRIMARY KEY,
    Id_usuario INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    edad INT NOT NULL,
    Id_avatar INT NULL,
    estilo_aprendizaje ENUM(
        'Visual',
        'Auditivo',
        'Kinestesico'
    ) NULL,
    Nivel_actual INT DEFAULT 1,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(Id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY(Id_avatar) REFERENCES avatares(Id_avatar)
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
Id_hijo INT NOT NULL,
id_actividad INT NOT NULL,
id_tema INT NOT NULL, /*borrar*/
progreso INT NOT NULL,
estado ENUM(
    'sin iniciar',
    'en proceso',
    'completado') NOT NULL,
FOREIGN KEY(id_tema) REFERENCES Temas(id_tema),
FOREIGN KEY(Id_hijo) REFERENCES Hijos(Id_hijo),
FOREIGN KEY(id_actividad) REFERENCES Actividades(id_actividad)
);

