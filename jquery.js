const spaces  = $("[data-quadrado]");
const board = $("[data-tabuleiro]");
const win = $("[data-venceu]");
const messageFinisher = $("[data-texto-venceu]");
const restart = $("[data-reiniciar]");
const scoreboard = $("[data-placar]");
const pontuação = $("[data-pontuação]");
let turn = false

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
];

const Start=()=>{
    spaces.removeClass("X");
    spaces.removeClass("O");
    spaces.one({click:()=>happenClick(event)})
    board.addClass(turn?"O":"X");
    win.removeClass("Surge-messagem")
}

const end = (empate,player)=>{
    if(empate)
        messageFinisher.text("Empate")
    else{
        messageFinisher.text(player+" Venceu");
    }
    win.addClass("Surge-messagem")
}

const Register = (space, player)=>{
    $(space).addClass(player);
}

const verifyWin = (quadrado_jogador) => {
    return winningCombinations.some(Combinacao => {
        return Combinacao.every((index) => {
            return $(`#${index}`).hasClass(quadrado_jogador);
        });
    });
};

const verifyTie = () => {
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

const happenClick=(e)=>{
    const space = $(e.target);
    const player = turn ? "O" : "X";
    Register(space, player);
    if(verifyWin(player)){
        end(false,player)
    }
    if(verifyTie()){
        end(true,player)
    }
    alterTurn();
}

Start();
restart.click(()=>Start())