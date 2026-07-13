import { getState, setState } from "../../state.js";

export default () => {

    const container = document.createElement("div");
    container.setAttribute("id", "tela-participantes");

    const estado = getState();

    const nomeGrupo1 = estado.grupos.nome1 || "Grupo 1";
    const nomeGrupo2 = estado.grupos.nome2 || "Grupo 2";

    const LIMITE_PARTICIPANTES = 10;
    const MAX_COLUNA = 5;

    const template = `
        <h1 class="titulo-participantes">Participantes</h1>
        <p class="subtitulo">Digite os nomes dos participantes <br> de cada grupo</p>

        <div class="input-part-container">
            <h2 class="nome-grupoTP">${nomeGrupo1}</h2>
            <div class="input-participantes-container">
                <input class="input-participantes" type="text" id="input-g1" placeholder="Nome do participante">
                <button class="btn-ok" id="btn-add-g1">⟶</button>
            </div>
        </div>

        <div class="grupo">
            <div class="listas">
                <ul id="lista-g1-col1"></ul>
                <ul id="lista-g1-col2"></ul>
            </div>
        </div>

        <p class="aviso-limite" id="aviso-g1"></p>

        <div class="input-part-container">
            <h2 class="nome-grupoTP">${nomeGrupo2}</h2>
            <div class="input-participantes-container">
                <input class="input-participantes" type="text" id="input-g2" placeholder="Nome do participante">
                <button class="btn-ok" id="btn-add-g2">⟶</button>
            </div>
        </div>

        <div class="grupo">
            <div class="listas">
                <ul id="lista-g2-col1"></ul>
                <ul id="lista-g2-col2"></ul>
            </div>
        </div>

        <p class="aviso-limite" id="aviso-g2"></p>

        <a href="/#" id="btn-continuar">Continuar</a>
    `;

    container.innerHTML = template;

    const inputG1 = container.querySelector("#input-g1");
    const inputG2 = container.querySelector("#input-g2");
    const btnAddG1 = container.querySelector("#btn-add-g1");
    const btnAddG2 = container.querySelector("#btn-add-g2");
    const btnContinuar = container.querySelector("#btn-continuar");

    const avisoG1 = container.querySelector("#aviso-g1");
    const avisoG2 = container.querySelector("#aviso-g2");

    const listaG1Col1 = container.querySelector("#lista-g1-col1");
    const listaG1Col2 = container.querySelector("#lista-g1-col2");
    const listaG2Col1 = container.querySelector("#lista-g2-col1");
    const listaG2Col2 = container.querySelector("#lista-g2-col2");

    function renderLista(participantes, col1, col2, grupoKey) {
        col1.innerHTML = "";
        col2.innerHTML = "";

        participantes.forEach((nome, index) => {
            const li = document.createElement("li");
            li.textContent = nome;

            const btnRemover = document.createElement("button");
            btnRemover.className = "btn-remover";
            btnRemover.textContent = "❌";

            btnRemover.onclick = () => {
                const estadoAtual = getState();
                estadoAtual.participantes[grupoKey].splice(index, 1);
                setState(estadoAtual);
                atualizarTela();
            };

            li.appendChild(btnRemover);

            (index < MAX_COLUNA ? col1 : col2).appendChild(li);
        });
    }

    function atualizarTela() {
        const estadoAtual = getState();

        renderLista(estadoAtual.participantes.g1, listaG1Col1, listaG1Col2, "g1");
        renderLista(estadoAtual.participantes.g2, listaG2Col1, listaG2Col2, "g2");

        btnContinuar.href =
            estadoAtual.participantes.g1.length > 0 &&
                estadoAtual.participantes.g2.length > 0
                ? "/#tela-configuracao"
                : "/#participantes";
    }

    btnAddG1.onclick = () => {
        const nome = inputG1.value.trim();
        if (!nome) return;

        const estadoAtual = getState();
        if (estadoAtual.participantes.g1.length >= LIMITE_PARTICIPANTES) {
            avisoG1.textContent = `Limite de ${LIMITE_PARTICIPANTES} participantes atingido.`;
            return;
        }

        estadoAtual.participantes.g1.push(nome);
        setState(estadoAtual);
        inputG1.value = "";
        avisoG1.textContent = "";
        atualizarTela();
    };

    btnAddG2.onclick = () => {
        const nome = inputG2.value.trim();
        if (!nome) return;

        const estadoAtual = getState();
        if (estadoAtual.participantes.g2.length >= LIMITE_PARTICIPANTES) {
            avisoG2.textContent = `Limite de ${LIMITE_PARTICIPANTES} participantes atingido.`;
            return;
        }

        estadoAtual.participantes.g2.push(nome);
        setState(estadoAtual);
        inputG2.value = "";
        avisoG2.textContent = "";
        atualizarTela();
    };

    atualizarTela();
    return container;
};
