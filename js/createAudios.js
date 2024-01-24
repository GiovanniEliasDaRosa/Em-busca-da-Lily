const Audios = document.querySelector("#Audios");

function CreateAudio(src, type) {
  let audio = document.createElement("audio");
  audio.src = src;
  audio.setAttribute("data-type", type);
  // audio.setAttribute("controls", "");

  Audios.appendChild(audio);
}

// Audios.style = `position: absolute; inset: 0; background: radial - gradient(black, transparent)`;

for (let i = 1; i <= 10; i++) {
  CreateAudio(`sounds/hit/hit${i}.wav`, `hit${i}.wav`);
}

for (let i = 1; i <= 10; i++) {
  CreateAudio(`sounds/lightattack/lightattack${i}.wav`, `lightattack${i}.wav`);
}

for (let i = 1; i <= 10; i++) {
  CreateAudio(`sounds/strongattack/strongattack${i}.wav`, `strongattack${i}.wav`);
}

// Test audios
// var soundpla = "";
// soundpla = setInterval(() => {
//   PlayTypeSound("strongattack", 0.5);
// }, 500);
