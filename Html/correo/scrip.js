const formulario =
document.getElementById("form-registro");

formulario.addEventListener(
    "submit",
    registrarUsuario
);

function registrarUsuario(evento){

    evento.preventDefault();

    let correo =
    document.getElementById("input-correo").value;

    let password =
    document.getElementById("input-clave").value;

    let confirmarPassword =
    document.getElementById(
        "input-confirmar-clave"
    ).value;

    if(password !== confirmarPassword){

        alert(
            "Las contraseñas no coinciden"
        );

        return;
    }

    fetch("mensaje.php")
    .then(respuesta => respuesta.text())
    .then(datos => {
        alert(datos)
    });

}