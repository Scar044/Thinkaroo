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


    fetch("../ConfigPHP/login.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        correo: correo,
        password: password,
    })
})
.then(respuesta => respuesta.json())
.then(datos => {
    
    if(datos.success){

        window.location.href = "responsables.html";

    }else{

        alert(datos.mensaje);

}
});