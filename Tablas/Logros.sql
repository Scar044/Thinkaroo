USE Thinkaroo;
CREATE TABLE Logros(
    Id_logro INT AUTO INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    imagen_url VARCHAR(255)
);