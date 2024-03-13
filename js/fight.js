const fight = document.querySelector("#fight");
const fightEnded = document.querySelector("#fightEnded");
const fightEnded__type = fightEnded.querySelector("#fightEnded__type");
const fightEnded__home = document.querySelector("#fightEnded__home");
const fightEnded__tryagain = document.querySelector("#fightEnded__tryagain");
const fightEnded__continue = document.querySelector("#fightEnded__continue");

const enemyUiElement = document.querySelector("#enemy");
const userUiElement = document.querySelector("#user");

const weakAttack = document.querySelector("#weakAttack");
const strongAttack = document.querySelector("#strongAttack");

const meteor = document.querySelector("#meteor");
const energyBall = document.querySelector("#energyBall");

const barAnimation = "width 0.5s ease-out";
const barAnimationDelay = "0.5s";

var Attacking = false;
var AttackingLight = "";
var AttackingStrong = "";

var whendiedlife = 0;

var CurrentFight = 0;

Disable(meteor);
Disable(energyBall);

fightEnded__home.addEventListener("click", () => {
  Disable(fight);
  Disable(creditsmenu);
  Disable(storyDiv);
  Enable(menu);
  EaseVolumeOut(500, musics.menu);
});

fightEnded__tryagain.addEventListener("click", () => {
  user.character.removeAttribute("data-dead", "");
  Fight();
});

fightEnded__continue.addEventListener("click", () => {
  if (whendiedlife != user.life) {
    console.log("triedtocheat");
    return;
  }
  Disable(fight);
  Disable(menu);
  Disable(creditsmenu);
  Enable(storyDiv);
  StartNextStoryPart();
});

const fighters = [
  {
    level: "1",
    life: 5,
    lifeMax: 5,
    mana: 5,
    manaMax: 5,
    damageWeak: {
      strength: 1,
      mana: 1,
    },
    damageStrong: {
      strength: 2,
      mana: 5,
    },
  },
  {
    level: "2",
    life: 6,
    lifeMax: 6,
    mana: 10,
    manaMax: 10,
    damageWeak: {
      strength: 1,
      mana: 2,
    },
    damageStrong: {
      strength: 2,
      mana: 7,
    },
  },
];

var user = {
  life: 5,
  lifeMax: 5,
  lifeBar: userUiElement.querySelector("#lifeBar .fill"),
  lifeBarShower: userUiElement.querySelector("#lifeBar .fillShower"),
  lifeNumber: userUiElement.querySelector("#lifeNumber"),

  mana: 5,
  manaMax: 5,
  manaBar: userUiElement.querySelector("#manaBar .fill"),
  manaBarShower: userUiElement.querySelector("#manaBar .fillShower"),
  manaNumber: userUiElement.querySelector("#manaNumber"),

  damageWeak: {
    strength: 1,
    mana: 1,
  },
  damageStrong: {
    strength: 2,
    mana: 5,
  },
  animatingMana: "",
  animatingLife: "",
  character: fight.querySelector("#fight__user > .fight__imgs"),
  imgs: {
    path: "imgs/characters/user/",
    imgs: {
      idle: "Idle.png",
      lightAttack: "LightAttack.png",
      strongAttack: "StrongAttack.png",
      scared: "Scared.png",
    },
  },
};

var enemy = {
  life: 5,
  lifeMax: 5,
  lifeBar: enemyUiElement.querySelector("#lifeBar .fill"),
  lifeBarShower: enemyUiElement.querySelector("#lifeBar .fillShower"),
  lifeNumber: enemyUiElement.querySelector("#lifeNumber"),

  mana: 5,
  manaMax: 5,
  manaBar: enemyUiElement.querySelector("#manaBar .fill"),
  manaBarShower: enemyUiElement.querySelector("#manaBar .fillShower"),
  manaNumber: enemyUiElement.querySelector("#manaNumber"),

  damageWeak: {
    strength: 1,
    mana: 1,
  },
  damageStrong: {
    strength: 2,
    mana: 5,
  },
  animatingMana: "",
  animatingLife: "",
  character: fight.querySelector("#fight__enemy > .fight__imgs"),
  imgs: {
    path: "imgs/characters/enemy_1/",
    imgs: {
      idle: "Idle.png",
      lightAttack: "LightAttack.png",
      strongAttack: "StrongAttack.png",
    },
  },
};

var oldFight = 0;

