/*
========================================
DATOS DEL JUEGO
========================================
*/

const objects = [

    // 🔴 ROJO

    {
        emoji: "🍎",
        name: "Manzana",
        color: "rojo"
    },

    {
        emoji: "🍓",
        name: "Fresa",
        color: "rojo"
    },

    {
        emoji: "🍒",
        name: "Cerezas",
        color: "rojo"
    },

    {
        emoji: "❤️",
        name: "Corazón",
        color: "rojo"
    },

    {
        emoji: "🎈",
        name: "Globo",
        color: "rojo"
    },


    // 🔵 AZUL

    {
        emoji: "🐟",
        name: "Pez azul",
        color: "azul"
    },

    {
        emoji: "⚽",
        name: "Pelota azul",
        color: "azul"
    },

    {
        emoji: "🚙",
        name: "Carro azul",
        color: "azul"
    },

    {
        emoji: "🪣",
        name: "Cubeta azul",
        color: "azul"
    },

    {
        emoji: "🧢",
        name: "Gorra azul",
        color: "azul"
    },


    // 🟡 AMARILLO

    {
        emoji: "🍌",
        name: "Plátano",
        color: "amarillo"
    },

    {
        emoji: "🌽",
        name: "Maíz",
        color: "amarillo"
    },

    {
        emoji: "⭐",
        name: "Estrella",
        color: "amarillo"
    },

    {
        emoji: "🐥",
        name: "Pollito",
        color: "amarillo"
    },

    {
        emoji: "☀️",
        name: "Sol",
        color: "amarillo"
    },


    // 🟢 VERDE

    {
        emoji: "🍏",
        name: "Manzana verde",
        color: "verde"
    },

    {
        emoji: "🥝",
        name: "Kiwi",
        color: "verde"
    },

    {
        emoji: "🐸",
        name: "Rana",
        color: "verde"
    },

    {
        emoji: "🌳",
        name: "Árbol",
        color: "verde"
    },

    {
        emoji: "🍀",
        name: "Trébol",
        color: "verde"
    }

];


/*
========================================
VARIABLES
========================================
*/

let score = 0;

let draggedObject = null;

let originalParent = null;

let offsetX = 0;
let offsetY = 0;

let messageTimeout;


/*
========================================
ELEMENTOS HTML
========================================
*/

const objectsArea =
    document.getElementById("objectsArea");

const scoreElement =
    document.getElementById("score");

const progressElement =
    document.getElementById("progress");

const messageElement =
    document.getElementById("message");

const finishElement =
    document.getElementById("finish");

const restartButton =
    document.getElementById("restart");


/*
========================================
MEZCLAR OBJETOS
========================================
*/

function shuffle(array) {

    const newArray = [...array];

    for (
        let i = newArray.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() * (i + 1)
            );

        [
            newArray[i],
            newArray[j]
        ] =
        [
            newArray[j],
            newArray[i]
        ];
    }

    return newArray;
}


/*
========================================
CREAR OBJETOS
========================================
*/

function createObjects() {

    objectsArea.innerHTML = "";

    const shuffledObjects =
        shuffle(objects);

    shuffledObjects.forEach(
        (item, index) => {

            const object =
                document.createElement("div");

            object.className = "object";

            object.dataset.color =
                item.color;

            object.dataset.index =
                index;

            object.innerHTML = `
                <div class="object-emoji">
                    ${item.emoji}
                </div>

                <div class="object-name">
                    ${item.name}
                </div>
            `;

            object.addEventListener(
                "pointerdown",
                startDrag
            );

            objectsArea.appendChild(object);
        }
    );
}


/*
========================================
INICIAR ARRASTRE
========================================
*/

function startDrag(event) {

    if (draggedObject) {
        return;
    }

    draggedObject =
        event.currentTarget;

    originalParent =
        draggedObject.parentElement;

    const rect =
        draggedObject.getBoundingClientRect();

    offsetX =
        event.clientX - rect.left;

    offsetY =
        event.clientY - rect.top;

    draggedObject.classList.add(
        "dragging"
    );

    draggedObject.style.width =
        rect.width + "px";

    draggedObject.style.height =
        rect.height + "px";

    draggedObject.style.left =
        (event.clientX - offsetX) + "px";

    draggedObject.style.top =
        (event.clientY - offsetY) + "px";

    document.body.appendChild(
        draggedObject
    );

    document.addEventListener(
        "pointermove",
        dragMove
    );

    document.addEventListener(
        "pointerup",
        endDrag,
        { once: true }
    );
}


/*
========================================
MOVER OBJETO
========================================
*/

function dragMove(event) {

    if (!draggedObject) {
        return;
    }

    draggedObject.style.left =
        (event.clientX - offsetX) + "px";

    draggedObject.style.top =
        (event.clientY - offsetY) + "px";

    highlightColorBox(
        event.clientX,
        event.clientY
    );
}


/*
========================================
RESALTAR COLOR
========================================
*/

