import { getState, setState } from "../../state.js";
import { aviso } from "../../index.js";



export default () => {

    const container = document.createElement("div");
    container.setAttribute("id", "frasesF1G2");

    const estado = getState();

    const template = `
        <div class="container-frases">
            <h1 class="titulo">Frases</h1>
            <p class="subtitulo">Digite as frases no espaço abaixo</p>

            <div class="input-frases-container">
                <h1 class="nome-grupoTP">${estado.grupos.nome2}</h1>
                <input
                    class="input-participantes"
                    type="text"
                    id="input-frases"
                    placeholder="Ex: Fluminense é GIGANTE"
                >
            </div>
        </div>

        <button class="btn-ok" id="btn-add-grupo2">Adicionar</button>
        <p class="txt-confirmacao" id="confirmar-frases"></p>
    `;

    container.innerHTML = template;

    const btnAdd = container.querySelector("#btn-add-grupo2");
    const inputFrases = container.querySelector("#input-frases");
    const confirmar = container.querySelector("#confirmar-frases");

    /* ---------- LIMITES ---------- */

    const totalFrasesGrupo2 =
        estado.participantes.g2.length *
        estado.config.frasesPorPessoa;

    const inicioGrupo2 = estado.pote.fase1.length


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

        const totalAtual = estado.pote.fase1.length - inicioGrupo2;
        const porPessoa = Number(estado.config.frasesPorPessoa);

        if (!porPessoa || porPessoa <= 0) return;

        // alerta a cada troca de jogador
        if (
            totalAtual > 0 &&
            totalAtual % porPessoa === 0 &&
            totalAtual < totalFrasesGrupo2
        ) {
            aviso(`✅ ${totalAtual} frases adicionadas.
Passe o dispositivo para o próximo jogador.`), 5000;
            return;
        }

        // fim do grupo 2
        if (totalAtual >= totalFrasesGrupo2) {
            window.location.hash = "#inicio-Fase-1";
        }
    }


    return container;
};
