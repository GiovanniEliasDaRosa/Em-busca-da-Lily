function Disable(element) {
  element.setAttribute("disabled", "");
  element.setAttribute("aria-disabled", "true");
  element.style.display = "none";
}

function Enable(element) {
  element.removeAttribute("disabled");
  element.removeAttribute("aria-disabled");
  element.style.display = "";
}

function RandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

// Fight Ui Stuff
function UpdateUI(who) {
  UpdateUIPart(who.mana, who.manaMax, who.manaNumber, who.manaBar, who.manaBarShower);
  UpdateUIPart(who.life, who.lifeMax, who.lifeNumber, who.lifeBar, who.lifeBarShower);
}

function UpdateUIPart(value, valueMax, number, bar, barShower) {
  let percent = value / valueMax;
  let barWidth = percent * 100 + "%";

  let OldValue = Number(number.textContent.split("/")[0]);
  // var NewValue = OldValue;
  // var type = 1;

  if (OldValue > value) {
    bar.style.transition = barAnimation;
    barShower.style.transition = `${barAnimation} ${barAnimationDelay}`;

    barShower.classList.remove("good");
  } else if (OldValue < value) {
    barShower.style.transition = barAnimation;
    bar.style.transition = `${barAnimation} ${barAnimationDelay}`;

    barShower.classList.add("good");
  }

  bar.style.width = barWidth;
  barShower.style.width = barWidth;

  number.textContent = `${value} / ${valueMax}`;

  // if (NewValue > value) {
  //   type = -1;
  // }

  // NewValue - value;

  // let time = 200 / (NewValue - value);

  // clearInterval(animating[0]);

  // animating[0] = setInterval(() => {
  //   if (NewValue == value) {
  //     clearInterval(animating[0]);
  //     animating[0] = "";
  //     number.textContent = `${value} / ${valueMax}`;
  //   }

  //   number.textContent = `${NewValue} / ${valueMax}`;
  //   NewValue += type;
  // }, time);
}

function UpdateButtons() {
  ButtonEnable(weakAttack);
  ButtonEnable(strongAttack);

  // weakAttack.innerHTML = `
  //   <span></span>
  // `;

  if (user.mana < user.damageWeak.mana) {
    ButtonDisable(weakAttack);
  }
  if (user.mana < user.damageStrong.mana) {
    ButtonDisable(strongAttack);
  }
}

function ButtonDisable(button) {
  button.setAttribute("disabled", "");
}

function ButtonEnable(button) {
  button.removeAttribute("disabled", "");
}

// Test Stuff
function InstaKill() {
  let who = confirm("accept to kill user, cancel to kill enemy");
  if (who) {
    Die(user);
  } else {
    Die(enemy);
  }
}

function Die(who) {
  who.life = 0;
  who.mana = 0;
  who.character.setAttribute("data-dead", "");
  FinishFight();
}

function GetMusic() {
  musicVolume = 0.5;
  music.play();
  EaseVolumeIn(musicVolume);
}

document.addEventListener("keydown", (e) => {
  if (e.code == "KeyX") {
    GetMusic();
  } else if (e.code == "KeyY") {
    InstaKill();
  }
});
