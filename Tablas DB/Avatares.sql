CREATE TABLE Avatares (
    Id_avatar INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    Imagen_url VARCHAR(255) NOT NULL
);

USE thinkaroo; 
INSERT INTO avatares
(Id_avatar, Nombre, Imagen_url)
VALUES
(1, "avatar1", "IMG/avatar1cerdo.png"),
(2, "avatar2", "IMG/avatar2conejo.png"),
(3, "avatar3", "IMG/avatar3gato.png"),
(4, "avatar4", "IMG/avatar4oveja.png"),
(5, "avatar5", "IMG/avatar5pollo.png"),
(6, "avatar6", "IMG/avatar6ratón.png"),
(7, "avatar7", "IMG/avatar7tigre.png"),
(8, "avatar8", "IMG/avatar8vaca.png"),
(9, "avatar9", "IMG/avatar9erizo.png");