<?php

session_start();

include "conexion.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$nombre = $data["nombre"];

$correo = $data["correo"];

$clave = password_hash(
    $data["password"],
    PASSWORD_DEFAULT
);

$sql = "
INSERT INTO usuario
(
nombre_de_responsable,
correo_electronico,
contrasena
)
VALUES
(
?,
?,
?
)
";

$stmt = $conn->prepare($sql);

if (!$stmt) {
    die("Error al preparar la consulta: " . $conn->error);
}

$stmt->bind_param(
    "sss",
    $nombre,
    $correo,
    $clave
);

if ($stmt->execute()) {

    $_SESSION["correo"] = $correo;

    error_log("SESSION REGISTRO: ".$_SESSION["correo"]);

    echo json_encode([
        "success" => true,
        "mensaje" => "Usuario registrado correctamente"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "mensaje" => $stmt->error
    ]);

}

?>