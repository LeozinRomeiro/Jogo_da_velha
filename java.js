const quadrado_elemento  = document.querySelectorAll("[data-quadrado]");//Pega todos os elementos html que possuiem o atributo "data quadrado" e armazena na variavel quadrado_elemento
//selecionar celula quadrado
const tabuleiro = document.querySelector("[data-tabuleiro]");//Busca o elemento que possui o atributo "data tabuleiro" e armazena na variavel tabuleiro
const Texto_venceu = document.querySelector("[data-texto-venceu]");
const Venceu = document.querySelector("[data-venceu]");
const Reiniciar = document.querySelector("[data-reiniciar]");
const Placar = document.querySelector("[data-placar]");
const pontuação = document.querySelector("[data-pontuação]");

let Turno = false;
var placar1=0;
var placar2=0;
var jogador1="Jogador1";
var jogador2="Jogador2";


const Combinacoes_vitoria = [
    [0,1,2],//Numero representando os quadrados essa lista mostra as conbições de vitoria
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
];

const Iniciar=()=>{//Define uma funcao inciar 
    for (const quadrado of quadrado_elemento ) {//Faz uma laçoi de repetição para que todos os elementos quadrado seja preenchidos 
        quadrado.classList.remove("O","X");

        quadrado.addEventListener("click", Acontecer_click, {once: true});//utilizando o método addEventListener. O evento click é associado à função Acontecer_click, e a opção {once: true} garante que o evento será tratado apenas uma vez.
        //limitar para apenas um click
        //Lis tar o evento click na celula; Onde para limita apenas um click;
    }
    Vez=Turno ? "O" : "X";
    tabuleiro.classList.add(Vez);//adiciona inicialmente o x a tabuleiro/board
    Venceu.classList.remove("Surge-messagem");
};

const Aumentar=()=>{
    //pontuação.innerText=jogador1+" "+placar1+" X "+placar2+" "+jogador2;
}

const Finalizar = (Empate,jogador)=>{//Funcao finalizar para verificar sem tem empate
    if(Empate)
        Texto_venceu.innerText="Empate";//Adiciona o texto a variriavel vinculada ao html; ta pegando a tag com a data texto_venceu e adicionando texto nela
    else{
        Texto_venceu.innerText=Turno?jogador+" Venceu!":jogador+" Venceu!";//Expressão ternaria para colocar Circulo ou X na vitoria
        if(jogador=="X"){
            placar1+=1;
        }else{
            placar2+=1;
        }
        Aumentar();
    }

    Venceu.classList.add("Surge-messagem");
    

}

const Verificar_vitoria = (quadrado_jogador)=>{
    return Combinacoes_vitoria.some(Combinacao=>{
        return Combinacao.every((index)=>{
            return quadrado_elemento[index].classList.contains(quadrado_jogador);
        });
    });
};

const Verificar_empate = ()=>{
    return [...quadrado_elemento].every(quadrado=>{//seleciona todos os quadrado_elemento e verificar/conta/contains os O e X
        return quadrado.classList.contains('X') ||quadrado.classList.contains('O');
    });
};

// Definir o metodo Registrar
const Registrar = (quadrado, Simpolo)=>{
    quadrado.classList.add(Simpolo);
};

const Alternar_turno=()=>{//A função Alternar_turno é definida para alternar o turno do jogador após cada jogada.
    Turno = !Turno;//Inverte o valor da variavel turno

    tabuleiro.classList.remove("O");//Remove as classes da variavel do tabuleiro/board
    tabuleiro.classList.remove("X");

    //Se na variavel turno simples para determinar qual classe atribui ao tabuleiro/board; Usando principios da pxpressão ternaria
    const Simpolo = Turno ? "O" : "X";
    tabuleiro.classList.add(Simpolo);
};

const Acontecer_click=(e)=>{//é definida para tratar o evento de clique em um quadrado. Ela é acionada quando o jogador clica em uma quadrado do tabuleiro

    // Colocar a marca (X ou circulo)
    const quadrado = e.target;
    const Simpolo = Turno ? "O" : "X";//A expressão ternária é uma forma simplificada de escrever um condicional if-else. A estrutura é a seguinte: condição ? valorSeVerdadeiro : valorSeFalso;
    //Se Turno for avaliado como verdadeiro (ou seja, o valor é true), a classe "O" será atribuída à variável Simpolo.
    //Se Turno for avaliado como falso (ou seja, o valor é false), a classe "X" será atribuída à variável Simpolo.
    // Aqui, Turno é uma variável que controla o turno do jogador.

    Registrar(quadrado, Simpolo);



    //Verificar por vitoria

    const Vitoria=Verificar_vitoria(Simpolo);//Verifica vitoria pede o simpolo da vez 
    if(Vitoria){
        Finalizar(false,Simpolo);
    }

    //Verificar por empate

    const Empate = Verificar_empate();
    if(Empate){
        Finalizar(true,Simpolo);
    }

    //Mudar símbolo apos o click

    Alternar_turno();
};

Iniciar();


Reiniciar.addEventListener('click', Iniciar);//Mesma ideia da função iniciar; adiciona o evento click que puxa o reiniciar