import { getState, setState, initState } from "../../state.js";

export default () => {

    const container = document.createElement("div");
    container.setAttribute("id", "final");

    const estado = getState();

    const template = `
        <h1 class="titulo">Fim de Jogo</h1>

        <div class="caixa-pontuacao">
            <div class="caixa-pontuacao-grupo1">
                <h2>PONTUAÇÃO ${estado.grupos.nome1}</h2>
                <h2>${estado.pontuacao?.g1 ?? 0}</h2>
            </div>

            <div class="caixa-pontuacao-grupo2">
                <h2>PONTUAÇÃO ${estado.grupos.nome2}</h2>
                <h2>${estado.pontuacao?.g2 ?? 0}</h2>
            </div>
        </div>

        <h1 class="titulo" id="vencedor-texto"></h1>

        <a href="/#home" id="botao-reiniciar">Reiniciar Jogo</a>
    `;

    container.innerHTML = template;

    const vencedor = container.querySelector("#vencedor-texto");
    const btnReiniciar = container.querySelector("#botao-reiniciar");

    const pontosG1 = estado.pontuacao?.g1 ?? 0;
    const pontosG2 = estado.pontuacao?.g2 ?? 0;

    if (pontosG1 > pontosG2) {
        vencedor.textContent = `O VENCEDOR É ${estado.grupos.nome1}!!`;
    } else if (pontosG2 > pontosG1) {
        vencedor.textContent = `O VENCEDOR É ${estado.grupos.nome2}!!`;
    } else {
        vencedor.textContent = `EMPATE`;
    }

    btnReiniciar.addEventListener("click", () => {
        sessionStorage.removeItem("estadoJogo");
        initState();
    });

    return container;
};
