USE Thinkaroo;
CREATE TABLE Niveles (
id_niveles INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
numero_de_nivel INT UNIQUE,
dificultad VARCHAR(50)
);
