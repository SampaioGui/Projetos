export default () => {

    const container = document.createElement("div");
    container.setAttribute("id", "tela-inicial");

    const template = `
    <h1 class=" titulo">Bem vindo</h1>
    <a href="/#grupo">Iniciar Jogo</a>
    `;

    container.innerHTML = template;

    return container;


}

//