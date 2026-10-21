# 🎮 AFRICA — Jogo de Grupos

O **AFRICA** é um jogo de adivinhação de frases desenvolvido com HTML, CSS e JavaScript, no qual dois grupos competem para acertar o maior número de frases dentro de um tempo determinado.

O jogo permite personalizar os nomes dos grupos, cadastrar participantes, definir a quantidade de frases por pessoa e configurar a duração de cada rodada. A aplicação foi desenvolvida com foco em simplicidade, interação e utilização em dispositivos móveis.

## ✨ Funcionalidades

- 👥 **Grupos personalizados:** definição dos nomes dos dois grupos.
- 🧑‍🤝‍🧑 **Cadastro de participantes:** adição e remoção de participantes, com limite de 10 pessoas por grupo.
- ⚙️ **Configuração da partida:** escolha da quantidade de frases por pessoa, com limite de 10 frases.
- 📝 **Frases personalizadas:** cadastro de frases para serem utilizadas durante o jogo.
- ⏱️ **Cronômetro por rodada:** opções de 60, 90 ou 120 segundos.
- 🔄 **Alternância de turnos:** troca entre os grupos durante a partida.
- 🏆 **Sistema de pontuação:** contabilização dos acertos e exibição do resultado final.
- 🔊 **Alerta sonoro:** aviso próximo ao encerramento da rodada.
- 📱 **Interface responsiva:** adaptação para dispositivos móveis e computadores.
- 🔲 **Modo de tela cheia:** experiência mais imersiva durante as partidas.
- 💾 **Persistência de estado:** utilização do `sessionStorage` para preservar os dados da partida durante a navegação.
- 📲 **PWA (Progressive Web App):** suporte à instalação como aplicativo e ao funcionamento offline, conforme a configuração do Service Worker e dos recursos armazenados em cache.

## 🛠️ Tecnologias utilizadas

- **HTML5** — estrutura das páginas.
- **CSS3** — estilização, responsividade e animações.
- **JavaScript (ES Modules)** — lógica do jogo, eventos e navegação entre telas.
- **Session Storage** — persistência temporária dos dados da partida.
- **Service Worker** — cache de recursos e suporte ao funcionamento offline.
- **Web App Manifest** — configuração da instalação como aplicativo.
- **Fullscreen API** — controle do modo de tela cheia.

## 🚀 Como executar o projeto

### 1. Clone o repositório

```bash
git clone URL_DO_SEU_REPOSITORIO
```

Substitua `URL_DO_SEU_REPOSITORIO` pelo endereço do repositório no GitHub.

### 2. Acesse a pasta do projeto

```bash
cd nome-da-pasta
```

### 3. Execute a aplicação

Como o projeto utiliza módulos JavaScript, recomenda-se executá-lo por meio de um servidor HTTP local.

Uma opção simples é utilizar a extensão **Live Server** no Visual Studio Code:

1. Abra a pasta do projeto no VS Code.
2. Instale a extensão Live Server, caso ainda não esteja instalada.
3. Clique com o botão direito no arquivo `index.html`.
4. Selecione **Open with Live Server**.

O jogo será aberto no navegador.

> **Observação:** para testar a instalação como PWA e o funcionamento do Service Worker, utilize um ambiente compatível, como HTTPS ou `localhost`.

## 📂 Estrutura do projeto

```text
/
├── assets/
│   └── sounds/
├── img/
├── pages/
│   ├── home/
│   ├── grupo/
│   ├── participantes/
│   ├── configuracao/
│   ├── frasesF1G1/
│   ├── frasesF1G2/
│   ├── inicioFase1/
│   ├── Fase1G1/
│   ├── fase1G2/
│   ├── fase2G1/
│   ├── fase2G2/
│   ├── fase3G1/
│   ├── fase3G2/
│   ├── espera/
│   ├── esperaF1F2/
│   ├── esperaF2F3/
│   ├── esperaTurno/
│   └── final/
├── index.html
├── index.js
├── state.js
├── styles.css
├── manifest.json
├── sw.js
└── README.md
```

## 🎯 Como jogar

1. Abra o jogo e selecione **Iniciar Jogo**.
2. Defina o nome dos dois grupos.
3. Cadastre os participantes de cada grupo.
4. Configure a quantidade de frases por pessoa e o tempo de cada rodada.
5. Cada participante cadastra suas frases, passando o dispositivo para o próximo quando solicitado.
6. Durante as rodadas, os jogadores tentam acertar as frases dentro do tempo disponível.
7. Utilize os botões **PASSA** e **ACERTOU** para controlar as frases.
8. Os grupos alternam os turnos até o encerramento das fases.
9. Ao final, confira a pontuação e descubra o grupo vencedor.

## 📱 Instalação como aplicativo

O projeto possui suporte a **Progressive Web App (PWA)**, permitindo sua instalação em dispositivos compatíveis.

Para utilizar esse recurso:

1. Hospede o projeto em um servidor HTTPS.
2. Acesse o endereço pelo navegador compatível.
3. Utilize a opção de instalação ou adição à tela inicial, quando disponível.

O funcionamento offline depende dos recursos incluídos no cache do Service Worker.

## 🧠 Objetivos do projeto

Este projeto foi desenvolvido para praticar conceitos de desenvolvimento web, incluindo:

- Manipulação do DOM.
- Modularização com JavaScript ES Modules.
- Gerenciamento de estado da aplicação.
- Navegação entre telas utilizando rotas baseadas em hash.
- Manipulação de eventos.
- Temporizadores com `setInterval`.
- Armazenamento de dados no navegador.
- Design responsivo.
- Recursos de Progressive Web Apps.


## 👨‍💻 Autor
- Guilherme S. B. Santana

Desenvolvido como projeto de estudo e prática de desenvolvimento web.

---

**Tecnologias:** HTML5 · CSS3 · JavaScript · PWA
