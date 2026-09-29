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


$data = json_decode(
    file_get_contents("php://input"),
    true
);


$idHijo = $data["id_hijo"] ?? null;


if ($idHijo === null) {

    echo json_encode([
        "success" => false,
        "mensaje" => "No se recibió el ID del hijo"
    ]);

    exit;
}


$idHijo = intval($idHijo);

$correo = $_SESSION["correo"];


$sql = "
    SELECT id_usuario
    FROM Usuario
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


$idUsuario = $usuario["id_usuario"];


$sql = "
    SELECT Id_hijo, nombre
    FROM Hijos
    WHERE Id_hijo = ?
    AND Id_usuario = ?
";


$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "ii",
    $idHijo,
    $idUsuario
);

$stmt->execute();

$resultado = $stmt->get_result();

$hijo = $resultado->fetch_assoc();


if (!$hijo) {

    echo json_encode([
        "success" => false,
        "mensaje" => "El hijo seleccionado no pertenece a este usuario"
    ]);

    exit;
}


$_SESSION["id_hijo"] = $hijo["Id_hijo"];


echo json_encode([
    "success" => true,
    "id_hijo" => $hijo["Id_hijo"],
    "nombre" => $hijo["nombre"]
]);


$stmt->close();
$conn->close();

?>