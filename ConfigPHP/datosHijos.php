<?php

session_start();

include "conexion.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$nombreNino = $data["nombreNino"];
$edad = $data["edad"];

if(!isset($_SESSION["correo"])){

    echo json_encode([
        "success" => false,
        "mensaje" => "Sesión no encontrada"
    ]);

    exit;
}

$correoUsuario = $_SESSION["correo"];

/*
    Buscar el id del usuario
*/
$sql = "
SELECT id_usuario
FROM usuario
WHERE correo_electronico = ?
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "s",
    $correoUsuario
);

$stmt->execute();

$resultado = $stmt->get_result();

$usuario = $resultado->fetch_assoc();

if(!$usuario){

    echo json_encode([
        "success" => false,
        "mensaje" => "Usuario no encontrado"
    ]);

    exit;
}

$idUsuario = $usuario["id_usuario"];

/*
    Crear el hijo
*/
$sql = "
INSERT INTO hijos
(
    Id_usuario,
    nombre,
    edad
)
VALUES
(
    ?,
    ?,
    ?
)
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "isi",
    $idUsuario,
    $nombreNino,
    $edad
);

if($stmt->execute()){

    $_SESSION["id_hijo"] =
    $conn->insert_id;

    echo json_encode([
        "success" => true
    ]);

}else{

    echo json_encode([
        "success" => false,
        "mensaje" => $stmt->error
    ]);

}

?>