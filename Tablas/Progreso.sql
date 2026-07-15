USE Thinkaroo;
CREATE TABLE progreso(
id_progreso INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
id_usuario INT NOT NULL,
id_actividad INT NOT NULL,
id_tema INT NOT NULL,
progreso INT NOT NULL,
estado ENUM(
    'sin iniciar',
    'en proceso',
    'completado') NOT NULL,
FOREIGN KEY(id_tema) REFERENCES Temas(id_tema),
id_usuario INT NOT NULL,
FOREIGN KEY(id_usuario) REFERENCES Usuario(id_usuario),
FOREIGN KEY(id_actividad) REFERENCES Actividades(id_actividad)
);