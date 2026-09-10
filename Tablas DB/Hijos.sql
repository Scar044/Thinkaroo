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