import home from "./pages/home/index.js";
import grupo from "./pages/grupo/index.js";
import participantes from "./pages/participantes/index.js";


const main = document.querySelector("#root");


window.estadoJogo = {
    nomeGrupo1: "",
    nomeGrupo2: "",
};

window.participantes = {
    participantesGrupo1: [],
    participantesGrupo2: [],
}


const init = () => {
    window.addEventListener("hashchange", () => {
        main.innerHTML = "";

        switch (window.location.hash) {
            case " ":
                main.appendChild(home());
                break;
            case "#grupo":
                main.appendChild(grupo());
                break;
            case "#participantes":
                main.appendChild(participantes());
                break;
            default:
                main.appendChild(home());
                break;
        }

    })

}

window.addEventListener("load", () => {
    main.appendChild(home());
    init();
})