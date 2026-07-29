const formulario =
document.getElementById("form-registro");

formulario.addEventListener(
    "submit",
    registrarUsuario
);

function registrarUsuario(evento){

    evento.preventDefault();

    let nombre =
    document.getElementById("input-nombre").value;

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

    fetch("../ConfigPHP/registro.php",{
        method: "POST",
        headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        nombre: nombre,
        correo: correo,
        password: password
    })

})
    
.then(respuesta => respuesta.json())
.then(datos => {

    if(datos.success){

        window.location.href = "datosHijos.html";

    }else{

        alert(datos.mensaje);

    }

});

}