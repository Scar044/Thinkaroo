<?php

session_start();

include "conexion.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$nombreNino = $data["nombreNino"];
$edad = $data["edad"];

if (!isset($_SESSION["correo"])) {

    echo json_encode([
        "success" => false,
        "mensaje" => "Sesión no encontrada"
    ]);

    exit;
}

$correoUsuario = $_SESSION["correo"];

$sql = "
    SELECT id_usuario
    FROM usuario
    WHERE correo_electronico = ?
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "s",
    $correoUsuario
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

$idUsuario = $usuario["id_usuario"];


$sql = "
    INSERT INTO hijos
    (
        Id_usuario,
        nombre,
        edad
    )
    VALUES
    (
        ?,
        ?,
        ?
    )
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "isi",
    $idUsuario,
    $nombreNino,
    $edad
);

if ($stmt->execute()) {

    $idHijo = $conn->insert_id;

    $_SESSION["id_hijo"] = $idHijo;

    echo json_encode([
        "success" => true,
        "id_hijo" => $idHijo
    ]);

} else {

    echo json_encode([
        "success" => false,
        "mensaje" => $stmt->error
    ]);

}

?>