import { getState, setState } from "../../state.js";

export default () => {
    const container = document.createElement("div");
    container.setAttribute("id", "fase-3-g2");

    const estadoInicial = getState();

    const template = `
        <div class="cabecalho-fase-1">
            <div class="caixa-nome-grupo"><h1 class="titulo-fase" >${estadoInicial.grupos.nome2}</h1></div>
            <div class="caixa-cronometro" id="cronometro">00:00</div>
        </div>

        <div class="caixa-placa"></div>

        <div class="rodape-fase-1">
            <button class="btn-iniciar" id="btn-passar">PASSA ❌</button>
            <button class="btn-iniciar" id="btn-acertou">ACERTOU ✅</button>
        </div>
    `;

    container.innerHTML = template;

    const cronometroEl = container.querySelector("#cronometro");
    const placaEl = container.querySelector(".caixa-placa");
    const btnPassa = container.querySelector("#btn-passar");
    const btnAcertou = container.querySelector("#btn-acertou");

    const tempoRodada = estadoInicial.config.tempoRodada;

    const somAlarme = new Audio("/assets/sounds/alarm.mp3");
    somAlarme.volume = 1.0;

    let somTocado = false;
    let turnoEncerrado = false;
    let intervalo = null;

    /* ---------- FRASES (FASE 3) ---------- */

    function sortearNovaFrase() {
        const estado = getState();
        const pote = estado.pote.fase3;

        if (pote.length === 0) return null;
        return Math.floor(Math.random() * pote.length);
    }

    let indiceFraseAtual = sortearNovaFrase();

    if (indiceFraseAtual !== null) {
        placaEl.textContent = getState().pote.fase3[indiceFraseAtual];
    }

    btnPassa.addEventListener("click", () => {
        const novoIndice = sortearNovaFrase();
        if (novoIndice !== null) {
            indiceFraseAtual = novoIndice;
            placaEl.textContent = getState().pote.fase3[indiceFraseAtual];
        }
    });

    btnAcertou.addEventListener("click", () => {
        if (indiceFraseAtual === null) return;

        const estado = getState();

        estado.pote.fase3.splice(indiceFraseAtual, 1);
        estado.pontuacao.g2++;

        setState(estado);

        if (estado.pote.fase3.length === 0) {
            encerrarTurno();
            return;
        }

        indiceFraseAtual = sortearNovaFrase();
        placaEl.textContent = getState().pote.fase3[indiceFraseAtual];
    });

    /* ---------- CRONÔMETRO ---------- */

    iniciarCronometro(tempoRodada);

    function iniciarCronometro(tempoInicial) {
        if (intervalo) clearInterval(intervalo);

        let tempo = tempoInicial;
        atualizarTela(tempo);

        intervalo = setInterval(() => {
            tempo--;
            atualizarTela(tempo);

            if (tempo === 15 && !somTocado) {
                somAlarme.currentTime = 0;
                somAlarme.play();
                somTocado = true;
            }

            if (tempo <= 0) {
                encerrarTurno();
            }
        }, 1000);
    }

    function atualizarTela(tempo) {
        const min = String(Math.floor(tempo / 60)).padStart(2, "0");
        const sec = String(tempo % 60).padStart(2, "0");
        cronometroEl.textContent = `${min}:${sec}`;
    }

    /* ---------- ENCERRAR TURNO ---------- */

    function encerrarTurno() {
        if (turnoEncerrado) return;
        turnoEncerrado = true;

        clearInterval(intervalo);

        const estado = getState();

        // fim da fase 3 → final do jogo
        if (estado.pote.fase3.length === 0) {
            estado.fase.ativa = false;
            estado.fase.atual++;

            setState(estado);
            window.location.hash = "#final";
            return;
        }

        // alterna grupo
        estado.fase.grupoAtual =
            estado.fase.grupoAtual === 1 ? 2 : 1;

        setState(estado);
        window.location.hash = "#espera-turno";
    }

    return container;
};
