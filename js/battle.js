import Label from "./label.js";
import { centerX, centerY } from "./game.js";
import Monster from "./monster.js";

class Battle {
  constructor(hero) {
    this.state = "ready";
    this.slime = new Monster();
    this.strHeroName = new Label("Hero", 0);
    this.strEnemyAppeared = new Label("Enemy appeared!", 2);
    this.strHeroAttack = new Label("Hero's attack!", 2);
    this.strEnemyAttack = new Label("Enemy's attack!", 2);
    this.strDefeatEnemy = new Label("Defeated enemy!", 2);
    this.strHowToAttack = new Label("A: Attack", 0);
    this.strHowToRecover = new Label("Z: Recover", 0);
    this.battleBegin = false;
    this.heroTurnEnd = false;
    this.enemiesTurnEnd = false;
  }
  renderHeroStatus() {
    const jsonStatusOfHero = localStorage.getItem('statusOfHero');
    this.heroStatus = JSON.parse(jsonStatusOfHero);
    this.strHeroHp = new Label(`HP ${this.heroStatus.hp}`, 0);
    this.strHeroMp = new Label(`MP ${this.heroStatus.mp}`, 0);
    this.strHeroLevel = new Label(`Lv: ${this.heroStatus.level}`, 0);
    window.game.addObj(this.strHeroHp, 30, 60);
    window.game.addObj(this.strHeroMp, 30, 90);
    window.game.addObj(this.strHeroLevel, 30, 120);
  }

  calcDamage(attack, defense) {
    return attack - defense > 0 ? attack - defense : 1;
  }

  ready() {
    if (this.state === "ready") {
      // show hero's status referencing localStorage
      this.renderHeroStatus();

      window.game.addObj(this.strHeroName, 30, 30);
      window.game.addObj(this.strEnemyAppeared, 230, 350);
      window.game.addObj(this.strHowToAttack, 480, 40);
      window.game.addObj(this.strHowToRecover, 480, 65);
      window.game.addObj(this.slime, centerX, centerY);

      this.state = "battle";  
    }
  }

  // start battle!
  start() {
    this.renderHeroStatus();
    const input = window.gameInput;
    input.inputListener();
    // 
    if (input.enter) {
      this.strEnemyAppeared.unvisible(); // Make text below unvisible
      if (!this.battleBegin) this.battleBegin = true; 
    }
    // main battle system
    if (this.state = "battle" && this.battleBegin) {
      if (!this.heroTurnEnd) {
        if (input.a) {
          window.game.addObj(this.strHeroAttack, 230, 350); // Hero's attack!
          this.damageHeroToMonster = this.calcDamage(this.heroStatus.atk, this.slime.defense);
          this.strDamageHeroToMonster = new Label(`Damaged ${this.damageHeroToMonster}!`, 2);
          this.slime.hp -= this.damageHeroToMonster;
          this.heroTurnEnd = true;
        } else if (input.z) {
          // recover
        }
      } else if (this.heroTurnEnd) {
        this.damageMonsterToHero = this.calcDamage(this.slime.attack, this.heroStatus.def);
        this.strDamageMonsterToHero = new Label(`Hero has been damaged ${this.damageMonsterToHero}!`, 2);

        if (input.enter) {
          this.strHeroAttack.unvisible();
          window.game.addObj(this.strDamageHeroToMonster, 230, 350); // Damaged ~ ! 

        }
      }
    }
  }
  result() {
    // show battle result
  }
}

export default Battle;