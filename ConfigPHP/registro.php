<?php

include "conexion.php";
/*$contenido = file_get_contents("php://input");
var_dump($contenido);
exit;*/

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$correo = $data["correo"];

$clave = password_hash(
    $data["password"],
    PASSWORD_DEFAULT
);

$sql = "
INSERT INTO usuario
(
correo_electronico,
contrasena
)
VALUES
(
?,
?
)
";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    die("Error al preparar la consulta: " . $conn->error);
}

$stmt->bind_param(
    "ss",
    $correo,
    $clave
);

if ($stmt->execute()) {
    echo "Usuario registrado correctamente";
} else {
    echo "Error: " . $stmt->error;
}

?>