function Fight() {
  oldFight = CurrentFight;
  Disable(menu);
  Disable(story);
  Disable(fightEnded);
  Enable(fight);
  EaseVolumeOut(500);
  CurrentFight = part - 1;
  user.life = user.lifeMax;
  user.mana = user.manaMax;

  if (oldFight != CurrentFight) {
    user.mana += 1;
    user.manaMax += 1;
  }

  // let oldEnemy = enemy;
  // console.log("oldEnemy");
  // console.log(oldEnemy);
  whendiedlife = 0;
  let curFighter = fighters[CurrentFight];
  enemy.life = curFighter.life;
  enemy.lifeMax = curFighter.lifeMax;
  enemy.mana = curFighter.mana;
  enemy.manaMax = curFighter.manaMax;
  enemy.damageWeak = curFighter.damageWeak;
  enemy.damageStrong = curFighter.damageStrong;
  enemy.character.removeAttribute("data-dead", "");
  Attacking = false;

  setTimeout(() => {
    ChangeMusic(musics.levels[CurrentFight]);
    EaseVolumeIn(musicVolume, 2000);
  }, 500);

  // console.log(user);
  // console.log("new enemy");
  // console.log(enemy);
  UpdateUI(user);
  UpdateUI(enemy);
  EnableButtons();
  UpdateButtons();
}

weakAttack.addEventListener("click", () => {
  if (Attacking) {
    console.log("cant attack you are in timeout!");
    return;
  }

  LightAttack(user, enemy);
});

function LightAttack(shooter, target) {
  if (shooter.life < 1 || target.life < 1) {
    console.log("Dead Cant shoot");
    ButtonDisable(weakAttack);
    ButtonDisable(strongAttack);
    return;
  }

  if (shooter.mana < shooter.damageWeak.mana) {
    console.log("Not enough mana");
    UpdateButtons();
    return;
  }

  // shooter.manaNumber.textContent = `${shooter.mana} / ${shooter.manaMax}`;
  shooter.mana -= shooter.damageWeak.mana;
  UpdateUI(shooter);

  // var direction = 1;

  let shooterImgs = shooter.imgs;
  let shooterPath = shooterImgs.path;

  shooter.character.src = shooterPath + shooterImgs.imgs.lightAttack;

  const shooterBound = shooter.character.getBoundingClientRect();
  const targetBound = target.character.getBoundingClientRect();
  var usewidth = shooterBound.width - 32;
  var usewidthtarget = 32;

  if (shooter == enemy) {
    // direction = -1;
    usewidth = +32;
    usewidthtarget = targetBound.width - 32;
  }

  var startX = shooterBound.x + usewidth;
  var startY = shooterBound.y + shooterBound.height / 2 - 16;
  const targetBoundX = targetBound.x + usewidthtarget;

  var speed = (targetBoundX - startX) / 10;

  Enable(energyBall);

  energyBall.style = `left: ${startX}px; top: ${startY}px`;

  var currentPosition = startX;

  Attacking = true;
  DisableButtons();
  PlayTypeSound("lightattack", 0.5);

  AttackingLight = setInterval(() => {
    // currentPosition += speed * direction;
    currentPosition += speed;
    energyBall.style.left = `${currentPosition}px`;

    if (
      (currentPosition > targetBoundX && shooter == user) ||
      (currentPosition < targetBoundX && shooter == enemy)
    ) {
      PlayTypeSound("hit", 0.5);
      clearInterval(AttackingLight);
      Disable(energyBall);

      // target.lifeNumber.textContent = `${target.life} / ${target.lifeMax}`;
      target.life -= shooter.damageWeak.strength;
      UpdateUI(target);

      // shooter.manaNumber.textContent = `${shooter.mana} / ${shooter.manaMax}`;
      shooter.mana = clamp(shooter.mana + 2, 0, shooter.manaMax);
      UpdateUI(shooter);

      shooter.character.src = shooterPath + shooterImgs.imgs.idle;

      if (target.life < 1) {
        target.life = 0;
        target.mana = 0;
        target.character.setAttribute("data-dead", "");
        FinishFight();
        return;
      }

      if (shooter == user) {
        setTimeout(() => {
          Enemy();
        }, 1000);
      } else {
        Attacking = false;
        UpdateButtons();
      }
    }
  }, 100);
}

