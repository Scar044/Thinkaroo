const niveles = document.querySelectorAll(".nivel");
const continuar = document.querySelector(".continuar");
const cofre = document.querySelector(".cofre");



let progreso = JSON.parse(localStorage.getItem("progreso")) || [];

// Pintar niveles completados
progreso.forEach(index => {
    if (niveles[index]) {
        niveles[index].classList.add("completado");
    }
});



niveles.forEach((nivel, index) => {

    nivel.addEventListener("click", () => {

        nivel.animate([
            { transform: "scale(1)" },
            { transform: "scale(1.25)" },
            { transform: "scale(1)" }
        ], {
            duration: 300
        });

        if (!nivel.classList.contains("completado")) {

            nivel.classList.add("completado");

            progreso.push(index);

            localStorage.setItem(
                "progreso",
                JSON.stringify(progreso)
            );

        }

    });

});


continuar.addEventListener("click", () => {

    alert("¡Comienza tu siguiente lección!");

});


cofre.addEventListener("click", () => {

    cofre.animate([
        { transform: "rotate(0deg)" },
        { transform: "rotate(-15deg)" },
        { transform: "rotate(15deg)" },
        { transform: "rotate(0deg)" }
    ], {
        duration: 500
    });

    alert("🎁 ¡Has abierto un cofre!");

});


niveles.forEach(nivel => {

    nivel.addEventListener("mouseenter", () => {

        nivel.style.boxShadow =
            "0 0 25px rgba(255,255,255,.8)";

    });

    nivel.addEventListener("mouseleave", () => {

        nivel.style.boxShadow =
            "0 10px 20px rgba(0,0,0,.25)";

    });

});


function actualizarContador() {

    let total = document.querySelectorAll(".completado").length;

    console.log("Niveles completados:", total);

}

setInterval(actualizarContador, 1000);



setInterval(() => {

    continuar.animate([
        { transform: "scale(1)" },
        { transform: "scale(1.08)" },
        { transform: "scale(1)" }
    ], {
        duration: 1200
    });

}, 2500);



window.scrollTo({

    top: 0,
    behavior: "smooth"

});