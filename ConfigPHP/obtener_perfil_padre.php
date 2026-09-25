<?php

session_start();

header("Content-Type: application/json");

include "conexion.php";


// ==========================================
// COMPROBAR SESIÓN
// ==========================================

if (!isset($_SESSION["correo"])) {

    echo json_encode([
        "success" => false,
        "mensaje" => "Sesión de usuario no encontrada"
    ]);

    exit;
}


$correo = $_SESSION["correo"];


// ==========================================
// BUSCAR USUARIO POR CORREO
// ==========================================

$sql = "
    SELECT
        id_usuario,
        correo_electronico,
        nombre_de_responsable,
        fecha_creacion
    FROM Usuario
    WHERE correo_electronico = ?
";


$stmt = $conn->prepare($sql);


if (!$stmt) {

    echo json_encode([
        "success" => false,
        "mensaje" => "Error al preparar la consulta: " . $conn->error
    ]);

    exit;
}


$stmt->bind_param("s", $correo);

$stmt->execute();

$resultado = $stmt->get_result();

$usuario = $resultado->fetch_assoc();


if (!$usuario) {

    echo json_encode([
        "success" => false,
        "mensaje" => "No se encontró el usuario"
    ]);

    exit;
}


// ==========================================
// OBTENER ID DEL USUARIO
// ==========================================

$idUsuario = $usuario["id_usuario"];


// ==========================================
// CONTAR HIJOS DEL USUARIO
// ==========================================

$sqlHijos = "
    SELECT COUNT(*) AS total_hijos
    FROM Hijos
    WHERE Id_usuario = ?
";


$stmtHijos = $conn->prepare($sqlHijos);


if (!$stmtHijos) {

    echo json_encode([
        "success" => false,
        "mensaje" => "Error al contar los hijos: " . $conn->error
    ]);

    exit;
}


$stmtHijos->bind_param("i", $idUsuario);

$stmtHijos->execute();

$resultadoHijos = $stmtHijos->get_result();

$datosHijos = $resultadoHijos->fetch_assoc();


// ==========================================
// RESPUESTA
// ==========================================

echo json_encode([

    "success" => true,

    "usuario" => [

        "id_usuario" =>
            $usuario["id_usuario"],

        "nombre" =>
            $usuario["nombre_de_responsable"],

        "correo" =>
            $usuario["correo_electronico"],

        "fecha_creacion" =>
            $usuario["fecha_creacion"],

        "total_hijos" =>
            $datosHijos["total_hijos"]

    ]

]);


$stmt->close();

$stmtHijos->close();

$conn->close();

?>