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
var startedStory = false;
var typespeed = 60;

bubbletText.innerHTML = "";

// Dialogs[part].title;

clearInterval(typewritter);

function StartNextStoryPart() {
  if (hasMusic) {
    musicVolume = 0.3;
  }
  EaseVolumeOut(500, musics.history);
  startedStory = true;
  setTimeout(() => {
    startedStory = false;
  }, 100);
  TypeStory();
}

function TypeStory() {
  if (!startedStory) {
    if (hasMusic) {
      musicVolume = 0.3;
    }
    music.volume = musicVolume;
  }
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
      if (hasMusic) {
        musicVolume = 0.5;
      }
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
  }, typespeed);
}

story__continue.addEventListener("click", () => {
  if (telling) {
    clearInterval(typewritter);
    bubbletText.innerHTML = Dialogs[part].text[currentPoint][0];
    telling = false;
    currentPoint++;
    if (hasMusic) {
      musicVolume = 0.5;
    }
    music.volume = musicVolume;
  } else {
    if (Dialogs[part].text.length != currentPoint) {
      TypeStory();
      return;
    }
    NextPartOfHistory();
  }
});

story__jump.addEventListener("click", () => {
  clearInterval(typewritter);
  telling = false;
  currentPoint = Dialogs[part].text.length;
  if (hasMusic) {
    musicVolume = 0.5;
  }
  music.volume = musicVolume;
  NextPartOfHistory();
});

function NextPartOfHistory() {
  // console.warn("NextPartOfHistory()");
  // console.trace();
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
