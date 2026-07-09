USE Thinkaroo;
ALTER TABLE usuario
ADD COLUMN Estado ENUM('Activo','Suspendido') NOT NULL DEFAULT 'Activo';