<?php

session_start();

header("Content-Type: application/json");

include "conexion.php";


// ==========================================
// COMPROBAR SESIÓN DEL HIJO
// ==========================================

if (!isset($_SESSION["id_hijo"])) {

    echo json_encode([
        "success" => false,
        "mensaje" => "No hay ningún hijo seleccionado"
    ]);

    exit;
}


$idHijo = intval($_SESSION["id_hijo"]);


// ==========================================
// RECIBIR AVATAR
// ==========================================

$data = json_decode(
    file_get_contents("php://input"),
    true
);


$avatar = $data["avatar"] ?? null;


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


$avatar = intval($avatar);


// ==========================================
// GUARDAR AVATAR DEL HIJO ACTUAL
// ==========================================

$sql = "
    UPDATE Hijos
    SET Id_avatar = ?
    WHERE Id_hijo = ?
";


$stmt = $conn->prepare($sql);


$stmt->bind_param(
    "ii",
    $avatar,
    $idHijo
);


if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "mensaje" => "Avatar guardado correctamente"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "mensaje" => "Error al guardar el avatar: " . $stmt->error
    ]);

}


$stmt->close();
$conn->close();

?>