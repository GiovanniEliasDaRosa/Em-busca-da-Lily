let manaPercent = who.mana / who.manaMax;
let manaBarWidth = manaPercent * 100 + "%";

let OldMana = Number(who.manaNumber.textContent.split("/")[0]);
var NewMana = OldMana;
var manaType = 1;

who.manaBar.style.transition = "width 1s ease-out";
who.manaBarShower.style.transition = "width 1s ease-out";

if (OldMana > who.mana) {
  who.manaBarShower.style.transition = "width 1s ease-out 0.5s";
  who.manaBarShower.classList.remove("good");
} else if (OldMana < who.mana) {
  who.manaBar.style.transition = "width 1s ease-out 0.5s";
  who.manaBarShower.classList.add("good");
}

who.manaBar.style.width = manaBarWidth;
who.manaBarShower.style.width = manaBarWidth;

// who.manaNumber.textContent = `${who.mana} / ${who.manaMax}`;

if (OldMana > who.mana) {
  manaType = -1;
}

clearInterval(who.animatingMana);
who.animatingMana = setInterval(() => {
  if (NewMana == who.mana) {
    clearInterval(who.animatingMana);
    who.manaNumber.textContent = `${who.mana} / ${who.manaMax}`;
  }

  who.manaNumber.textContent = `${NewMana} / ${who.manaMax}`;
  NewMana += manaType;
}, 100);

// life
let lifePercent = who.life / who.lifeMax;
let lifeBarWidth = lifePercent * 100 + "%";

let OldLife = Number(who.manaNumber.textContent.split("/")[0]);
var NewLife = OldLife;
var lifeType = 1;

who.lifeBar.style.transition = "width 1s ease-out";
who.lifeBarShower.style.transition = "width 1s ease-out";

if (OldLife > who.life) {
  who.lifeBarShower.style.transition = "width 1s ease-out 0.5s";
  who.lifeBarShower.classList.remove("good");
} else if (OldLife < who.life) {
  who.lifeBar.style.transition = "width 1s ease-out 1s";
  who.lifeBarShower.classList.add("good");
}

who.lifeBar.style.width = lifeBarWidth;
who.lifeBarShower.style.width = lifeBarWidth;

clearInterval(who.animatingLife);
who.animatingLife = setInterval(() => {
  if (lifeType == 1) {
    if (NewLife >= who.life) {
      clearInterval(who.animatingLife);
      who.lifeNumber.textContent = `${who.life} / ${who.lifeMax}`;
    }
  } else {
    if (NewLife <= who.life) {
      clearInterval(who.animatingLife);
      who.lifeNumber.textContent = `${who.life} / ${who.lifeMax}`;
    }
  }

  who.lifeNumber.textContent = `${NewLife} / ${who.lifeMax}`;
  NewLife += lifeType;
}, 100);

if (who == user) {
  UpdateButtons();
}
