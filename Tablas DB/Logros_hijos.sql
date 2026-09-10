CREATE TABLE Logros_hijos (
    Id_logro_hijo INT AUTO_INCREMENT PRIMARY KEY,
    Id_hijo INT NOT NULL,
    Id_logro INT NOT NULL,
    Fecha_obtenido DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(Id_logro) REFERENCES Logros(Id_logro),
    FOREIGN KEY(Id_hijo) REFERENCES Hijos(Id_hijo),
    UNIQUE (Id_hijo, Id_logro)
);