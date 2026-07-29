<?php

session_start();

include "conexion.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$estilo =
$data["estilo"];

if(
    !isset($_SESSION["correo"])
){

    echo json_encode([
        "success" => false,
        "mensaje" =>
        "Sesión no encontrada"
    ]);

    exit;
}

$correoUsuario =
$_SESSION["correo"];

$sql = "
UPDATE usuario
SET estilo_de_aprendizaje = ?
WHERE correo_electronico = ?
";

$stmt =
$conn->prepare($sql);

$stmt->bind_param(
    "ss",
    $estilo,
    $correoUsuario
);

if($stmt->execute()){

    echo json_encode([
        "success" => true
    ]);

}else{

    echo json_encode([
        "success" => false,
        "mensaje" =>
        "Error al guardar"
    ]);

}