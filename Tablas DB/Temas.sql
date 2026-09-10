CREATE TABLE Temas (
id_tema INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
numero_de_nivel INT UNIQUE,
dificultad VARCHAR(50)
);

USE thinkaroo;
INSERT INTO temas
(id_tema, numero_de_nivel, dificultad)
VALUES
(1, 1, "BAJA"),
(2, 2, "MEDIA");