<?php

session_start();

header("Content-Type: application/json");

include "conexion.php";

// Verificar que exista un hijo seleccionado
if (!isset($_SESSION["id_hijo"])) {
    echo json_encode([
        "success" => false,
        "mensaje" => "No hay ningún hijo seleccionado."
    ]);
    exit;
}

$id_hijo = $_SESSION["id_hijo"];

/*
    Obtenemos:
    - progreso
    - estado
    - actividad
    - tema
    - número de nivel
*/

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

        t.id_tema,
        t.numero_de_nivel,
        t.dificultad

    FROM progreso p

    INNER JOIN Actividades a
        ON p.id_actividad = a.id_actividad

    INNER JOIN Temas t
        ON a.id_tema = t.id_tema

    WHERE p.Id_hijo = ?

    ORDER BY t.numero_de_nivel ASC, a.numero_de_clase ASC
";

$stmt = $conn->prepare($sql);

$stmt->bind_param("i", $id_hijo);

$stmt->execute();

$resultado = $stmt->get_result();

$progreso = [];

while ($fila = $resultado->fetch_assoc()) {
    $progreso[] = $fila;
}

echo json_encode([
    "success" => true,
    "id_hijo" => $id_hijo,
    "progreso" => $progreso
]);

$stmt->close();
$conn->close();

?>