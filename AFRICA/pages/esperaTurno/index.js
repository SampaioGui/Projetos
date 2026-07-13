import { getState } from "../../state.js";

export default () => {

    const container = document.createElement("div");
    container.setAttribute("id", "espera-turno");

    const template = `
        <h1 class="titulo">Troca de Turno</h1>
        <div id="tela-espera-subt-btn">
            <h2 class="subtitulo">
                Entregue o dispositivo para <br>
                o próximo grupo e aguarde.
            </h2>
            <a id="btn-ok">Ok</a>
        </div>
    `;

    container.innerHTML = template;

    const btnOk = container.querySelector("#btn-ok");

    btnOk.addEventListener("click", irParaProximoTurno);

    return container;

    function irParaProximoTurno() {
        const estado = getState();

        const fase = estado.fase.atual;
        const grupo = estado.fase.grupoAtual;

        window.location.hash = `#fase-${fase}-g${grupo}`;
    }
};
