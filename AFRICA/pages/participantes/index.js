export default () => {

    const container = document.createElement("div");
    container.setAttribute("id", "tela-participantes");

    const nomeGrupo1 = window.estadoJogo.nomeGrupo1 || "Grupo 1";
    const nomeGrupo2 = window.estadoJogo.nomeGrupo2 || "Grupo 2";

    const LIMITE_PARTICIPANTES = 10;
    const MAX_COLUNA = 5;

    const template = `
    <h1 class=" titulo-participantes">Participantes</h1>
    <p class="subtitulo">Digite os nomes dos participantes <br> de cada grupo</p>
    
    <div class="input-part-container">
        <h2 class="nome-grupoTP">${nomeGrupo1}</h2>
    
        <div class="input-participantes-container">
            <input class="input-participantes" type="text" id="input-grupo1" placeholder="Nome do participante">
            <button class="btn-ok" id="btn-add-grupo1">⟶</button>
        </div>
    </div>


    <div class="grupo">
            <div class="listas">
                <ul id="lista-grupo1-col1"></ul>
                <ul id="lista-grupo1-col2"></ul>
            </div>
    </div>

    <p class="aviso-limite"></p>

    <div class="input-part-container">
        <h2 class="nome-grupoTP">${nomeGrupo2}</h2>
    
        <div class="input-participantes-container">
            <input class="input-participantes" type="text" id="input-grupo2" placeholder="Nome do participante">
            <button class="btn-ok" id="btn-add-grupo2">⟶</button>
        </div>
    </div>


    <div class="grupo">    
        <div class="listas">
                <ul id="lista-grupo2-col1"></ul>
                <ul id="lista-grupo2-col2"></ul>
        </div>
    
    </div>
    <p id="aviso-limite2"></p>

    <a href="/#">Continuar</a>
    
    `;

    container.innerHTML = template;

    const input1 = container.querySelector("#input-grupo1");
    const input2 = container.querySelector("#input-grupo2");

    const btn1 = container.querySelector("#btn-add-grupo1");
    const btn2 = container.querySelector("#btn-add-grupo2");

    const lista1Col1 = container.querySelector("#lista-grupo1-col1");
    const lista1Col2 = container.querySelector("#lista-grupo1-col2");
    const lista2Col1 = container.querySelector("#lista-grupo2-col1");
    const lista2Col2 = container.querySelector("#lista-grupo2-col2");

    var avisoLimite = container.querySelector(".aviso-limite");
    var avisoLimite2 = container.querySelector("#aviso-limite2");


    const participantesG1 = window.participantes.participantesGrupo1;
    const participantesG2 = window.participantes.participantesGrupo2;

    function renderLista(participantes, col1, col2) {
        col1.innerHTML = "";
        col2.innerHTML = "";

        participantes.forEach((nome, index) => {
            const li = document.createElement("li");
            li.textContent = nome;

            const btnRemover = document.createElement("button");
            btnRemover.setAttribute("class", "btn-remover");
            btnRemover.textContent = "❌";
            btnRemover.style.marginLeft = "10px";
            btnRemover.addEventListener("click", () => {
                if (participantesG1.length <= LIMITE_PARTICIPANTES
                    || participantesG2.length <= LIMITE_PARTICIPANTES
                ) {
                    avisoLimite.textContent = "";
                    avisoLimite2.textContent = "";
                }
                participantes.splice(index, 1);
                renderLista(participantes, col1, col2);
            });

            li.appendChild(btnRemover);

            if (index < MAX_COLUNA) {
                col1.appendChild(li);
            } else {
                col2.appendChild(li);
            }
        });
    }

    btn1.addEventListener("click", () => {
        const nome = input1.value.trim();
        if (nome) {
            if (participantesG1.length >= LIMITE_PARTICIPANTES) {
                avisoLimite.textContent = `O grupo ${nomeGrupo1} já atingiu o limite de ${LIMITE_PARTICIPANTES} participantes.`;
                input1.value = "";
                return;
            }
            participantesG1.push(nome);
            renderLista(participantesG1, lista1Col1, lista1Col2);
            input1.value = "";
        }
    });

    btn2.addEventListener("click", () => {
        const nome = input2.value.trim();
        if (nome) {
            if (participantesG2.length >= LIMITE_PARTICIPANTES) {
                avisoLimite2.textContent = `O grupo ${nomeGrupo2} já atingiu o limite de ${LIMITE_PARTICIPANTES} participantes.`;
                input2.value = "";
                return;
            }
            participantesG2.push(nome);
            renderLista(participantesG2, lista2Col1, lista2Col2);
            input2.value = "";
        }
    });

    renderLista(participantesG1, lista1Col1, lista1Col2);
    renderLista(participantesG2, lista2Col1, lista2Col2);

    return container;


}