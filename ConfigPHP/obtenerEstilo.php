<?php

session_start();

include "conexion.php";

if(!isset($_SESSION["id_hijo"])){

    echo json_encode([
        "success" => false,
        "mensaje" => "Hijo no encontrado"
    ]);

    exit;
}

$idHijo = $_SESSION["id_hijo"];

$sql = "
SELECT estilo_aprendizaje
FROM hijos
WHERE Id_hijo = ?
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "i",
    $idHijo
);

$stmt->execute();

$resultado = $stmt->get_result();

$hijo = $resultado->fetch_assoc();

echo json_encode([
    "success" => true,
    "estilo" =>
    $hijo["estilo_aprendizaje"]
]);