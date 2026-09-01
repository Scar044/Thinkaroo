const sidebar = document.getElementById("sidebar");
const boton = document.getElementById("toggleBtn");

if (sidebar && boton) {

    boton.addEventListener("click", () => {

        sidebar.classList.toggle("cerrado");

        if (sidebar.classList.contains("cerrado")) {

            boton.innerHTML = "❯";

        } else {

            boton.innerHTML = "❮";

        }

    });

}