const html = document.querySelector('html');
const focoButton = document.querySelector('.app__card-button--foco');
const curtoButton = document.querySelector('.app__card-button--curto');
const longoButton = document.querySelector('.app__card-button--longo');
const buttonStart = document.querySelector('.app__card-primary-button-wrapper');
const botoes = document.querySelectorAll('.app__card-button');
const startButton = document.querySelector('#start-pause');
const startOrPauseButton = document.querySelector ('#start-pause span');
const tempoNatela = document.querySelector('#timer');


const imagem = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');


const musicFoco = document.querySelector('#alternar-musica');
const music = new Audio('./sons/luna-rise-part-one.mp3');
const somPlay = new Audio('./sons/play.wav');
const somPause = new Audio('./sons/pause.mp3');
const somTempoEsgotado = new Audio('./sons/beep.mp3')
music.loop = true;


let tempoDecorridoEmSegundos = 1500
let intervaloId = null


musicFoco.addEventListener('change', () => {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
});


focoButton.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500
    alterarTema('foco');
    focoButton.classList.add('active');
});

curtoButton.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300
    alterarTema('descanso-curto');
    curtoButton.classList.add('active');
});

longoButton.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900
    alterarTema('descanso-longo');
    longoButton.classList.add('active');
});

// Função para alterar o tema

function alterarTema(contexto) {
    mostrarTempo()
    botoes.forEach(function (botao) { 
        botao.classList.remove('active');
    });

    html.setAttribute('data-contexto', contexto);
    imagem.setAttribute('src', `./imagens/${contexto}.png`);

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `
                Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
            `;
            break;

        case "descanso-curto":
            titulo.innerHTML = `
                Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta.</strong>
            `;
            break;

        case "descanso-longo":
            titulo.innerHTML = `
                Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>
            `;
            break;

        default:
            break;
    }
}

// Área para o contador 


const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        somFim.play(); 
        alert('Tempo finalizado!');
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo()
};

startButton.addEventListener('click', inicarOuPause);

function inicarOuPause() {
    if (intervaloId) { // Se o intervalo estiver rodando, pausar
        somPause.play(); // Toca o som de pausa
        zerar(); // Limpa o intervalo e atualiza o botão
        return;
    }
    somPlay.play(); // Toca o som de início
    intervaloId = setInterval(contagemRegressiva, 1000); // Inicia o intervalo
    startButton.textContent = "Pause"; 
    startOrPauseButton.setAttribute('src', `./imagens/pause.png`); 
}

function zerar() {
    clearInterval(intervaloId); 
    intervaloId = null; 
    startButton.textContent = "Começar"; 
    startOrPauseButton.setAttribute('src', `./imagens/play_arrow.png`); 
}


function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoConsertado = tempo.toLocaleTimeString('pt-br', { minute: '2-digit', second: '2-digit'});
    tempoNatela.innerHTML = `${tempoConsertado}`;
    
}

mostrarTempo()