<?php

session_start();

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$correo = $data["correo"];
$clave = $data["password"];

include "conexion.php";

$sql = "
SELECT *
FROM usuario
WHERE correo_electronico = ?
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "s",
    $correo
);

$stmt->execute();

$resultado = $stmt->get_result();

$usuario = $resultado->fetch_assoc();

if (!$usuario) {

    echo json_encode([
        "success" => false,
        "mensaje" => "Usuario no encontrado"
    ]);

    exit;
}


if (password_verify($clave, $usuario["contrasena"])) {

    // Guardamos el correo del usuario en la sesión
    $_SESSION["correo"] = $usuario["correo_electronico"];

    echo json_encode([
        "success" => true,
        "mensaje" => "Inicio de sesión correcto"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "mensaje" => "Contraseña incorrecta"
    ]);

}

exit;