<?php

$host = "localhost";
$usuario = "root";
$password = "";
$baseDatos = "Thinkaroo";

$conn = new mysqli(
    $host,
    $usuario,
    $password,
    $baseDatos
);

if($conn->connect_error){
    die("Error de conexión");
}

?>