export default () => {

    const container = document.createElement("div");
    container.setAttribute("id", "espera-f2-f3");

    const template = `
    <h1 class=" titulo">Fase 3 - Termo</h1>
    <div id="tela-espera-subt-btn">
        <h2 class="subtitulo" id="subt-fase2">O jogador deve dizer apenas uma palavra para ajudar seu grupo a adivinhar<br> 
        a frase sorteada.<br>
        <br>Não é permitido usar nenhuma palavra que faça parte da frase.<br>
        <br>Escolha bem o termo, pois ele é a única pista disponível para o grupo.<br><br><br>
        </h2>
        <a href="/#fase-3-g1" id="btn-ok">Ok</a>
    </div>
    `;

    container.innerHTML = template;

    return container;


}
