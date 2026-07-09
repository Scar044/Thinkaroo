USE Thinkaroo;
CREATE TABLE progreso(
id_progreso INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
id_clase INT NOT NULL,
FOREIGN KEY(id_niveles) REFERENCES niveles(id_niveles),
id_usuario INT NOT NULL,
FOREIGN KEY(id_niveles) REFERENCES niveles(id_niveles),
progreso INT NOT NULL,
estado ENUM('sin iniciar','en proceso','completado') NOT NULL
);