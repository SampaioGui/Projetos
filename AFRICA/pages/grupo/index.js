



export default () => {

    const container = document.createElement("div");
    container.setAttribute("id", "tela-grupo");


    const template = `
        <h1 class="titulo">Digite o nome dos grupos</h1>
        <div class="input-ok">
        <input class="inputGrupo" type="text" id="nome-grupo1" placeholder="Nome do grupo 1">
        <button class="btn-ok"  id="btn-enviar">Ok</button>
        </div>
        <p id="resultado"></p>

        <div class="input-ok">
        <input type="text" class="inputGrupo" id="nome-grupo2" placeholder="Nome do grupo 2">
        <button class="btn-ok" id="btn-enviar2">Ok</button>
        </div>
        <p id="resultado2"></p>

        <a href="/#" id="btn-continuar">Continuar</a>
        
    `;




    container.innerHTML = template;

    const input = container.querySelector("#nome-grupo1");
    const input2 = container.querySelector("#nome-grupo2");
    const btn = container.querySelector("#btn-enviar");
    const btn2 = container.querySelector("#btn-enviar2");
    const resultado = container.querySelector("#resultado");
    const resultado2 = container.querySelector("#resultado2");
    var btn_continuar = container.querySelector("#btn-continuar");


    btn.addEventListener("click", () => {
        const nome = input.value.trim();
        if (nome === "") {
            resultado.textContent = "Digite um nome primeiro!";
        } else {
            resultado.textContent = `O nome do grupo é: ${nome}`;
            window.estadoJogo.nomeGrupo1 = input.value.trim();
        }
    });

    btn2.addEventListener("click", () => {
        const nome = input2.value.trim();
        if (nome === "") {
            resultado2.textContent = "Digite um nome primeiro!";
            btn_continuar.setAttribute("href", "/#grupo");

        } else {
            resultado2.textContent = `O nome do grupo é: ${nome}`;
            window.estadoJogo.nomeGrupo2 = input2.value.trim();
            btn_continuar.setAttribute("href", "/#participantes");
        }
    });

    if (input.value === "" || input2.value === "") {
        btn_continuar.setAttribute("href", "/#grupo");
    } else {
        btn_continuar.setAttribute("href", "/#participantes");
    }


    return container;


}