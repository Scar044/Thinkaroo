window.addEventListener("load", () => {

    const barras = document.querySelectorAll(".fill");

    barras.forEach(barra => {

        const ancho = barra.style.width;

        barra.style.width = "0";

        setTimeout(() => {

            barra.style.width = ancho;

        },300);

    });

});


const niveles = document.querySelectorAll(".level");

niveles.forEach(nivel=>{

    nivel.addEventListener("click",()=>{

        niveles.forEach(n=>n.classList.remove("selected"));

        nivel.classList.add("selected");

    });

});

const menu = document.querySelectorAll("nav a");

menu.forEach(item=>{

    item.addEventListener("mouseenter",()=>{

        item.style.transform="translateX(8px)";

    });

    item.addEventListener("mouseleave",()=>{

        item.style.transform="translateX(0px)";

    });

});


let segundos = 30 * 60;

const tiempo = document.querySelector(".stat h3");

function actualizarTiempo(){

    if(!tiempo) return;

    let min = Math.floor(segundos / 60);
    let seg = segundos % 60;

    min = String(min).padStart(2,"0");
    seg = String(seg).padStart(2,"0");

    tiempo.textContent = `${min}:${seg}`;

    if(segundos > 0){

        segundos--;

    }

}

setInterval(actualizarTiempo,1000);

actualizarTiempo();



const padres = document.querySelector(".parents");

if(padres){

    padres.addEventListener("click",()=>{

        alert("Aquí se mostrará el progreso detallado para los padres.");

    });

}

// ===============================
// ANIMACIÓN DEL RESUMEN
// ===============================

const resumen = document.querySelector(".summary");

if(resumen){

    resumen.addEventListener("mouseenter",()=>{

        resumen.style.transform="scale(1.02)";
        resumen.style.transition=".3s";

    });

    resumen.addEventListener("mouseleave",()=>{

        resumen.style.transform="scale(1)";

    });

}

// ===============================
// MENSAJE SEGÚN EL NIVEL
// ===============================

niveles.forEach(nivel=>{

    nivel.addEventListener("dblclick",()=>{

        const titulo = nivel.querySelector("h3").textContent;

        alert("Has seleccionado: " + titulo);

    });

});