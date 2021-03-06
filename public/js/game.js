

var characters;
var attacks;
var gameEnded = false;

var Unit = new Phaser.Class({
  Extends: Phaser.GameObjects.Sprite,

  initialize:

    //     function Unit(scene, x, y, texture, frame, type, hp, damage) {
    //         Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame)
    //         this.type = type;
    //         this.maxHp = this.hp = hp;
    //         this.damage = damage; // default damage
    //         this.living = true;
    //         this.menuItem = null;

    //     },

    // level, hp, pAtk, pDef, mAtk, mDef, speed, weapons, mMagic
    function Unit(scene, x, y, texture, frame, type, damage, dbData) {
      Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame);

      this.level = dbData.Level;
      this.maxHp = dbData.HP;
      this.hp = this.maxHp;
      this.pAtk = dbData.Physical_Attack;
      this.pDef = dbData.Physical_Defense;
      this.mAtk = dbData.Magical_Attack;
      this.mDef = dbData.Magical_Defense;
      this.speed = dbData.Speed;

      this.type = type;
      this.damage = damage; // default damage
      this.living = true;
      this.menuItem = null;
    },

  // we will use this to notify the menu item when the unit is dead
  setMenuItem: function (item) {
    this.menuItem = item;
  },
  attack: function (target) {
    if (target.living) {
      this.damage = Math.floor((((2 * parseInt(this.level) / 5 + 2) * 60 * (parseInt(this.pAtk) / parseInt(target.pDef))) + 2) / 50);
      target.takeDamage(this.damage);
      this.scene.events.emit("Message", this.type + " attacks " + target.type + " for " + this.damage + " damage");
    }
  },
  takeDamage: function (damage) {
    this.hp -= damage;
    if (this.hp <= 0) {
      this.hp = 0;
      this.menuItem.unitKilled();
      this.living = false;
      this.visible = false;
      this.menuItem = null;
    }
  },

  // endBattle: function () {
  //   // clear state, remove sprites
  //   this.heroes.length = 0;
  //   this.enemies.length = 0;
  //   for (var i = 0; i < this.units.length; i++) {
  //     // link item
  //     this.units[i].destroy();
  //   }
  //   this.units.length = 0;
  //   // sleep the UI
  //   this.scene.sleep('UIScene');
  //   // return to WorldScene and sleep current BattleScene
  //   this.scene.switch('WorldScene');
  // },
});

var Enemy = new Phaser.Class({
  Extends: Unit,

  initialize:
    // function Enemy(scene, x, y, texture, frame, type, hp, damage) {
    function Enemy(scene, x, y, texture, frame, type, damage, dbData) {
      Unit.call(this, scene, x, y, texture, frame, type, damage, dbData);

      this.setScale(4);
    }
});

var PlayerCharacter = new Phaser.Class({
  Extends: Unit,

  initialize:
    // function PlayerCharacter(scene, x, y, texture, frame, type, hp, damage) {
    function PlayerCharacter(scene, x, y, texture, frame, type, damage, dbData) {
      Unit.call(this, scene, x, y, texture, frame, type, damage, dbData);
      // flip the image so I don't have to edit it manually
      this.flipX = true;

      this.setScale(8);
    }
});



var BootScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function BootScene() {
      Phaser.Scene.call(this, { key: 'BootScene' });
    },




  preload: function () {
    // load resources
    this.load.spritesheet('playerwarrior', 'assets/RPG_assets_warrior.png', { frameWidth: 16, frameHeight: 16 });
    this.load.spritesheet('playermage', 'assets/RPG_assets_mage.png', { frameWidth: 16, frameHeight: 16 });
    this.load.image('dragonblue', 'assets/dragonblue.png');
    this.load.image('dragonorange', 'assets/dragonorange.png');
    getCharacters();
  },

  create: function () {
    this.scene.start('BattleScene');
  }
});

var BattleScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function BattleScene() {
      Phaser.Scene.call(this, { key: 'BattleScene' });
    },

  nextTurn: function () {
    this.checkEndBattle();
    this.index++;
    // if there are no more units, we start again from the first one
    if (this.index >= this.units.length) {
      this.index = 0;
    }
    if (this.units[this.index] && this.units[this.index].living) {
      // if its player hero
      if (this.units[this.index] instanceof PlayerCharacter) {
        this.events.emit('PlayerSelect', this.index);
      } else { // else if its enemy unit
        // pick random hero
        var r = Math.floor(Math.random() * this.heroes.length);
        // call the enemy's attack function 
        this.units[this.index].attack(this.heroes[r]);
        // add timer for the next turn, so will have smooth gameplay
        this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
      }
    }

    else {
      this.nextTurn();
    }
  },

  checkEndBattle: function () {
    var victory = true;
    // if all enemies are dead we have victory
    for (var i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].living) {
        victory = false;
      }
    }
    var gameOver = true;
    // if all heroes are dead we have game over
    for (var i = 0; i < this.heroes.length; i++) {
      if (this.heroes[i].living) {
        gameOver = false;
      }
    }

    if (victory === true && gameEnded === false) {
      timer.stop();
      let score = 1000 - timer.time;
      highScorePrompt(score);
      gameEnded = true;
    }

    else if (gameOver === true && gameEnded ===false) {
      timer.stop();
      alert('Game Over! Refresh this page to try again!');
      gameEnded = true;
    }
    // return victory || gameOver;
  },

  receivePlayerSelection: function (action, target) {
    if (action == 'attack') {
      this.units[this.index].attack(this.enemies[target]);
    }
    this.time.addEvent({ delay: 3000, callback: this.nextTurn, callbackScope: this });
  },

  create: function () {
    {
      // change the background to green
      this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

      // player character - warrior
      // var warrior = new PlayerCharacter(this, 250, 50, 'playerwarrior', 1, 'Warrior', 100, 20);
      var warrior = new PlayerCharacter(this, 900, 180, 'playerwarrior', 1, 'Warrior', 9000, characters[4]);
      this.add.existing(warrior);

      // player character - mage
      // var mage = new PlayerCharacter(this, 250, 100, 'playermage', 4, 'Mage', 80, 8);
      var mage = new PlayerCharacter(this, 900, 350, 'playermage', 4, 'Mage', 8, characters[0]);
      this.add.existing(mage);

      // var dragonblue = new Enemy(this, 250, 550, 'dragonblue', null, 'Dragon', 50, 3);
      var dragonblue = new Enemy(this, 200, 200, 'dragonblue', null, 'Dragon', 3, characters[3]);
      // getData('Enemy Spellcaster'));
      this.add.existing(dragonblue);

      // var dragonOrange = new Enemy(this, 50, 100, 'dragonorange', null, 'Dragon2', 50, 3);
      var dragonOrange = new Enemy(this, 200, 350, 'dragonorange', null, 'Dragon2', 3, characters[1]);
      // getData('Enemy FightMage'));
      this.add.existing(dragonOrange);

      // array with heroes
      this.heroes = [warrior, mage];
      // array with enemies
      this.enemies = [dragonblue, dragonOrange];
      // array with both parties, who will attack
      this.units = this.heroes.concat(this.enemies);

      // Run UI Scene at the same time
      this.scene.launch('UIScene');


      this.index = -1;
    }
  }
});

