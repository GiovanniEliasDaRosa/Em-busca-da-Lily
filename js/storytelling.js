const story = document.querySelector("#story");
const bubble = document.querySelector("#bubble");
const bubbletText = document.querySelector("#bubble__text");
const story__continue = document.querySelector("#story__continue");
const story__jump = document.querySelector("#story__jump");

const story__principal = document.querySelector("#story__principal");
const story__secundario = document.querySelector("#story__secundario");

var typewritter = "";
var currentPoint = 0;
var part = 0;
var telling = false;

const Dialogs = [
  {
    title: "Parte 1",
    text: [
      ["Olá, pode me ajudar? Eu me chamo Brad e minha irmã foi sequestrada!", "left"],
      ["Me disseram que eu não posso chamar a polícia, então tem que ser você!", "left"],
      ["Ela se chama Lily e é minha irmã mais nova.", "left"],
      ["O que aconteceu? Ok, eu te conto!", "left"],
      [
        "Minha família sempre foi muito pobre e quando minha irmã nasceu, o nosso pai acabou indo embora.",
        "left",
      ],
      ["Nossa mãe teve que se virar para nos alimentar.", "left"],
      [
        "E ela conseguiu muito bem, mas a alguns dias nossa mãe foi diagnosticada com uma doença terrível.",
        "left",
      ],
      [
        "Cosmopólito de Savedra Vicinal, a doença é tão rara que quem ouvir o nome vai achar que é inventada.",
        "left",
      ],
      [
        "Enfim, ela foi internada as pressas e sua única esperança era uma injeção muito cara e que ainda estava em fase de testes.",
        "left",
      ],
      ["Tomado pelo medo, fui até um agiota muito famoso e temido para pedir o dinheiro.", "left"],
      ["Depois de muito negociar acabei conseguindo e comprei a injeção.", "left"],
      [
        "Nossa mãe começou a se recuperar mas de repente ela acabou piorando, e piorou tanto que acabou não resistindo...",
        "left",
      ],
      ["Como a injeção era muito cara, não consegui pagar o agiota.", "left"],
      [
        "Então ele sequestrou a minha irmã e agora eu preciso da sua ajuda pra recuperá-la.",
        "left",
      ],
      ["Então você vai me ajudar? MUITO OBRIGADO...", "left"],
      ["Vamos lá, não sei onde o agiota está, mas conheço alguém que sabe!", "left"],
      ["Oh não, um capanga do Sr Malcon, o agiota", "left"],
      ["Vamos ter que passar por ele!", "left"],
    ],
    images: [
      ["imgs/personagens/principal/Scared.png", ""],
      ["imgs/personagens/principal/Talking.png", ""],
      ["imgs/personagens/principal/Talking.png", ""],
      ["imgs/personagens/principal/Sad.png", ""],
      ["imgs/personagens/principal/Talking.png", ""],
      ["imgs/personagens/principal/Talking.png", ""],
      ["imgs/personagens/principal/Sad.png", ""],
      ["imgs/personagens/principal/Talking.png", ""],
      ["imgs/personagens/principal/Talking.png", ""],
      ["imgs/personagens/principal/Talking.png", ""],
      ["imgs/personagens/principal/Talking.png", ""],
      ["imgs/personagens/principal/Sad.png", ""],
      ["imgs/personagens/principal/Talking.png", ""],
      ["imgs/personagens/principal/Talking.png", ""],
      ["imgs/personagens/principal/Happy.png", ""],
      ["imgs/personagens/principal/Happy.png", ""],
      ["imgs/personagens/principal/Scared.png", ""],
      ["imgs/personagens/principal/Talking.png", ""],
    ],
    background: [
      "imgs/fundos/fundoCasa.jpg",
      "imgs/fundos/fundoCasa.jpg",
      "imgs/fundos/fundoCasa.jpg",
      "imgs/fundos/fundoCasa.jpg",
      "imgs/fundos/fundoCasa.jpg",
      "imgs/fundos/fundoCasa.jpg",
      "imgs/fundos/fundoCasa.jpg",
      "imgs/fundos/fundoCasa.jpg",
      "imgs/fundos/fundoCasa.jpg",
      "imgs/fundos/fundoCasa.jpg",
      "imgs/fundos/fundoCasa.jpg",
      "imgs/fundos/fundoCasa.jpg",
      "imgs/fundos/fundoCasa.jpg",
      "imgs/fundos/fundoCasa.jpg",
      "imgs/fundos/fundoCasa.jpg",
      "imgs/fundos/fundoCasa.jpg",
      "imgs/fundos/fundoCasa.jpg",
      "imgs/fundos/fundoCasa.jpg",
    ],
  },
  {
    title: "Parte 2",
    text: [
      ["Chegamos!", "left"],
      ["Que lugar é esse? É obvio pô, um bar", "left"],
      [
        "Ninguem conhece mais uma cidade do que um barman, ele com certeza sabe onde esta a Lily",
        "left",
      ],
      [
        "Uhh, já é de manhâ? Hm... Melhor eu voltar pra dentro se não os dois dragões ovelhas com chifre de galinha vão me comer...",
        "right",
      ],
      ["Dragões ovelhas com chifre de galinha? O cara ta muito doido", "left"],
      [
        "Ow, o que foi que você disse? Me chamou de doido? Vem cá que eu te mostro quem é doido",
        "right",
      ],
    ],
    images: [
      ["imgs/personagens/principal/Talking.png", ""],
      ["imgs/personagens/principal/Talking.png", "imgs/personagens/enemy_1/Idle.png"],
      ["imgs/personagens/principal/Talking.png", "imgs/personagens/enemy_1/Idle.png"],
      ["imgs/personagens/principal/Scared.png", "imgs/personagens/enemy_1/StrongAttack.png"],
      ["imgs/personagens/principal/Talking.png", "imgs/personagens/enemy_1/Idle.png"],
      ["imgs/personagens/principal/Talking.png", "imgs/personagens/enemy_1/LightAttack.png"],
    ],
    background: [
      "imgs/fundos/fundoCasa.jpg",
      "imgs/fundos/fundoCasa.jpg",
      "imgs/fundos/fundoCasa.jpg",
      "imgs/fundos/fundoCasa.jpg",
      "imgs/fundos/fundoCasa.jpg",
      "imgs/fundos/fundoCasa.jpg",
    ],
  },
  {
    title: "Parte 3",
    text: [["Parabéns você finalizou este jogo!", "left"]],
    images: [["imgs/personagens/principal/Happy.png", ""]],
    background: ["imgs/fundos/fundoCasa.jpg"],
  },
];

