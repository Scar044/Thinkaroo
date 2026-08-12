<?php

session_start();

header("Content-Type: application/json");

include "conexion.php";

if (!isset($_SESSION["correo"])) {
    echo json_encode([
        "success" => false,
        "mensaje" => "Sesión no encontrada"
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$avatar = $data["avatar"] ?? null;

if ($avatar === null) {
    echo json_encode([
        "success" => false,
        "mensaje" => "No se seleccionó ningún avatar"
    ]);
    exit;
}

if ($avatar < 1 || $avatar > 9) {
    echo json_encode([
        "success" => false,
        "mensaje" => "Avatar no válido"
    ]);
    exit;
}

$correo = $_SESSION["correo"];

$sql = "UPDATE usuario SET avatar = ? WHERE correo_electronico = ?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("is", $avatar, $correo);

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