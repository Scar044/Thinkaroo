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
// OBTENER DATOS DEL HIJO
// ==========================================

$sql = "
    SELECT
        h.Id_hijo,
        h.nombre,
        h.edad,
        h.Id_avatar,
        h.estilo_aprendizaje,
        h.Nivel_actual,
        h.fecha_creacion,

        a.Nombre AS nombre_avatar,
        a.Imagen_url AS imagen_avatar

    FROM Hijos h

    LEFT JOIN Avatares a
        ON h.Id_avatar = a.Id_avatar

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
    $idHijo
);


$stmt->execute();


$resultado = $stmt->get_result();


$hijo = $resultado->fetch_assoc();


if (!$hijo) {

    echo json_encode([
        "success" => false,
        "mensaje" => "No se encontró el hijo con ID: " . $idHijo
    ]);

    exit;
}


// ==========================================
// OBTENER CANTIDAD DE LOGROS
// ==========================================

$sqlLogros = "
    SELECT COUNT(*) AS total_logros
    FROM Logros_hijos
    WHERE Id_hijo = ?
";


$stmtLogros = $conn->prepare($sqlLogros);

$stmtLogros->bind_param(
    "i",
    $idHijo
);

$stmtLogros->execute();

$resultadoLogros = $stmtLogros->get_result();

$logros = $resultadoLogros->fetch_assoc();


// ==========================================
// RESPUESTA
// ==========================================

echo json_encode([

    "success" => true,

    "hijo" => [

        "id_hijo" =>
            $hijo["Id_hijo"],

        "nombre" =>
            $hijo["nombre"],

        "edad" =>
            $hijo["edad"],

        "id_avatar" =>
            $hijo["Id_avatar"],

        "nombre_avatar" =>
            $hijo["nombre_avatar"],

        "imagen_avatar" =>
            $hijo["imagen_avatar"],

        "estilo_aprendizaje" =>
            $hijo["estilo_aprendizaje"],

        "nivel_actual" =>
            $hijo["Nivel_actual"],

        "fecha_creacion" =>
            $hijo["fecha_creacion"],

        "total_logros" =>
            $logros["total_logros"]

    ]

]);


$stmt->close();
$stmtLogros->close();
$conn->close();

?>