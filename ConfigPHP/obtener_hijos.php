<?php

session_start();

include "conexion.php";

header("Content-Type: application/json");


/*
    Comprobar sesión
*/
if (!isset($_SESSION["correo"])) {

    echo json_encode([
        "success" => false,
        "mensaje" => "Sesión no encontrada"
    ]);

    exit;
}


$correo = $_SESSION["correo"];


/*
    Obtener ID del usuario
*/
$sqlUsuario = "
    SELECT id_usuario
    FROM Usuario
    WHERE correo_electronico = ?
";

$stmtUsuario = $conn->prepare($sqlUsuario);

$stmtUsuario->bind_param(
    "s",
    $correo
);

$stmtUsuario->execute();

$resultadoUsuario = $stmtUsuario->get_result();


if ($resultadoUsuario->num_rows === 0) {

    echo json_encode([
        "success" => false,
        "mensaje" => "Usuario no encontrado"
    ]);

    exit;
}


$usuario = $resultadoUsuario->fetch_assoc();

$id_usuario = $usuario["id_usuario"];


/*
    Obtener hijos del usuario
*/
$sqlHijos = "
    SELECT Id_hijo, nombre
    FROM Hijos
    WHERE Id_usuario = ?
";

$stmtHijos = $conn->prepare($sqlHijos);

$stmtHijos->bind_param(
    "i",
    $id_usuario
);

$stmtHijos->execute();

$resultadoHijos = $stmtHijos->get_result();


$hijos = [];


while ($hijo = $resultadoHijos->fetch_assoc()) {

    $hijos[] = [
        "id_hijo" => $hijo["Id_hijo"],
        "nombre" => $hijo["nombre"]
    ];

}


echo json_encode([
    "success" => true,
    "hijos" => $hijos
]);


$stmtUsuario->close();
$stmtHijos->close();
$conn->close();

?>