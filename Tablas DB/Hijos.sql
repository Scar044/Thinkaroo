USE Thinkaroo;
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