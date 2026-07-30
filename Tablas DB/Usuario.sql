USE Thinkaroo;
CREATE TABLE Usuario
(
id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
correo_electronico VARCHAR(150) NOT NULL,
contrasena VARCHAR(200) NOT NULL,
nombre_de_responsable VARCHAR(150),
);