bubbletText.innerHTML = "";

// Dialogs[part].title;

clearInterval(typewritter);

function Type() {
  musicVolume = 0.3;
  music.volume = musicVolume;
  var pos = 0;

  var selectedText = Dialogs[part].text[currentPoint][0];
  var whoisspeaking = Dialogs[part].text[currentPoint][1];
  var selectedImages = Dialogs[part].images[currentPoint];
  story__principal.src = selectedImages[0];
  story__secundario.src = selectedImages[1];

  if (Dialogs[part].images[currentPoint][1] == "") {
    story__secundario.setAttribute("no-iamge", "");
  } else {
    story__secundario.removeAttribute("no-iamge", "");
  }

  var background = Dialogs[part].background[currentPoint];
  story.style = `background: url(${background}) no-repeat;`;

  bubbletText.innerHTML = "";

  if (part == Dialogs.length - 1) {
    ButtonDisable(story__continue);
    ButtonDisable(story__jump);
    setTimeout(() => {
      ShowCredits();
    }, 5000);
  }

  clearInterval(typewritter);
  typewritter = setInterval(() => {
    if (pos == selectedText.length) {
      currentPoint++;
      telling = false;
      musicVolume = 0.5;
      music.volume = musicVolume;
      clearInterval(typewritter);
      return;
    }

    if (whoisspeaking == "right") {
      bubble.classList.add("bubble-right");
      bubble.classList.remove("bubble-left");
    } else {
      bubble.classList.add("bubble-left");
      bubble.classList.remove("bubble-right");
    }

    bubbletText.innerHTML += selectedText[pos];
    pos++;
    telling = true;
    PlaySound("Footstep.wav", 1);
  }, 60);
}

story__continue.addEventListener("click", () => {
  if (telling) {
    clearInterval(typewritter);
    bubbletText.innerHTML = Dialogs[part].text[currentPoint][0];
    telling = false;
    currentPoint++;
    musicVolume = 0.5;
    music.volume = musicVolume;
  } else {
    if (Dialogs[part].text.length != currentPoint) {
      Type();
      return;
    }
    NextPartOfHistory();
  }
});

story__jump.addEventListener("click", () => {
  clearInterval(typewritter);
  telling = false;
  currentPoint = Dialogs[part].text.length;
  musicVolume = 0.5;
  music.volume = musicVolume;
  NextPartOfHistory();
});

function NextPartOfHistory() {
  part++;
  currentPoint = 0;
  Fight();
}

// setTimeout(() => {
//   // Fight
//   currentPoint = Dialogs[part].text.length;
//   part = 2;
//   currentPoint = 0;
//   Fight();
// }, 10);