strongAttack.addEventListener("click", () => {
  if (Attacking) {
    console.log("cant attack you are in timeout!");
    return;
  }

  StrongAttack(user, enemy);
});

function StrongAttack(shooter, target) {
  if (shooter.life < 1 || target.life < 1) {
    console.log("Dead Cant shoot");
    ButtonDisable(weakAttack);
    ButtonDisable(strongAttack);
    return;
  }

  if (shooter.mana < shooter.damageStrong.mana) {
    console.log("Not enough mana");
    UpdateButtons();
    return;
  }

  // shooter.manaNumber.textContent = `${shooter.mana} / ${shooter.manaMax}`;
  shooter.mana -= shooter.damageStrong.mana;
  UpdateUI(shooter);

  let shooterImgs = shooter.imgs;
  let shooterPath = shooterImgs.path;

  shooter.character.src = shooterPath + shooterImgs.imgs.strongAttack;

  const targetBound = target.character.getBoundingClientRect();
  const targetBoundY = targetBound.y;
  var speed = targetBound.y / 10;

  var startX = targetBound.x + targetBound.width / 2;
  var startY = 0;

  meteor.style = `left: ${startX}px; top: ${startY}px`;

  Enable(meteor);

  var currentPosition = startY;

  Attacking = true;
  DisableButtons();
  PlayTypeSound("strongattack", 0.5);

  AttackingStrong = setInterval(() => {
    currentPosition += speed;
    meteor.style.top = `${currentPosition}px`;

    if (currentPosition > targetBoundY) {
      clearInterval(AttackingStrong);
      PlayTypeSound("hit", 0.5);
      Disable(meteor);

      // target.lifeNumber.textContent = `${target.life} / ${target.lifeMax}`;
      target.life -= shooter.damageStrong.strength;
      UpdateUI(target);

      // shooter.manaNumber.textContent = `${shooter.mana} / ${shooter.manaMax}`;
      shooter.mana = clamp(shooter.mana + 2, 0, shooter.manaMax);
      UpdateUI(shooter);

      shooter.character.src = shooterPath + shooterImgs.imgs.idle;

      if (target.life < 1) {
        target.life = 0;
        target.mana = 0;
        target.character.setAttribute("data-dead", "");
        FinishFight();
        return;
      }

      if (shooter == user) {
        setTimeout(() => {
          Enemy();
        }, 1000);
      } else {
        Attacking = false;
        UpdateButtons();
      }
    }
  }, 100);
}

function DisableButtons() {
  ButtonDisable(weakAttack);
  ButtonDisable(strongAttack);
}

function EnableButtons() {
  ButtonEnable(weakAttack);
  ButtonEnable(strongAttack);
}

function Enemy() {
  if (enemy.mana >= enemy.damageStrong.mana) {
    StrongAttack(enemy, user);
  } else {
    LightAttack(enemy, user);
  }
}

function FinishFight() {
  // console.log("FinishFight");
  whendiedlife = user.life;

  EaseVolumeOut(500);

  PlayTypeSound("died", 1);

  if (user.life == 0) {
    fightEnded.setAttribute("data-lost", "");
    fightEnded.removeAttribute("data-won", "");
    fightEnded__type.innerText = "perdeu";
    fightEnded__type.removeAttribute("data-won", "");
    Enable(fightEnded__tryagain);
    Disable(fightEnded__continue);

    EaseVolumeOut(2000);
    music.volume = musicVolume;
    // PlaySound("Victory.mp3", 1);

    setTimeout(() => {
      ChangeMusic(musics.finishFight);
      music.play();
      EaseVolumeIn(musicVolume, 4000);
      // EaseVolumeIn(0.5);

      Enable(fightEnded);
    }, 3000);
    return;
  }
  // enemy.life == 0
  fightEnded.setAttribute("data-won", "");
  fightEnded.removeAttribute("data-lost", "");
  Disable(fightEnded__tryagain);
  Enable(fightEnded__continue);

  fightEnded__type.innerText = "ganhou";
  fightEnded__type.setAttribute("data-won", "");

  setTimeout(() => {
    if (hasMusic) {
      musicVolume = 0.5;
    }
    PlaySound("Victory.mp3", 1);
  }, 500);

  setTimeout(() => {
    ChangeMusic(musics.finishFight);
    music.play();
    EaseVolumeIn(musicVolume, 4000);
    Enable(fightEnded);
  }, 3000);
}
