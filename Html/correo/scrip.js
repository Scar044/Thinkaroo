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

    fetch("registro.php",{
        method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({

        correo: correo,

        password: password

    })

})
    .then(respuesta => respuesta.text())
    .then(datos => {
        alert(datos)
    });

}