<?php

session_start();

header("Content-Type: application/json");

include "conexion.php";

if (!isset($_SESSION["correo"])) //*if (!isset($_SESSION["id_hijo"])) */
{
    echo json_encode([
        "success" => false,
        "mensaje" => "Sesión no encontrada"
    ]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$avatar = $data["avatar"] ?? null;
//*$id_hijo = $_SESSION["id_hijo"]; */
if ($avatar === null) {
    echo json_encode([
        "success" => false,
        "mensaje" => "No se seleccionó ningún avatar"
    ]);
    exit;
}

if (!is_numeric($avatar) || $avatar < 1 || $avatar > 9) {
    echo json_encode([
        "success" => false,
        "mensaje" => "Avatar no válido"
    ]);
    exit;
}

$correo = $_SESSION["correo"];

$sql = "UPDATE hijos SET Id_avatar = ? 
        WHERE Id_hijo = ?";

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