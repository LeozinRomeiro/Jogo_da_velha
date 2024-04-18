const spaces  = $("[data-quadrado]");
const board = $("[data-tabuleiro]");
const win = $("[data-venceu]");
const messageFinisher = $("[data-texto-venceu]");
const restart = $("[data-reiniciar]");
const scoreboard = $("[data-placar]");
const pontuação = $("[data-pontuação]");
let turn = false

const playerOfTheTurn = ()=>{
    let player = turn?"O":"X"
    return player
}

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
    spaces.one('click', (event) => {
        event.stopPropagation();
        happenClick(event);
    });
    board.addClass(playerOfTheTurn());
    win.removeClass("Surge-messagem")
}

const end = (empate,player)=>{
    if(empate)
        messageFinisher.text("Empate")
    else{
        messageFinisher.text(player+" Venceu");
        let punctuation = parseInt($(`[data-pontuacao-${player}]`).text())
        $(`[data-pontuacao-${player}]`).text(punctuation+1)
    }
    win.addClass("Surge-messagem")
}

Register = (space, player)=>{
    $(space).addClass(player)
    alterTurn();
}

const verifyWin = (player) => {
    return winningCombinations.some(Combinacao => {
        return Combinacao.every((index) => {
            return $(`#${index}`).hasClass(player);
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
    
    board.addClass(playerOfTheTurn())
}

const happenClick=(e)=>{
    const space = $(e.target);
    if(!$(space).hasClass('X') || !$(space).hasClass('O')){
        let player = playerOfTheTurn()
        console.log($(e.target))
        Register(space, player);
        if(verifyWin(player)){
            end(false,player)
        }
        if(verifyTie()){
            end(true,player)
        }
    }
}

Start();
restart.click(()=>Start())