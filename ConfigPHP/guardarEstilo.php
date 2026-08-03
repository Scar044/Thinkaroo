<?php

session_start();

include "conexion.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$estilo = $data["estilo"];

if(!isset($_SESSION["id_hijo"])){

    echo json_encode([
        "success" => false,
        "mensaje" => "Hijo no encontrado"
    ]);

    exit;
}

$idHijo = $_SESSION["id_hijo"];

$sql = "
UPDATE hijos
SET estilo_aprendizaje = ?
WHERE Id_hijo = ?
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "si",
    $estilo,
    $idHijo
);

if($stmt->execute()){

    echo json_encode([
        "success" => true
    ]);

}else{

    echo json_encode([
        "success" => false,
        "mensaje" => $stmt->error
    ]);

}