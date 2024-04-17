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
    spaces.removeClass("X","O");
    spaces.on({click:()=>AcontecerClick(event)})
    board.addClass(turn?"O":"X");
    Venceu.removeClass("Surge-messagem")
}

const Finalizar = (empate,player)=>{
    if(empate)
        messageFinisher.text("Empate")
    else{
        messageFinisher.text(player+" Venceu");
    }
    Venceu.addClass("Surge-messagem")
}

const Register = (space, player)=>{
    $(space).addClass(player);
}

const verificarVitoria = (quadrado_jogador) => {
    return Combinacoes_vitoria.some(Combinacao => {
        console.log(quadrado_jogador)
        console.log(Combinacao.every((index) => {
            return $(`#${index}`).hasClass(quadrado_jogador);
        }))
        return Combinacao.every((index) => {
            return $(`[data-quadrado="${index}"]`).hasClass(quadrado_jogador);
        });
    });
};

const verificarEmpate = () => {
    return $("[data-quadrado]").toArray().every(quadrado => {
        return $(quadrado).hasClass('X') || $(quadrado).hasClass('O');
    });
};

const alterTurn=()=>{
    turn = !turn

    board.removeClass("X");
    board.removeClass("O");
    
    board.addClass(turn?"O":"X")
}

const AcontecerClick=(e)=>{
    const space = $(e.target);
    const player = turn ? "O" : "X";
    Register(space, player);
    if(verificarVitoria(player)){
        Finalizar(false,player)
    }
    if(verificarEmpate()){
        Finalizar(true,player)
    }
    alterTurn();
}

Iniciar();
