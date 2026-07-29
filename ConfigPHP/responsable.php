<?php

session_start();


include "conexion.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$nombreResponsable =
$data["nombreResponsable"];

$nombreNino =
$data["nombreNino"];

$correoResponsable =
$data["correoResponsable"];

$edad =
$data["edad"];

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
SET
    nombre_de_responsable = ?,
    nombre_niño = ?,
    correo_responsable = ?,
    edad = ?
WHERE correo_electronico = ?
";

$stmt = $conn->prepare(
    $sql
);

$stmt->bind_param(
    "sssis",
    $nombreResponsable,
    $nombreNino,
    $correoResponsable,
    $edad,
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
exit;