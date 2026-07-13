export default () => {

    const container = document.createElement("div");
    container.setAttribute("id", "espera-f1-f2");

    const template = `
    <h1 class=" titulo">Fase 2 - Mímica</h1>
    <div id="tela-espera-subt-btn">
        <h2 class="subtitulo" id="subt-fase2">Nesta fase, um jogador do grupo da vez deverá representar a frase sorteada apenas<br> 
        com gestos e expressões corporais, sem falar, escrever ou fazer sons.<br>
        <br>Os demais integrantes do grupo podem tentar adivinhar livremente, <br>
        dizendo palavras ou frases em voz alta.<br><br><br>
        </h2>
        <a href="/#fase-2-g1" id="btn-ok">Ok</a>
    </div>
    `;

    container.innerHTML = template;

    return container;


}
