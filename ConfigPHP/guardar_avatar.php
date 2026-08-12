<?php

session_start();

header("Content-Type: application/json");

include "conexion.php";

// Verificar que exista una sesión
if (!isset($_SESSION["correo"])) {
    echo json_encode([
        "success" => false,
        "mensaje" => "Sesión no encontrada"
    ]);
    exit;
}

// Recibir los datos enviados por JavaScript
$data = json_decode(file_get_contents("php://input"), true);

$avatar = $data["avatar"] ?? null;

// Verificar que se haya enviado un avatar
if ($avatar === null) {
    echo json_encode([
        "success" => false,
        "mensaje" => "No se seleccionó ningún avatar"
    ]);
    exit;
}

// Verificar que sea un avatar válido
if ($avatar < 1 || $avatar > 9) {
    echo json_encode([
        "success" => false,
        "mensaje" => "Avatar no válido"
    ]);
    exit;
}

// Obtener el correo de la sesión
$correo = $_SESSION["correo"];

// Guardar el avatar en la base de datos
$sql = "UPDATE usuario SET avatar = ? WHERE correo_electronico = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $avatar, $correo);

if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "mensaje" => "Avatar guardado correctamente"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "mensaje" => "Error al guardar el avatar"
    ]);
}

$stmt->close();
$conn->close();

?>