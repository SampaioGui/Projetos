import { getState, setState } from "../../state.js";
const LIMITE_CARACTERES = 18;
export default () => {

    const container = document.createElement("div");
    container.setAttribute("id", "tela-grupo");

    const template = `
        <h1 class="titulo">Digite o nome <br>dos grupos</h1>

        <div class="input-ok">
            <input class="inputGrupo" type="text" id="nome-grupo1" placeholder="Nome do grupo 1" maxlength = "${LIMITE_CARACTERES}">
            <button class="btn-ok" id="btn-enviar">Ok</button>
        </div>
        <p id="resultado" class="txt-confirmacao"></p>

        <div class="input-ok">
            <input type="text" class="inputGrupo" id="nome-grupo2" placeholder="Nome do grupo 2" maxlength = "${LIMITE_CARACTERES}">
            <button class="btn-ok" id="btn-enviar2">Ok</button>
        </div>
        <p id="resultado2" class="txt-confirmacao"></p>

        <a href="#grupo" id="btn-continuar">Continuar</a>
    `;

    container.innerHTML = template;




    const input1 = container.querySelector("#nome-grupo1");
    const input2 = container.querySelector("#nome-grupo2");

    const btn1 = container.querySelector("#btn-enviar");
    const btn2 = container.querySelector("#btn-enviar2");

    const resultado1 = container.querySelector("#resultado");
    const resultado2 = container.querySelector("#resultado2");

    const btnContinuar = container.querySelector("#btn-continuar");


    /* ---------- CARREGA ESTADO SALVO ---------- */

    const estado = getState();

    if (estado.grupos.nome1) {
        input1.value = estado.grupos.nome1;
        resultado1.textContent = `O nome do grupo é: ${estado.grupos.nome1}`;
        resultado1.style.color = "rgb(3, 233, 23)";
    }

    if (estado.grupos.nome2) {
        input2.value = estado.grupos.nome2;
        resultado2.textContent = `O nome do grupo é: ${estado.grupos.nome2}`;
        resultado2.style.color = "rgb(3, 233, 23)";
        btnContinuar.href = "#participantes";
    }

    /* ---------- EVENTOS ---------- */

    btn1.addEventListener("click", () => {
        const nome = input1.value.trim();

        if (!nome) {
            resultado1.style.color = "rgb(255,0,0)";
            resultado1.textContent = "Digite um nome primeiro!";
            return;
        }



        if (nome.length > LIMITE_CARACTERES) {
            btnContinuar.href = "#grupo";
            resultado1.textContent = "Limite de caracteres atingido!";
            resultado1.style.color = "rgb(255,0,0)";
            return;
        }

        const estado = getState();
        estado.grupos.nome1 = nome;
        setState(estado);

        resultado1.style.color = "rgb(3, 233, 23)";
        resultado1.textContent = `O nome do grupo é: ${nome}`;
        atualizaContinuar();
    });

    btn2.addEventListener("click", () => {
        const nome = input2.value.trim();

        if (!nome) {
            resultado2.style.color = "rgb(255,0,0)";
            resultado2.textContent = "Digite um nome primeiro!";
            btnContinuar.href = "#grupo";
            return;
        }



        if (nome.length > LIMITE_CARACTERES) {
            btnContinuar.href = "#grupo";
            resultado2.textContent = "Limite de caracteres atingido!";
            resultado2.style.color = "rgb(255,0,0)";
            return;
        }

        const estado = getState();
        estado.grupos.nome2 = nome;
        setState(estado);

        resultado2.style.color = "rgb(3, 233, 23)";
        resultado2.textContent = `O nome do grupo é: ${nome}`;
        atualizaContinuar();
    });
    atualizaContinuar();


    function atualizaContinuar() {
        const estado = getState();
        if (estado.grupos.nome1 && estado.grupos.nome2) {
            btnContinuar.href = "#participantes";
        } else {
            btnContinuar.href = "#grupo";
        }
    }

    return container;
};
