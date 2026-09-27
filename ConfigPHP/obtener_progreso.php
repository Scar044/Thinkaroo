<?php

session_start();

header("Content-Type: application/json");

include "conexion.php";


// =====================================
// COMPROBAR HIJO SELECCIONADO
// =====================================

if (!isset($_SESSION["id_hijo"])) {

    echo json_encode([
        "success" => false,
        "mensaje" => "No hay ningún hijo seleccionado."
    ]);

    exit;
}


$id_hijo = $_SESSION["id_hijo"];


// =====================================
// OBTENER ESTILO DEL HIJO
// =====================================

$sqlHijo = "
    SELECT
        Id_hijo,
        nombre,
        estilo_aprendizaje
    FROM Hijos
    WHERE Id_hijo = ?
";

$stmtHijo = $conn->prepare($sqlHijo);

$stmtHijo->bind_param("i", $id_hijo);

$stmtHijo->execute();

$resultadoHijo = $stmtHijo->get_result();

if ($resultadoHijo->num_rows === 0) {

    echo json_encode([
        "success" => false,
        "mensaje" => "No se encontró el hijo seleccionado."
    ]);

    exit;
}

$hijo = $resultadoHijo->fetch_assoc();

$estilo_aprendizaje = $hijo["estilo_aprendizaje"];

$stmtHijo->close();


// =====================================
// OBTENER PROGRESO
// =====================================

$sql = "
    SELECT
        p.id_progreso,
        p.Id_hijo,
        p.id_actividad,
        p.progreso,
        p.estado,

        a.titulo,
        a.descripcion,
        a.numero_de_clase,
        a.estilo_aprendizaje,

        t.id_tema,
        t.numero_de_nivel,
        t.dificultad

    FROM progreso p

    INNER JOIN Actividades a
        ON p.id_actividad = a.id_actividad

    INNER JOIN Temas t
        ON a.id_tema = t.id_tema

    WHERE p.Id_hijo = ?

    ORDER BY
        t.numero_de_nivel ASC,
        a.numero_de_clase ASC
";


$stmt = $conn->prepare($sql);

$stmt->bind_param("i", $id_hijo);

$stmt->execute();

$resultado = $stmt->get_result();

$progreso = [];


while ($fila = $resultado->fetch_assoc()) {

    $progreso[] = $fila;

}


// =====================================
// RESPUESTA
// =====================================

echo json_encode([
    "success" => true,
    "id_hijo" => $id_hijo,
    "nombre_hijo" => $hijo["nombre"],
    "estilo_aprendizaje" => $estilo_aprendizaje,
    "progreso" => $progreso
]);


$stmt->close();

$conn->close();

?>