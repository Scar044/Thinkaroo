USE Thinkaroo;
CREATE TABLE Actividades(
id_actividad INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
id_tema INT NOT NULL,
FOREIGN KEY(id_tema) REFERENCES Temas(id_tema),
numero_de_clase INT NOT NULL,
descripcion TEXT,
instrucciones TEXT NOT NULL,
titulo VARCHAR(200),
estado ENUM('sin iniciar','en proceso','completado') NOT NULL,
audio_instrucciones_url VARCHAR(255) NOT NULL
);