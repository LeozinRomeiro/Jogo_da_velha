const spaces  = $("[data-quadrado]");
const board = $("[data-tabuleiro]");
const Venceu = $("[data-venceu]");
const messageFinisher = $("[data-texto-venceu]");
const Reiniciar = $("[data-reiniciar]");
const Placar = $("[data-placar]");
const pontuação = $("[data-pontuação]");
let turn = false

const Combinacoes_vitoria = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
];

const Iniciar=()=>{
    spaces.removeClass("X");
    spaces.on({click:()=>AcontecerClick(event)})
    time=turn?"O":"X";
    board.addClass(time);
    messageFinisher.removeClass("Surge-messagem")
}

Register(space, player){
    $(space).addClass(player);
}

verificarVitoria(){
    
}

const AcontecerClick=(e)=>{
    const space = $(e.target);
    const player = turn ? "O" : "X";
    Register(space, player);
    if(verificarVitoria(player)){

    }
}

Iniciar();
