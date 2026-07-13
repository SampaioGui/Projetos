export default () => {

    const container = document.createElement("div");
    container.setAttribute("id", "espera");

    const template = `
    <h1 class=" titulo">Tela de Espera</h1>
    <div id="tela-espera-subt-btn">
        <h2 class="subtitulo">Entregue o dispositivo para <br> o próximo grupo e aguarde.</h2>
        <a href="/#frasesF1G2" id="btn-ok">Ok</a>
    </div>
    `;

    container.innerHTML = template;

    return container;



    function irParaProximoTurno() {
        const fase = window.jogo.faseAtual;
        const grupo = window.jogo.grupoAtual;

        window.location.hash = `#fase-${fase}-g${grupo}`;

    }
}
