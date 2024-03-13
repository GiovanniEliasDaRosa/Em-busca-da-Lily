const openconfigmenu = document.querySelector("#openconfigmenu");
const closeconfigmenu = document.querySelector("#closeconfigmenu");
const cofigurations = document.querySelector("#cofigurations");
const changequality = document.querySelector("#changequality");
const qualitySpan = document.querySelector("#qualitySpan");

const typespeedslider = document.querySelector("#typespeedslider");
const typespeedvalue = document.querySelector("#typespeedvalue");

const animateMenuElement = document.querySelector("#animateMenu");
const animateMenuSpan = document.querySelector("#animateMenuSpan");

var lowQuality = false;
var testtypewritter = "";

const animateMenuOptions = ["tudo", "só o título", "só o fundo", "nada"];
var animateMenu = 0;

Disable(cofigurations);

let lowQualityStored = localStorage.getItem("lowQuality");

if (lowQualityStored != null) {
  if (lowQualityStored == "true") {
    ChangeQuality(); // activate to change qulity
  }
}

let typeSpeedStored = localStorage.getItem("typespeed");

if (typeSpeedStored != null) {
  if (typeSpeedStored >= 40 && typeSpeedStored <= 100) {
    typespeedslider.value = typeSpeedStored;
    UpdateTypeSpeed(true);
  }
}

let animateMenuStored = localStorage.getItem("animateMenu");

if (animateMenuStored != null) {
  animateMenuStored = Number(animateMenuStored);

  if (animateMenuStored >= 0 && animateMenuStored <= 3) {
    animateMenu = animateMenuStored;
    UpdateAnimateMenu(true);
  }
}

function ChangeQuality() {
  if (lowQuality) {
    let lowQualityCss = document.querySelector("#lowQualityCss");
    lowQualityCss.remove();
    lowQuality = false;
    qualitySpan.innerText = "Com";
  } else {
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "css/lowquality.css";
    link.id = "lowQualityCss";

    document.head.appendChild(link);
    lowQuality = true;
    qualitySpan.innerText = "Sem";
  }

  localStorage.setItem("lowQuality", lowQuality);
}

openconfigmenu.addEventListener("click", () => {
  Enable(cofigurations);
});

closeconfigmenu.addEventListener("click", () => {
  clearInterval(testtypewritter);
  Disable(cofigurations);
});

changequality.addEventListener("click", () => {
  ChangeQuality();
});

typespeedslider.addEventListener("input", () => {
  UpdateTypeSpeed();
});

function UpdateTypeSpeed(bystorage = false) {
  let realSpeed = 60;
  switch (Number(typespeedslider.value)) {
    case 40:
      typespeedvalue.innerText = "Devagar";
      realSpeed = 100;
      break;
    case 60:
      typespeedvalue.innerText = "Meio devagar";
      realSpeed = 80;
      break;
    case 100:
      typespeedvalue.innerText = "Rápido";
      realSpeed = 40;
      break;
    default:
      // or 80
      realSpeed = 60;
      typespeedslider.value = 80;
      typespeedvalue.innerText = "Normal";
      break;
  }
  // realSpeed is inverted of the speed
  //  typespeedslider.value == 100  ->  realSpeed = 60
  //  typespeedslider.value == 40   ->  realSpeed = 100

  typespeed = clamp(Number(realSpeed), 40, 100);
  if (bystorage) {
    return;
  }

  localStorage.setItem("typespeed", typespeed);
  var i = 0;
  var oldText = typespeedvalue.innerText;
  var testText = " Esse é um texto de exemplo";

  clearInterval(testtypewritter);
  testtypewritter = setInterval(() => {
    if (i > testText.length - 1) {
      currentPoint++;
      telling = false;
      if (hasMusic) {
        musicVolume = 0.5;
      }
      music.volume = musicVolume;
      clearInterval(testtypewritter);

      typespeedvalue.innerText = oldText;
      return;
    }
    typespeedvalue.innerHTML += testText[i];
    PlaySound("Footstep.wav", 1);
    i++;
  }, typespeed);
}

animateMenuElement.addEventListener("click", () => {
  UpdateAnimateMenu();
});

function UpdateAnimateMenu(bystorage = false) {
  menu.setAttribute("data-dontanimate", "");
  menu__title.setAttribute("data-dontanimate", "");

  if (!bystorage) {
    animateMenu = animateMenu + 1;
  }
  if (animateMenu > 3) {
    animateMenu = 0;
  }

  // console.log(animateMenu);
  // console.log(animateMenuOptions[animateMenu]);

  switch (animateMenu) {
    case 0:
      // tudo
      menu__title.removeAttribute("data-dontanimate", "");
      menu.removeAttribute("data-dontanimate", "");
      break;
    case 1:
      // só o título
      menu__title.removeAttribute("data-dontanimate", "");
      break;
    case 2:
      // só o fundo
      menu.removeAttribute("data-dontanimate", "");
      break;
    case 3:
      // nada
      break;
  }

  animateMenuSpan.innerText = animateMenuOptions[animateMenu];
  if (!bystorage) {
    localStorage.setItem("animateMenu", animateMenu);
  }
}
