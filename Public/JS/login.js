const formulario =
document.getElementById("form-login");

formulario.addEventListener(
    "submit",
    iniciarSesion
);

function iniciarSesion(evento){

    evento.preventDefault();

    let correo =
    document.getElementById(
        "input-correo"
    ).value;

    let password =
    document.getElementById(
        "input-clave"
    ).value;


    console.log(password);



    fetch("login.php", {
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
    alert(datos);
});

}