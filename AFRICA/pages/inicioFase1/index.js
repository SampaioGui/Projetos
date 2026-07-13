export default () => {

    const container = document.createElement("div");
    container.setAttribute("id", "inicio-Fase-1");

    const template = `
    <h1 class=" titulo">Fase 1 - Código</h1>
    <h2 class = "subtitulo" id="subt-fase1">Nesta fase, um jogador deve fazer seu grupo adivinhar a frase exibida na tela.<br>
    <br>Ele pode falar livremente, usando qualquer palavra ou expressão, EXCETO as palavras que compõem a frase.<br>
    <br>Não é permitido soletrar, traduzir, usar sinônimos diretos ou qualquer variação das palavras proibidas.<br>
    <br>O grupo deve adivinhar corretamente antes que o tempo termine para pontuar.</h2>

    <a href="/#fase-1-g1" id="btn-iniciar">Iniciar</a>
    `;

    container.innerHTML = template;

    const btnIniciar = container.querySelector("#btn-iniciar");
    btnIniciar.addEventListener("click", () => {
        somAlarme.play().then(() => {
            somAlarme.pause();
            somAlarme.currentTime = 0;
        });
    });

    return container;


}