USE Thinkaroo;
CREATE TABLE Perfil
(
id_usuario INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
correo_electronico VARCHAR(150) NOT NULL,
contrasena VARCHAR(200) NOT NULL,
nivel_detectado INT, 
nombre_niño VARCHAR(50),
nombre_de_responsable VARCHAR(150),
avatar VARCHAR(255),
estilo_de_aprendizaje VARCHAR(30),
edad INT
);