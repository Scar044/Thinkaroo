CREATE DATABASE Thinkaroo;

USE Thinkaroo;
CREATE TABLE Usuario
(
id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
correo_electronico VARCHAR(150) UNIQUE NOT NULL,
contrasena VARCHAR(200) NOT NULL, 
nombre_de_responsable VARCHAR(150),
fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Temas (
id_tema INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
numero_de_nivel INT UNIQUE,
dificultad VARCHAR(50),
nombre_de_tema VARCHAR(100) UNIQUE
);

USE thinkaroo;
INSERT INTO temas
(id_tema, numero_de_nivel, dificultad, nombre_de_tema)
VALUES
(1, 1, "BAJA", "Animales"),
(2, 2, "MEDIA", "Figuras"),
(3, 3, "BAJA", "Colores"),
(4, 4, "ALTA", "Sumas");

CREATE TABLE Logros(
    Id_logro INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    imagen_url VARCHAR(255)
);

USE Thinkaroo;
    INSERT INTO Logros
    (nombre, descripcion, imagen_url)
    VALUES
    ("Primer paso", "Complestate tu primera leccion", "IMG/logros/primer-paso.png"),
    ("Mente curiosa", "Complestate 10 lecciones", "IMG/logros/mente-curiosa.png"),
    ("Gran explorador", "Complestate 15 lecciones", "IMG/logros/gran-explorador.png"),
    ("-", "Completaste -", "IMG/logros/rayo-veloz.png"),
    ("Perfecto", "Completa una actividad sin errores", "IMG/logros/perfecto.png"),
    ("-", "Completa 20 lecciones", "IMG/logros/en-racha.png"),
    ("Aventurero", "Completa 20 lecciones", "IMG/logros/aventurero.png"),
    ("Pequeño genio", "Consigue 5 actividades perfectas", "IMG/logros/genio.png"),
    ("Coleccionista", "Consigue 10 insignias", "IMG/logros/coleccionista.png"),
    ("-", "Com", "IMG/logros/primer-reto.png"),
    ("Super aprendiz", "Completa 30 lecciones", "IMG/logros/super-aprendiz.png"),
    ("Maestro Thinkaroo", "Desbloque todos los logros", "IMG/logros/maestro.png");


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
    Id_avatar INT NULL DEFAULT 1,
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
titulo VARCHAR(200) NOT NULL,
audio_instrucciones_url VARCHAR(255) NULL,
estilo_aprendizaje ENUM(
    "Visual",
    "Auditivo", 
    "Kinestesico") NOT NULL,
FOREIGN KEY(id_tema) REFERENCES Temas(id_tema)
);

USE thinkaroo;
INSERT INTO actividades
(id_tema, numero_de_clase, descripcion, instrucciones, titulo, audio_instrucciones_url, estilo_aprendizaje)
VALUES
(1, 1, "Juego de memoria con imagenes de animales", "Encuentra las parejas de animales", "Memoria visual", "-", "Visual" ),
(1, 1, "Juego de memoria con imagenes de animales y sus sonidos", "Encuentra las parejas de animales con su sonido", "Memoria auditiva", "-", "Auditivo" ),
(1, 1, "Juego de conectar animales con su sombra", "Arrastra las figuras de animales a donde se encuentra su silueta", "Memoria kinestesica", "-", "Kinestesico" ),
(2, 2, "Juego de arrastrar las figuras a su sector correspondiente", "Arrastra las figuras a su cajita correspondiente", "Figuras visual", "-", "Visual" ),
(2, 2, "Juego de seleccionar la figura que se te indique", "Selecciona el dibujo de la figura cuyo nombre corresponda al que escuchas", "Figuras auditiva", "-", "Auditivo" ),
(2, 2, "Juego de trazar figuras", "Sigue con tu dedo la linea punteada para completar la forma de la figura correspondiente", "Figuras kinestesica", "-", "Kinestesico" ),
(3, 3, "Juego de identificar el color de casda dibujo", "Selecciona un dibujo, luego identifica su color y seleccionalo entre las opciones", "Colores visual", "-", "Visual" ),
(3, 3, "Juego de reconocer el color por su nombre", "Escucha atentamente los colores que te diga el juego, luego seleccionalo entre las opciones", "Colores auditivo", "-", "Auditivo" ),
(3, 3, "Juego de identificar los colores de los dibujos", "Arrastra cada dibujo hacia su el color que le corresponde", "Colores kinestesico", "-", "Kinestesico" ),
(4, 4, "Juego de contar los objetos y seleccionar el total", "Cuenta cada uno de los objetos y luego busca entre las opciones el numero de tu resultado", "Sumas visual", "-", "Visual" ),
(4, 4, "Juego de contar los sonidos", "Escucha atentamente y cuenta cada vez que un sonido se repita, cuando se detenga selecciona la opcion que tenga el numero de tu resultado", "Sumas auditivo", "-", "Auditivo" ),
(4, 4, "Juego de ?", "-", "Sumas kinestesico", "-", "Kinestesico" );

CREATE TABLE Logros_hijos (
    Id_logro_hijo INT AUTO_INCREMENT PRIMARY KEY,
    Id_hijo INT NOT NULL,
    Id_logro INT NOT NULL,
    Fecha_obtenido DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(Id_logro) REFERENCES Logros(Id_logro),
    FOREIGN KEY(Id_hijo) REFERENCES Hijos(Id_hijo),
    UNIQUE (Id_hijo, Id_logro)
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

