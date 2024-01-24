// const music = new Audio(`sounds/${url}`);
// music.loop = true;
// music.volume = 0.5;
const musics = {
  menu: "Juhani Junkala [Chiptune Adventures] 1. Stage 1.wav",
  history: "Juhani Junkala [Chiptune Adventures] 2. Stage 2.wav",
  credits: "neo springcore.mp3",
  finishFight: "Juhani Junkala [Chiptune Adventures] 4. Stage Select.wav",
  levels: ["Juhani Junkala [Chiptune Adventures] 3. Boss Fight.wav", "Boss Battle #1 V1.wav"],
};

var music = document.querySelector("#music");
music.src = `musics/${musics.menu}`;
music.volume = 0;
music.loop = 1;
var musicEase = "";
var musicVolume = 0;

var currentMusicElement = document.querySelector("#currentMusic");
var currentMusic = musics.menu;
currentMusicElement.innerText = currentMusic;

// document.body.classList.remove("clicktoplay");
document.addEventListener(
  "click",
  () => {
    document.body.classList.remove("clicktoplay");

    // music.play();
    // EaseVolumeIn(musicVolume);

    currentMusicElement.style.display = "block";
    let oldMusic = currentMusic;
    setTimeout(() => {
      if (oldMusic == currentMusic) {
        currentMusicElement.style.display = "none";
      }
    }, 5000);
  },
  { once: true }
);

function EaseVolumeOut(time = 1000, nextMusic = null) {
  clearInterval(musicEase);
  let i = music.volume;
  let timeTakes = (i * 100) / time;

  musicEase = setInterval(() => {
    if (i < 0) {
      i = 0;
      clearInterval(musicEase);

      if (nextMusic != null) {
        setTimeout(() => {
          ChangeMusic(nextMusic);
          EaseVolumeIn(musicVolume);
          currentMusicElement.innerText = currentMusic;

          if (nextMusic == musics.menu) {
            music.currentTime = lastMusicTime;
          }
        }, 100);
      }
    }
    music.volume = i;
    i -= timeTakes;
  }, 100);
}

function EaseVolumeIn(ToVolume, time = 1000) {
  clearInterval(musicEase);
  let i = 0;
  let timeTakes = (musicVolume * 100) / time;

  musicEase = setInterval(() => {
    if (i >= ToVolume) {
      i = ToVolume;
      clearInterval(musicEase);
    }
    music.volume = i;
    i += timeTakes;
  }, 100);
}

function ChangeMusic(newUrl) {
  music.src = `musics/${encodeURIComponent(newUrl)}`;
  currentMusic = newUrl;

  currentMusicElement.style = "display: none";
  setTimeout(() => {
    currentMusicElement.style =
      "display: block; animation: 1s AnimateIn ease-out, 1s AnimateIn ease-out reverse 5s forwards";
  }, 1);
  currentMusicElement.innerText = currentMusic;

  let oldMusic = currentMusic;
  setTimeout(() => {
    if (oldMusic == currentMusic) {
      currentMusicElement.style = "display: none";
    }
  }, 7000);
  music.volume = 0;
  music.play();
}

function PlaySound(url, volume) {
  let audio = document.querySelector(`audio[data-type='${url}']`);
  audio.currentTime = 0;
  audio.volume = volume;
  audio.play();
}

function PlayTypeSound(type, volume) {
  switch (type) {
    case "hit":
      PlaySound(`hit${RandomNumber(1, 10)}.wav`, 0.5);
      break;
    case "lightattack":
      PlaySound(`lightattack${RandomNumber(1, 10)}.wav`, 0.5);
      break;
    case "strongattack":
      PlaySound(`strongattack${RandomNumber(1, 10)}.wav`, 0.5);
      break;
  }
}

var buttonElements = document.querySelectorAll("button");
[...buttonElements].forEach((item) => {
  item.classList.add("btn");
  MakeSoundEffects(item);
});

var aElements = document.querySelectorAll("a");
[...aElements].forEach((item) => {
  MakeSoundEffects(item);
});

function MakeSoundEffects(element) {
  element.addEventListener("mouseover", (e) => {
    if (!element.disabled && e.target.tagName == "BUTTON") {
      PlaySound("Footstep.wav", 1);
    }
  });
  element.addEventListener("click", () => {
    if (!element.disabled) {
      PlaySound("Start.wav", 1);
    }
  });
}
