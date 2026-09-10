CREATE TABLE progreso(
id_progreso INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
Id_hijo INT NOT NULL,
id_actividad INT NOT NULL,
id_tema INT NOT NULL, /*borrar*/
progreso INT NOT NULL,
estado ENUM(
    'sin iniciar',
    'en proceso',
    'completado') NOT NULL,
FOREIGN KEY(id_tema) REFERENCES Temas(id_tema),
FOREIGN KEY(Id_hijo) REFERENCES Hijos(Id_hijo),
FOREIGN KEY(id_actividad) REFERENCES Actividades(id_actividad)
);