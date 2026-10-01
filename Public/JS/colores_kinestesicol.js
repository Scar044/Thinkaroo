function guardarProgreso(progreso, estado) {

fetch("../ConfigPHP/guardar_progreso.php", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        id_actividad: 9,
        progreso: progreso,
        estado: estado
    })
})
.then(response => response.json())
.then(data => {
    console.log("Progreso guardado:", data);
})
.catch(error => {
    console.error("Error al guardar progreso:", error);
});


}

const objects = [

{
    emoji: "🍎",
    nameKey: "colorsSort.apple",
    color: "rojo"
},

{
    emoji: "🍓",
    nameKey: "colorsSort.strawberry",
    color: "rojo"
},

{
    emoji: "🍒",
    nameKey: "colorsSort.cherries",
    color: "rojo"
},

{
    emoji: "❤️",
    nameKey: "colorsSort.heart",
    color: "rojo"
},

{
    emoji: "🎈",
    nameKey: "colorsSort.balloon",
    color: "rojo"
},

{
    emoji: "🐟",
    nameKey: "colorsSort.blueFish",
    color: "azul"
},

{
    emoji: "⚽",
    nameKey: "colorsSort.blueBall",
    color: "azul"
},

{
    emoji: "🚙",
    nameKey: "colorsSort.blueCar",
    color: "azul"
},

{
    emoji: "🪣",
    nameKey: "colorsSort.blueBucket",
    color: "azul"
},

{
    emoji: "🧢",
    nameKey: "colorsSort.blueCap",
    color: "azul"
},

{
    emoji: "🍌",
    nameKey: "colorsSort.banana",
    color: "amarillo"
},

{
    emoji: "🌽",
    nameKey: "colorsSort.corn",
    color: "amarillo"
},

{
    emoji: "⭐",
    nameKey: "colorsSort.star",
    color: "amarillo"
},

{
    emoji: "🐥",
    nameKey: "colorsSort.chick",
    color: "amarillo"
},

{
    emoji: "☀️",
    nameKey: "colorsSort.sun",
    color: "amarillo"
},

{
    emoji: "🍏",
    nameKey: "colorsSort.greenApple",
    color: "verde"
},

{
    emoji: "🥝",
    nameKey: "colorsSort.kiwi",
    color: "verde"
},

{
    emoji: "🐸",
    nameKey: "colorsSort.frog",
    color: "verde"
},

{
    emoji: "🌳",
    nameKey: "colorsSort.tree",
    color: "verde"
},

{
    emoji: "🍀",
    nameKey: "colorsSort.clover",
    color: "verde"
}
];

let score = 0;

let draggedObject = null;

let originalParent = null;

let offsetX = 0;

let offsetY = 0;

let messageTimeout;

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

function createObjects() {

objectsArea.innerHTML = "";

const shuffledObjects =
    shuffle(objects);


shuffledObjects.forEach(
    (item, index) => {

        const object =
            document.createElement("div");


        object.className =
            "object";


        object.dataset.color =
            item.color;


        object.dataset.index =
            index;


        object.innerHTML = `
            <div class="object-emoji">
                ${item.emoji}
            </div>

            <div class="object-name">
                ${window.translate(item.nameKey)}
            </div>
        `;


        object.addEventListener(
            "pointerdown",
            startDrag
        );


        objectsArea.appendChild(
            object
        );

    }
);

}

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

}

else {

    wrongAnswer();

}

}

function correctAnswer(targetBox) {

score++;


scoreElement.textContent =
    score;


const percentage =
    (score / objects.length) * 100;


progressElement.style.width =
    percentage + "%";

if (score < objects.length) {

    guardarProgreso(
        Math.round(percentage),
        "en proceso"
    );

}


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


draggedObject.style.opacity =
    "0";


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

    guardarProgreso(
        100,
        "completado"
    );


    setTimeout(() => {

        showFinish();

    }, 700);

}
}

function getSuccessMessage() {

const messages = [

    window.translate(
        "colorsSort.correct1"
    ),

    window.translate(
        "colorsSort.correct2"
    ),

    window.translate(
        "colorsSort.correct3"
    ),

    window.translate(
        "colorsSort.correct4"
    ),

    window.translate(
        "colorsSort.correct5"
    )

];


return messages[
    Math.floor(
        Math.random() *
        messages.length
    )
];

}

function wrongAnswer() {

showMessage(
    window.translate(
        "colorsSort.tryAgain"
    ),
    "error"
);


returnObject();

}

// ========================================
// DEVOLVER OBJETO
// ========================================

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

// ========================================
// MOSTRAR MENSAJE
// ========================================

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


function showFinish() {

createConfetti();


finishElement.classList.add(
    "show"
);

}

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


restartButton.addEventListener(
"click",
() => {

    window.location.href =
        "niveles.html";

}

);

window.addEventListener(
"thinkarooLanguageChanged",
() => {

    createObjects();

}

);


guardarProgreso(
0,
"sin iniciar"
);

createObjects();
