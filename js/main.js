/* --- page control settings */
var menu = document.querySelector("#menu");
var creditsmenu = document.querySelector("#creditsmenu");
var storyDiv = document.querySelector("#story");
var playgamebutton = document.querySelector("#playgamebutton");
var opencreditsmenu = document.querySelector("#opencreditsmenu");
var closecreditsmenu = document.querySelector("#closecreditsmenu");

/* --------- Credits Stuff */
var credits__text = document.querySelector("#credits__text");
var bound = 0;
var windowHeight = 0;
var initialPos = 0;
var textHeight = 0;
var offsetX = 0;
var goup = "";
var time = 50;
var lastMusicTime = 0;

function ShowCredits(type) {
  clearInterval(goup);

  Disable(storyDiv);
  Disable(menu);
  Disable(fight);
  Enable(creditsmenu);
  let time = 4000;

  // credits__text.style = `position: relative;`;

  // bound = credits__text.getBoundingClientRect();
  // windowHeight = window.innerHeight;
  // initialPos = bound.top;
  // textHeight = bound.height;
  // offsetX = windowHeight;
  // // offsetX = initialPos;
  // goup = "";
  // time = 500;

  // if (type == "menu") {
  //   time = 50;
  // } else {
  // }

  EaseVolumeOut(500, musics.credits);

  credits__text.style = "transition: none; transform: translateY(100%)";

  setTimeout(() => {
    credits__text.style.transition = "transform 15s ease-out";
    time = 15000;
    if (type == "menu") {
      credits__text.style.transition = "transform 4s ease-out";
      time = 4000;
    }
    time += 100;
  }, 100);

  setTimeout(() => {
    credits__text.style.transform = `translateY(0%)`;
    time += 1000;

    setTimeout(() => {
      credits__text.style.overflowY = "auto";
    }, time);
  }, 1000);

  // credits__text.style = `position: absolute; transition: none; top: ${offsetX}px`;

  // setTimeout(() => {
  //   credits__text.style = `position: absolute; top: ${offsetX}px`;
  // }, 100);

  // setTimeout(() => {
  //   credits__text.style = `position: absolute; top: ${initialPos}px`;
  //   if (type == "menu") {
  //     credits__text.style.transition = "top 4s ease-out";
  //   }
  // }, 1000);

  //   goup = setInterval(() => {
  //     credits__text.style.top = `${offsetX}px`;

  //     if (offsetX < initialPos) {
  //       clearInterval(goup);

  //       // credits__text.style.maxHeight = "calc(100vh - 2em)";
  //       // credits__text.style.overflowY = "auto";

  //       // setTimeout(() => {
  //       //   time = 1;
  //       //   goup = setInterval(() => {
  //       //     credits__text.style.top = `${offsetX}px`;

  //       //     if (offsetX + textHeight < textHeight) {
  //       //       clearInterval(goup);
  //       //       closecreditsmenu.click();
  //       //     }

  //       //     offsetX -= 10 * time;
  //       //     time += 0.5;
  //       //   }, 100);
  //       // }, 4000);
  //     }

  //     offsetX -= 10;
  //     time -= offsetX / 10;
  //   }, time);
}

/* ^^^^ Credits Stuff */

playgamebutton.addEventListener("click", () => {
  Disable(menu);
  Disable(creditsmenu);
  Disable(storyDiv);
  Disable(fight);
  Disable(storyDiv);
  if (user.life == 0) {
    user.character.removeAttribute("data-dead", "");
    Enable(fight);
    Fight();
  } else {
    Enable(storyDiv);
    StartNextStoryPart();
  }
});

closecreditsmenu.addEventListener("click", () => {
  Disable(creditsmenu);
  Enable(menu);
  Disable(storyDiv);
  EaseVolumeOut(500, musics.menu);
});

opencreditsmenu.addEventListener("click", () => {
  lastMusicTime = music.currentTime;
  ShowCredits("menu");
});

// start
Disable(creditsmenu);
Disable(storyDiv);
Disable(fight);

const menu__title = document.querySelector("#menu__title");

window.onblur = function () {
  menu.setAttribute("data-lostFocus", "");
  menu__title.setAttribute("data-lostFocus", "");
};
window.onfocus = function () {
  menu.removeAttribute("data-lostFocus", "");
  menu__title.removeAttribute("data-lostFocus", "");
};
