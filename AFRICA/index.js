import home from "./pages/home/index.js";
import grupo from "./pages/grupo/index.js";
import participantes from "./pages/participantes/index.js";
import configuracao from "./pages/configuracao/index.js";
import frasesF1G1 from "./pages/frasesF1G1/index.js";
import frasesF1G2 from "./pages/frasesF1G2/index.js";
import espera from "./pages/espera/index.js";
import esperaF1F2 from "./pages/esperaF1F2/index.js";
import esperaF2F3 from "./pages/esperaF2F3/index.js";
import inicioFase1 from "./pages/inicioFase1/index.js";
import fase1G1 from "./pages/Fase1G1/index.js";
import fase1G2 from "./pages/fase1G2/index.js";
import fase2G1 from "./pages/fase2G1/index.js";
import fase2G2 from "./pages/fase2G2/index.js";
import fase3G1 from "./pages/fase3G1/index.js";
import fase3G2 from "./pages/fase3G2/index.js";
import esperaTurno from "./pages/esperaTurno/index.js";
import final from "./pages/final/index.js";
import { initState } from "./state.js";

const main = document.querySelector("#root");

const routes = {
    "#home": home,
    "#grupo": grupo,
    "#participantes": participantes,
    "#tela-configuracao": configuracao,
    "#frasesF1G1": frasesF1G1,
    "#frasesF1G2": frasesF1G2,
    "#espera": espera,
    "#inicio-Fase-1": inicioFase1,
    "#fase-1-g1": fase1G1,
    "#fase-1-g2": fase1G2,
    "#espera-turno": esperaTurno,
    "#espera-f1-f2": esperaF1F2,
    "#fase-2-g1": fase2G1,
    "#fase-2-g2": fase2G2,
    "#espera-f2-f3": esperaF2F3,
    "#fase-3-g1": fase3G1,
    "#fase-3-g2": fase3G2,
    "#final": final
};

const enterFS = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>`
const exitFS = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path></svg>`

function router() {
    console.log("ROUTER EXECUTOU", Date.now());

    const hash = window.location.hash || "#home";
    const page = routes[hash] || home;

    main.innerHTML = "";

    const pageEl = page();
    pageEl.classList.add("page");

    console.log("CLASSES:", pageEl.className);

    main.appendChild(pageEl);

    requestAnimationFrame(() => {
        pageEl.classList.add("show");
        console.log("SHOW ADICIONADO");
    });
}

export function aviso(msg, tempo = 7000) {
    const div = document.createElement("div");
    div.className = "toast";
    div.textContent = msg;

    document.body.appendChild(div);

    setTimeout(() => {
        div.classList.add("hide");
        setTimeout(() => div.remove(), 300);
    }, tempo);
}


function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.error("Erro ao entrar em tela cheia:", err);
        });
    } else {
        document.exitFullscreen();
    }
}

export function setupFullscreenButton(btn) {
    const updateIcon = () => {
        if (document.fullscreenElement) {
            btn.innerHTML = exitFS; // sair do fullscreen
            btn.setAttribute("aria-label", "Sair da tela cheia");
        } else {
            btn.innerHTML = enterFS; // entrar em fullscreen
            btn.setAttribute("aria-label", "Tela cheia");
        }
    };

    // Atualiza ao clicar
    btn.addEventListener("click", toggleFullscreen);

    // Atualiza se o usuário sair com ESC, gesto, etc.
    document.addEventListener("fullscreenchange", updateIcon);

    // Estado inicial
    updateIcon();
}



const btnFullscreen = document.querySelector("#btn-fullscreen");

if (btnFullscreen) {
    setupFullscreenButton(btnFullscreen);
}



window.addEventListener("load", () => {
    initState();

    if (!window.location.hash) {
        window.location.hash = "#home";
    }

    router();

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("/sw.js")
            .then(() => {
                console.log("Service Worker registrado com sucesso");
            })
            .catch(err => {
                console.error("Erro ao registrar o Service Worker:", err);
            });
        navigator.serviceWorker.getRegistrations().then(regs => {
            regs.forEach(reg => reg.unregister());
        });
    }

});

window.addEventListener("hashchange", router);
