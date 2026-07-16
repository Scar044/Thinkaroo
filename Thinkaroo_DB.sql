USE Thinkaroo;
CREATE TABLE Usuario
(
id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
correo_electronico VARCHAR(150) NOT NULL,
contrasena VARCHAR(200) NOT NULL,
nivel_detectado INT, 
nombre_niño VARCHAR(50),
nombre_de_responsable VARCHAR(150),
avatar VARCHAR(255),
estilo_de_aprendizaje VARCHAR(30),
edad INT;
Estado ENUM(
    'Activo',
    'Suspendido') NOT NULL DEFAULT 'Activo'
);

CREATE TABLE Temas (
id_tema INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
numero_de_nivel INT UNIQUE,
dificultad VARCHAR(50)
);

CREATE TABLE Logros(
    Id_logro INT AUTO INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    imagen_url VARCHAR(255)
);

CREATE TABLE Avatares (
    Id_avatar INT AUTO INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Imagen_url VARCHAR(255) NOT NULL
);

CREATE TABLE Hijos(
    Id_hijo INT AUTO INCREMENT PRIMARY KEY,
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
    fecha_creacion DATETIME DEFAULT CURRENT TIMESTAMP,
    FOREIGN KEY(Id_usuario) REFERENCES(id_usuario)
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
    Id_logro_hijo INT AUTO INCREMENT PRIMARY KEY,
    Id_hijo INT NOT NULL,
    Id_logro INT NOT NULL,
    Fecha_obtenido DATETIME DEFAULT CURRENT TIMESTAMP,
    FOREIGN KEY(Id_logro) REFERENCES Logros(Id_logro),
    FOREIGN KEY(Id_hijo) REFERENCES Hijos(Id_hijo)
);

CREATE TABLE progreso(
id_progreso INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
id_usuario INT NOT NULL,
id_actividad INT NOT NULL,
id_tema INT NOT NULL,
progreso INT NOT NULL,
estado ENUM(
    'sin iniciar',
    'en proceso',
    'completado') NOT NULL,
id_usuario INT NOT NULL,
FOREIGN KEY(id_tema) REFERENCES Temas(id_tema),
FOREIGN KEY(id_usuario) REFERENCES Usuario(id_usuario),
FOREIGN KEY(id_actividad) REFERENCES Actividades(id_actividad)
);