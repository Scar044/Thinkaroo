<?php

session_start();

header("Content-Type: application/json");

include "conexion.php";


// ==========================================
// COMPROBAR SESIÓN DEL USUARIO
// ==========================================

if (!isset($_SESSION["correo"])) {

    echo json_encode([
        "success" => false,
        "mensaje" => "Sesión de usuario no encontrada"
    ]);

    exit;
}


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
// OBTENER DATOS DEL USUARIO
// ==========================================

$sql = "
    SELECT
        h.Id_usuario,
        h.nombre_de_responsable,
        h.fecha_creacion,

    FROM Usuario h

    WHERE h.Id_hijo = ?
";


$stmt = $conn->prepare($sql);


if (!$stmt) {

    echo json_encode([
        "success" => false,
        "mensaje" => "Error al preparar la consulta: " . $conn->error
    ]);

    exit;
}


$stmt->bind_param(
    "i",
    $idUsuario
);


$stmt->execute();


$resultado = $stmt->get_result();


$usuario = $resultado->fetch_assoc();


if (!$usuario) {

    echo json_encode([
        "success" => false,
        "mensaje" => "No se encontró el usuario con ID: " . $idUsuario
    ]);

    exit;
}


// ==========================================
// OBTENER CANTIDAD DE HIJOS
// ==========================================

$sqlLogros = "
    SELECT COUNT(*) AS Id_usuario
    FROM hijos
    WHERE Id_usuario = ?
";


$stmtHijos = $conn->prepare($sqlLogros);

$stmtHijos->bind_param(
    "i",
    $idUsuario
);

$stmtHijos->execute();

$resultadoHijos = $stmtHijos->get_result();

$hijos = $resultadoHijos->fetch_assoc();


// ==========================================
// RESPUESTA
// ==========================================

echo json_encode([

    "success" => true,

    "Usuario" => [

        "id_usuario" =>
            $usuario["Id_usuario"],

        "nombre" =>
            $usuario["nombre_responsable"],        

        "fecha_creacion" =>
            $usuario["fecha_creacion"],

        "total_hijos" =>
            $usuario["total_hijos"]

    ]

]);


$stmt->close();
$stmtHijos->close();
$conn->close();

?>