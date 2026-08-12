const avatares = document.querySelectorAll(".avatar");
const botonSiguiente = document.querySelector("button");

let avatarSeleccionado = null;

avatares.forEach(function(avatar) {

    avatar.addEventListener("click", function() {

        avatares.forEach(function(avatar) {
            avatar.classList.remove("seleccionado");
        });

        avatar.classList.add("seleccionado");

        avatarSeleccionado = avatar.id;

        console.log("Avatar seleccionado:", avatarSeleccionado);
    });

});

botonSiguiente.addEventListener("click", function() {

    if (avatarSeleccionado === null) {

        alert("Selecciona un avatar antes de continuar");

        return;
    }

    fetch("../ConfigPHP/guardar_avatar.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            avatar: avatarSeleccionado
        })
    })

    .then(respuesta => respuesta.json())

    .then(datos => {

        if (datos.success) {

            console.log(datos.mensaje);

            window.location.href = "perfil.html";

        } else {

            alert(datos.mensaje);

        }

    })

    .catch(error => {

        console.error("Error:", error);
        alert("Ocurrió un error al guardar el avatar");

    });

});