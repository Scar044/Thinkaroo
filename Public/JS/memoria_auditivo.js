(function(){

const pairs=[

    {
        img:"IMG/avatar1cerdo.png",
        audio:"../audios/cerdo.mp3"
    },

    {
        img:"IMG/avatar2conejo.png",
        audio:"../audios/conejo.mp3"
    },

    {
        img:"IMG/avatar3gato.png",
        audio:"../audios/gato.mp3"
    },

    {
        img:"IMG/avatar4oveja.png",
        audio:"../audios/oveja.mp3"
    },

    {
        img:"IMG/avatar5pollo.png",
        audio:"../audios/pollo.mp3"
    },

    {
        img:"IMG/avatar6ratón.png",
        audio:"../audios/raton.mp3"
    },

    {
        img:"IMG/avatar7tigre.png",
        audio:"../audios/tigre.mp3"
    },

    {
        img:"IMG/avatar8vaca.png",
        audio:"../audios/vaca.mp3"
    }

];

let cards=[];

// Crear una carta de imagen y otra de audio
pairs.forEach((pair,index)=>{

    cards.push({

        id:index,
        type:"image",
        img:pair.img,
        audio:pair.audio

    });

    cards.push({

        id:index,
        type:"audio",
        img:pair.img,
        audio:pair.audio

    });

});

// Mezclar cartas
cards.sort(()=>Math.random()-0.5);

const gameBoard=document.getElementById("gameBoard");

let firstCard=null;
let secondCard=null;
let lockBoard=false;
let matchedPairs=0;

cards.forEach(cardData=>{

    const card=document.createElement("div");
    card.classList.add("card");

    card.dataset.id=cardData.id;
    card.dataset.type=cardData.type;
    card.dataset.audio=cardData.audio;

    if(cardData.type==="image"){

        const img=document.createElement("img");
        img.src=cardData.img;
        img.alt="Animal";
        card.appendChild(img);

    }else{

        const icon=document.createElement("div");
        icon.classList.add("audio-icon");
        icon.innerHTML="🔊";
        card.appendChild(icon);

    }

    card.addEventListener("click",flipCard);

    gameBoard.appendChild(card);

});

function flipCard(){

    if(lockBoard ||
       this.classList.contains("matched") ||
       this.classList.contains("flipped"))
       return;

    this.classList.add("flipped");

    if(this.dataset.type==="audio"){

        const sonido=new Audio(this.dataset.audio);
        sonido.play();

    }

    if(firstCard===null){

        firstCard=this;
        return;

    }

    secondCard=this;

    lockBoard=true;

    checkMatch();

}

function checkMatch(){

    const match=

    firstCard.dataset.id===secondCard.dataset.id &&
    firstCard.dataset.type!==secondCard.dataset.type;

    if(match){

        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matchedPairs++;

        resetTurn();

        if(matchedPairs===pairs.length){

            setTimeout(()=>{

                alert("🎉 ¡Felicidades! Has encontrado todas las parejas.");

            },300);

        }

    }else{

        setTimeout(()=>{

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            resetTurn();

        },1000);

    }

}

function resetTurn(){

    firstCard=null;
    secondCard=null;
    lockBoard=false;

}

})();