USE Thinkaroo;
CREATE TABLE lecciones(
id_lecciones INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
id_niveles INT NOT NULL,
FOREIGN KEY(id_niveles) REFERENCES niveles(id_niveles),
numero_de_clase INT NOT NULL,
titulo VARCHAR(200),
estado ENUM('sin iniciar','en proceso','completado') NOT NULL
);