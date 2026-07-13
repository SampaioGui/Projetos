const STATE_KEY = "estadoJogo";

/* Inicializa o estado apenas uma vez */
export function initState() {
    if (!sessionStorage.getItem(STATE_KEY)) {
        const estadoInicial = {
            fase: {
                atual: 1,
                grupoAtual: 1,
                ativa: true
            },

            grupos: {
                nome1: "",
                nome2: ""
            },

            participantes: {
                g1: [],
                g2: []
            },

            config: {
                frasesPorPessoa: 0,
                tempoRodada: 0
            },

            pontuacao: {
                g1: 0,
                g2: 0
            },

            pote: {
                fase1: [],
                fase2: [],
                fase3: []
            }
        };

        sessionStorage.setItem(
            STATE_KEY,
            JSON.stringify(estadoInicial)
        );
    }
}

/* Leitura */
export function getState() {
    return JSON.parse(sessionStorage.getItem(STATE_KEY));
}

/* Escrita */
export function setState(novoEstado) {
    sessionStorage.setItem(
        STATE_KEY,
        JSON.stringify(novoEstado)
    );
}