function highlightColorBox(x, y) {

    const boxes =
        document.querySelectorAll(
            ".color-box"
        );

    boxes.forEach(box => {

        const rect =
            box.getBoundingClientRect();

        const inside =
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom;

        box.classList.toggle(
            "hovered",
            inside
        );
    });
}


/*
========================================
TERMINAR ARRASTRE
========================================
*/

function endDrag(event) {

    if (!draggedObject) {
        return;
    }

    document.removeEventListener(
        "pointermove",
        dragMove
    );

    const boxes =
        document.querySelectorAll(
            ".color-box"
        );

    let targetBox = null;

    boxes.forEach(box => {

        const rect =
            box.getBoundingClientRect();

        const inside =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

        if (inside) {
            targetBox = box;
        }

        box.classList.remove(
            "hovered"
        );
    });


    if (!targetBox) {

        returnObject();

        return;
    }


    const targetColor =
        targetBox.dataset.color;

    const objectColor =
        draggedObject.dataset.color;


    if (targetColor === objectColor) {

        correctAnswer(targetBox);

    } else {

        wrongAnswer();
    }
}


/*
========================================
RESPUESTA CORRECTA
========================================
*/

function correctAnswer(targetBox) {

    score++;

    scoreElement.textContent =
        score;

    const percentage =
        (score / objects.length) * 100;

    progressElement.style.width =
        percentage + "%";


    targetBox.classList.add(
        "correct"
    );


    setTimeout(() => {

        targetBox.classList.remove(
            "correct"
        );

    }, 500);


    draggedObject.classList.remove(
        "dragging"
    );

    draggedObject.style.opacity = "0";

    draggedObject.style.transform =
        "scale(0)";


    setTimeout(() => {

        if (draggedObject) {
            draggedObject.remove();
        }

        draggedObject = null;

    }, 250);


    showMessage(
        getSuccessMessage(),
        "success"
    );


    if (score === objects.length) {

        setTimeout(() => {

            showFinish();

        }, 700);
    }
}


/*
========================================
MENSAJES CORRECTOS
========================================
*/

function getSuccessMessage() {

    const messages = [

        "🌟 ¡Muy bien!",

        "👏 ¡Excelente!",

        "🎉 ¡Correcto!",

        "⭐ ¡Genial!",

        "😊 ¡Lo hiciste muy bien!"

    ];

    return messages[
        Math.floor(
            Math.random() *
            messages.length
        )
    ];
}


/*
========================================
RESPUESTA INCORRECTA
========================================
*/

function wrongAnswer() {

    showMessage(
        "😊 ¡Inténtalo otra vez!",
        "error"
    );

    returnObject();
}


/*
========================================
DEVOLVER OBJETO
========================================
*/

function returnObject() {

    if (!draggedObject) {
        return;
    }

    draggedObject.classList.remove(
        "dragging"
    );

    draggedObject.style.position = "";
    draggedObject.style.left = "";
    draggedObject.style.top = "";
    draggedObject.style.width = "";
    draggedObject.style.height = "";
    draggedObject.style.opacity = "";
    draggedObject.style.transform = "";

    originalParent.appendChild(
        draggedObject
    );

    draggedObject = null;
}


/*
========================================
MOSTRAR MENSAJE
========================================
*/

function showMessage(text, type) {

    clearTimeout(
        messageTimeout
    );

    messageElement.textContent =
        text;

    messageElement.className =
        "message " +
        type +
        " show";


    messageTimeout =
        setTimeout(() => {

            messageElement.classList.remove(
                "show"
            );

        }, 900);
}


/*
========================================
FINAL DEL JUEGO
========================================
*/

function showFinish() {

    createConfetti();

    finishElement.classList.add(
        "show"
    );
}


/*
========================================
CONFETI
========================================
*/

function createConfetti() {

    const colors = [

        "#ff5252",
        "#42a5f5",
        "#ffd740",
        "#66bb6a",
        "#ff4081",
        "#7c4dff"

    ];


    for (
        let i = 0;
        i < 100;
        i++
    ) {

        const confetti =
            document.createElement(
                "div"
            );

        confetti.className =
            "confetti";

        confetti.style.left =
            Math.random() * 100 + "vw";

        confetti.style.backgroundColor =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

        confetti.style.animationDuration =
            (2 + Math.random() * 3) +
            "s";

        confetti.style.animationDelay =
            Math.random() * 1.5 +
            "s";

        document.body.appendChild(
            confetti
        );


        setTimeout(() => {

            confetti.remove();

        }, 5500);
    }
}


/*
========================================
REINICIAR
========================================
*/

restartButton.addEventListener(
    "click",
    () => {

        score = 0;

        scoreElement.textContent =
            "0";

        progressElement.style.width =
            "0%";

        finishElement.classList.remove(
            "show"
        );

        draggedObject = null;

        createObjects();
    }
);


/*
========================================
INICIAR JUEGO
========================================
*/

createObjects();
