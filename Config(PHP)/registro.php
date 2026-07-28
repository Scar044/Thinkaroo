<?php

include "conexion.php";

$data = json_decode(
    file_get_contents("php://input"),
    true
);

$correo = $data["../Public/correo"];

$password = password_hash(
    $data["password"],
    PASSWORD_DEFAULT
);

$sql = "
INSERT INTO usuario
(
correo_electronico,s
contrasena
)
VALUES
(
?,
?
)
";

$stmt = $conn->prepare($sql);

$stmt->bind_param(
    "ss",
    $correo,
    $password
);

if($stmt->execute()){
    echo "Usuario registrado correctamente";
}else{
    echo "Error al registrar usuario";
}

?>