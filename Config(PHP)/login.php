<?php

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$correo = $data["correo"];
$clave = $data["password"];

include "conexion.php";

$sql = "
SELECT *
FROM usuario
WHERE correo_electronico = ?
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "s",
    $correo
);

$stmt->execute();

$resultado = $stmt->get_result();

$usuario = $resultado->fetch_assoc();

if(!$usuario){
    echo "Usuario no encontrado";
    exit;
}


if(password_verify($clave, $usuario["contrasena"])){

    echo "Inicio de sesión correcto";

}else{

    echo "Contraseña incorrecta";

}