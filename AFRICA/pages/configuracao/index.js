import { getState, setState } from "../../state.js";

export default () => {

    const container = document.createElement("div");
    container.setAttribute("id", "tela-configuracao");

    const estado = getState();

    const template = `
        <h1 class="titulo">Configurações<br> da partida</h1>

        <h3>Quantidade de frases por pessoa: <br> (Máx: 10)</h3>
        <div class="input-num-frase">
            <input type="number" class="inputNum" value="${estado.config.frasesPorPessoa || ""}">
            <button class="btn-ok" id="btn-ok-config">OK</button>
        </div>

        <p id="confirmacao-qtd-frases" class="txt-confirmacao"></p>

        <h3>Tempo de cada rodada:</h3>
        <div class="tempo-container">
            <button class="btn-tempo" data-tempo="60" id="btn-tempo-primeiro">60s</button>
            <button class="btn-tempo" data-tempo="90" id="btn-tempo-meio">90s</button>
            <button class="btn-tempo" data-tempo="120" id="btn-tempo-segundo">120s</button>
        </div>

        <p id="confirmacao-tempo" class="txt-confirmacao"></p>
        <p class="txt-confirmacao" id="verificacao-config"></p>


        <a href="/#" id="btn-continuar">Continuar</a>
    `;

    container.innerHTML = template;

    const inputNum = container.querySelector(".inputNum");
    const btnOK = container.querySelector("#btn-ok-config");
    const btnContinuar = container.querySelector("#btn-continuar");
    const confirmQtd = container.querySelector("#confirmacao-qtd-frases");
    const confirmTempo = container.querySelector("#confirmacao-tempo");
    const verificacao = container.querySelector("#verificacao-config");

    const btnsTempo = container.querySelectorAll(".btn-tempo");

    /* ---------- FRASES POR PESSOA ---------- */

    btnOK.addEventListener("click", () => {
        const qtd = Number(inputNum.value);

        if (qtd > 0 && qtd <= 10) {
            const estado = getState();
            estado.config.frasesPorPessoa = qtd;
            setState(estado);

            confirmQtd.style.color = "rgb(3, 233, 23)";
            confirmQtd.textContent = `Quantidade de frases por pessoa: ${qtd}`;
        } else if (qtd > 10) {
            confirmQtd.style.color = "rgb(255, 0, 0)";
            confirmQtd.textContent = "Limite de 10 frases excedido";
        } else {
            confirmQtd.style.color = "rgb(255, 0, 0)";
            confirmQtd.textContent = "Deve haver pelo menos uma frase por pessoa";
        }

        atualizarBotaoContinuar();
    });

    /* ---------- TEMPO DE RODADA ---------- */

    btnsTempo.forEach(btn => {
        btn.addEventListener("click", () => {
            const tempo = Number(btn.dataset.tempo);

            const estado = getState();
            estado.config.tempoRodada = tempo;
            setState(estado);

            confirmTempo.style.color = "rgb(3, 233, 23)";
            confirmTempo.textContent = `Tempo de cada rodada: ${tempo}s`;

            atualizarBotaoContinuar();
        });
    });

    /* ---------- CONTROLE DE FLUXO ---------- */

    function atualizarBotaoContinuar() {
        const estado = getState();

        if (
            estado.config.frasesPorPessoa > 0 &&
            estado.config.frasesPorPessoa <= 10 &&
            estado.config.tempoRodada > 0
        ) {
            btnContinuar.href = "/#frasesF1G1";
        } else {
            btnContinuar.href = "/#tela-configuracao";

        }
    }

    atualizarBotaoContinuar();

    return container;
};
