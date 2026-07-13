import { getState, setState } from "../../state.js";
import { aviso } from "../../index.js";


export default () => {

    const container = document.createElement("div");
    container.setAttribute("id", "frasesF1G1");

    const estado = getState();

    const template = `
        <div class="container-frases">
            <h1 class="titulo">Frases</h1>
            <p class="subtitulo">Digite as frases no espaço abaixo</p>

            <div class="input-frases-container">
                <h1 class="nome-grupoTP">${estado.grupos.nome1}</h1>
                <input
                    class="input-participantes"
                    type="text"
                    id="input-frases"
                    placeholder="Ex: Fluminense é GIGANTE"
                >
            </div>
        </div>

        <button class="btn-ok" id="btn-add-grupo1">Adicionar</button>
        <p class="txt-confirmacao" id="confirmar-frases"></p>
    `;

    container.innerHTML = template;

    const btnAdd = container.querySelector("#btn-add-grupo1");
    const inputFrases = container.querySelector("#input-frases");
    const confirmar = container.querySelector("#confirmar-frases");

    /* ---------- CÁLCULO DE LIMITE ---------- */

    const totalFrasesGrupo1 =
        estado.participantes.g1.length *
        estado.config.frasesPorPessoa;

    /* ---------- EVENTO ---------- */

    btnAdd.addEventListener("click", () => {
        const frase = inputFrases.value.trim();

        if (!frase) {
            confirmar.style.color = "rgb(255, 0, 0)";
            confirmar.textContent = "Digite uma frase válida!";
            return;
        }

        const estado = getState();

        estado.pote.fase1.push(frase);
        estado.pote.fase2.push(frase);
        estado.pote.fase3.push(frase);

        setState(estado);

        inputFrases.value = "";

        confirmar.style.color = "rgb(3, 233, 23)";
        confirmar.textContent = "Frase adicionada com sucesso!";

        setTimeout(() => confirmar.textContent = "", 2000);


        verificarFim();
    });

    /* ---------- CONTROLE DE FLUXO ---------- */

    function verificarFim() {
        const estado = getState();

        const total = estado.pote.fase1.length;
        const porPessoa = Number(estado.config.frasesPorPessoa);

        if (!porPessoa || porPessoa <= 0) return;

        // 🚨 alerta SOMENTE se ainda não acabou o grupo
        if (
            total > 0 &&
            total % porPessoa === 0 &&
            total < totalFrasesGrupo1
        ) {
            aviso(`✅ ${total} frases adicionadas.
Passe o dispositivo para o próximo jogador.`), 5000;
            return;
        }

        // fim do grupo
        if (total >= totalFrasesGrupo1) {
            window.location.hash = "#espera";
        }
    }







    return container;
};