var UIScene = new Phaser.Class({

  Extends: Phaser.Scene,

  initialize:

    function UIScene() {
      Phaser.Scene.call(this, { key: 'UIScene' });
    },

  remapHeroes: function () {
    var heroes = this.battleScene.heroes;
    this.heroesMenu.remap(heroes);
  },
  remapEnemies: function () {
    var enemies = this.battleScene.enemies;
    this.enemiesMenu.remap(enemies);
  },

  onKeyInput: function (event) {
    if (this.currentMenu) {
      if (event.code === "ArrowUp") {
        this.currentMenu.moveSelectionUp();
      } else if (event.code === "ArrowDown") {
        this.currentMenu.moveSelectionDown();
      } else if (event.code === "ArrowRight" || event.code === "Shift") {

      } else if (event.code === "Space" || event.code === "ArrowLeft") {
        this.currentMenu.confirm();
      }
    }
  },

  onPlayerSelect: function (id) {
    this.heroesMenu.select(id);
    this.actionsMenu.select(0);
    this.currentMenu = this.actionsMenu;
  },

  onSelectEnemies: function () {
    this.currentMenu = this.enemiesMenu;
    this.enemiesMenu.select(0);
  },

  onEnemy: function (index) {
    this.heroesMenu.deselect();
    this.actionsMenu.deselect();
    this.enemiesMenu.deselect();
    this.currentMenu = null;
    this.battleScene.receivePlayerSelection('attack', index);
  },

  create: function () {

    this.graphics = this.add.graphics();
    // Line and fill of menu boxes
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 1);

    // dragon & dragon2 header text box
    this.graphics.strokeRect(402, 575, 95, 100);
    this.graphics.fillRect(402, 576, 93, 99);

    // attack header text box
    this.graphics.strokeRect(497, 575, 95, 100);
    this.graphics.fillRect(497, 576, 93, 99);

    // Warrior & Mage header text box
    this.graphics.strokeRect(592, 575, 95, 100);
    this.graphics.fillRect(592, 576, 93, 99);

    // basic container to hold all menus
    this.menus = this.add.container();

    //header text
    this.heroesMenu = new HeroesMenu(601, 590, this);
    this.actionsMenu = new ActionsMenu(508, 590, this);
    this.enemiesMenu = new EnemiesMenu(415, 590, this);

    // the currently selected menu 
    this.currentMenu = this.actionsMenu;

    // add menus to the container
    this.menus.add(this.heroesMenu);
    this.menus.add(this.actionsMenu);
    this.menus.add(this.enemiesMenu);


    this.battleScene = this.scene.get('BattleScene');

    this.message = new Message(this, this.battleScene.events);
    this.add.existing(this.message);

    this.remapHeroes();
    this.remapEnemies();

    this.input.keyboard.on('keydown', this.onKeyInput, this);

    this.battleScene.events.on("PlayerSelect", this.onPlayerSelect, this);

    this.events.on("SelectEnemies", this.onSelectEnemies, this);

    this.events.on("Enemy", this.onEnemy, this);

    this.battleScene.nextTurn();

  }
});
var MenuItem = new Phaser.Class({
  Extends: Phaser.GameObjects.Text,

  initialize:

    function MenuItem(x, y, text, scene) {
      Phaser.GameObjects.Text.call(this, scene, x, y, text, { color: '#ffffff', align: 'left', fontSize: 15 });
    },

  select: function () {
    this.setColor('#f8ff38');
  },

  deselect: function () {
    this.setColor('#ffffff');
  },

  // when the associated enemy or player unit is killed
  unitKilled: function () {
    this.active = false;
    this.visible = false;
  }

});

