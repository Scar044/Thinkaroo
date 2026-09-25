<?php

session_start();

header("Content-Type: application/json");

include "conexion.php";


// ==========================================
// COMPROBAR QUE HAYA UN HIJO SELECCIONADO
// ==========================================

if (!isset($_SESSION["id_hijo"])) {

    echo json_encode([
        "success" => false,
        "mensaje" => "No hay ningún hijo seleccionado."
    ]);

    exit;
}


$id_hijo = intval($_SESSION["id_hijo"]);


// ==========================================
// RECIBIR DATOS
// ==========================================

$data = json_decode(
    file_get_contents("php://input"),
    true
);


$id_actividad = intval($data["id_actividad"]);
$progreso = intval($data["progreso"]);
$estado = $data["estado"];


// ==========================================
// OBTENER EL TEMA DE LA ACTIVIDAD
// ==========================================

$sqlTema = "
    SELECT id_tema
    FROM Actividades
    WHERE id_actividad = ?
";

$stmtTema = $conn->prepare($sqlTema);

$stmtTema->bind_param(
    "i",
    $id_actividad
);

$stmtTema->execute();

$resultadoTema = $stmtTema->get_result();

$actividad = $resultadoTema->fetch_assoc();


if (!$actividad) {

    echo json_encode([
        "success" => false,
        "mensaje" => "La actividad no existe."
    ]);

    exit;
}


$id_tema = $actividad["id_tema"];


// ==========================================
// COMPROBAR SI YA EXISTE EL PROGRESO
// ==========================================

$sqlExiste = "
    SELECT id_progreso
    FROM progreso
    WHERE Id_hijo = ?
    AND id_actividad = ?
";

$stmtExiste = $conn->prepare($sqlExiste);

$stmtExiste->bind_param(
    "ii",
    $id_hijo,
    $id_actividad
);

$stmtExiste->execute();

$resultadoExiste = $stmtExiste->get_result();


// ==========================================
// SI YA EXISTE → ACTUALIZAR
// ==========================================

if ($resultadoExiste->num_rows > 0) {

    $fila = $resultadoExiste->fetch_assoc();

    $id_progreso = $fila["id_progreso"];


    $sqlActualizar = "
        UPDATE progreso
        SET progreso = ?,
            estado = ?
        WHERE id_progreso = ?
    ";

    $stmtActualizar = $conn->prepare($sqlActualizar);

    $stmtActualizar->bind_param(
        "isi",
        $progreso,
        $estado,
        $id_progreso
    );

    $stmtActualizar->execute();


    echo json_encode([
        "success" => true,
        "mensaje" => "Progreso actualizado."
    ]);


// ==========================================
// SI NO EXISTE → CREAR
// ==========================================

} else {

    $sqlInsertar = "
        INSERT INTO progreso
        (
            Id_hijo,
            id_actividad,
            id_tema,
            progreso,
            estado
        )
        VALUES (?, ?, ?, ?, ?)
    ";

    $stmtInsertar = $conn->prepare($sqlInsertar);

    $stmtInsertar->bind_param(
        "iiiis",
        $id_hijo,
        $id_actividad,
        $id_tema,
        $progreso,
        $estado
    );

    $stmtInsertar->execute();


    echo json_encode([
        "success" => true,
        "mensaje" => "Progreso guardado."
    ]);
}


$stmtTema->close();
$stmtExiste->close();
$conn->close();

?>