var Menu = new Phaser.Class({
  Extends: Phaser.GameObjects.Container,

  initialize:

    function Menu(x, y, scene, heroes) {
      Phaser.GameObjects.Container.call(this, scene, x, y);
      this.menuItems = [];
      this.menuItemIndex = 0;
      this.heroes = heroes;
      this.x = x;
      this.y = y;
    },
  addMenuItem: function (unit) {
    var menuItem = new MenuItem(0, this.menuItems.length * 20, unit, this.scene);
    this.menuItems.push(menuItem);
    this.add(menuItem);
    return menuItem;
  },
  moveSelectionUp: function () {
    this.menuItems[this.menuItemIndex].deselect();
    do {
      this.menuItemIndex--;
      if (this.menuItemIndex < 0)
        this.menuItemIndex = this.menuItems.length - 1;
    } while (!this.menuItems[this.menuItemIndex].active);
    this.menuItems[this.menuItemIndex].select();
  },
  moveSelectionDown: function () {
    this.menuItems[this.menuItemIndex].deselect();
    do {
      this.menuItemIndex++;
      if (this.menuItemIndex >= this.menuItems.length)
        this.menuItemIndex = 0;
    } while (!this.menuItems[this.menuItemIndex].active);
    this.menuItems[this.menuItemIndex].select();
  },
  select: function (index) {
    if (!index)
      index = 0;
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = index;
    while (!this.menuItems[this.menuItemIndex].active) {
      this.menuItemIndex++;
      if (this.menuItemIndex >= this.menuItems.length)
        this.menuItemIndex = 0;
      if (this.menuItemIndex == index)
        return;
    }
    this.menuItems[this.menuItemIndex].select();
    this.selected = true;
  },
  // deselect this menu
  deselect: function () {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = 0;
  },
  confirm: function () {
    // when the player confirms his slection, do the action
  },

  clear: function () {
    for (var i = 0; i < this.menuItems.length; i++) {
      this.menuItems[i].destroy();
    }
    this.menuItems.length = 0;
    this.menuItemIndex = 0;
  },
  remap: function (units) {
    this.clear();
    for (var i = 0; i < units.length; i++) {
      var unit = units[i];
      unit.setMenuItem(this.addMenuItem(unit.type));
    }
    this.menuItemIndex = 0;
  }
});

var HeroesMenu = new Phaser.Class({
  Extends: Menu,

  initialize:

    function HeroesMenu(x, y, scene) {
      Menu.call(this, x, y, scene);
    }
});

var ActionsMenu = new Phaser.Class({
  Extends: Menu,

  initialize:

    function ActionsMenu(x, y, scene) {
      Menu.call(this, x, y, scene);
      this.addMenuItem('Attack');
    },
  confirm: function () {
    this.scene.events.emit('SelectEnemies');
  }

});

var EnemiesMenu = new Phaser.Class({
  Extends: Menu,

  initialize:

    function EnemiesMenu(x, y, scene) {
      Menu.call(this, x, y, scene);
    },
  confirm: function () {
    this.scene.events.emit("Enemy", this.menuItemIndex);
  }
});

var config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 1080,
  height: 768,
  zoom: 2,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 }
    }
  },
  scene: [BootScene, BattleScene, UIScene]
};

var Message = new Phaser.Class({

  Extends: Phaser.GameObjects.Container,

  initialize:
    function Message(scene, events) {
      Phaser.GameObjects.Container.call(this, scene, 570, 30);
      var graphics = this.scene.add.graphics();
      this.add(graphics);
      graphics.lineStyle(1, 0xffffff, 0.8);
      graphics.fillStyle(0x031f4c, 0.3);
      graphics.strokeRect(-90, -15, 180, 30);
      graphics.fillRect(-90, -15, 180, 30);
      this.text = new Phaser.GameObjects.Text(scene, 0, 0, "", { color: '#ffffff', align: 'center', fontSize: 13, wordWrap: { width: 160, useAdvancedWrap: true } });
      this.add(this.text);
      this.text.setOrigin(0.5);
      events.on("Message", this.showMessage, this);
      this.visible = false;
    },
  showMessage: function (text) {
    this.text.setText(text);
    this.visible = true;
    if (this.hideEvent)
      this.hideEvent.remove(false);
    this.hideEvent = this.scene.time.addEvent({ delay: 2000, callback: this.hideMessage, callbackScope: this });
  },
  hideMessage: function () {
    this.hideEvent = null;
    this.visible = false;
  }
});

var game = new Phaser.Game(config);

$.get('/api/attacks', function (data) {
  attacks = data;
  for (var i = 0; i < attacks.length; i++) {
  }
});

function getCharacters() {
  $.get('/api/characters', function (data) {
    characters = data;
    for (var i = 0; i < characters.length; i++) {
    }
  });
}


const getData = characterName => {
  for (char in characters) {
    if (characters[char].Name === characterName) {
      var data = characters[char];

    }
    return data;
  }
}

