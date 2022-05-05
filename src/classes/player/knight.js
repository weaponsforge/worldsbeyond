const Adventurer = require('./adventurer')
const { cyclone } = require('../skill')
const { CLASSES } = require('../../utils/constants')

class Knight extends Adventurer {
  constructor (params) {
    super({ ...params, class: CLASSES.KNIGHT })

    this.stats = {
      str: 28,
      agi: 20,
      vit: 25,
      ener: 10,
      hp: 110,
      mana: 20,
      ag: 25,
      sd: 100,
      dmg: 0,
      asr: 0
    }

    this.createSkill(cyclone)
    this.setActiveSkill(cyclone.name)
    this.updateActiveSkill()
    this.init()
  }

  get defense () {
    return 1 * (this.stats.agi / 3)
  }

  get defenseRate () {
    return 1 * (this.stats.agi / 3)
  }

  get elemDef () {
    return 1 * (this.stats.agi / 3)
  }

  get elemDefRate () {
    return 1 * (this.stats.agi / 3)
  }

  get maxAtk () {
    return 1 * (this.stats.str / 4)
  }

  get minAtk () {
    return 1 * (this.stats.str / 6)
  }

  get maxWizPower () {
    return (1 * this.stats.ener / 4) + (this[this.active_skill].finalDamage() * 1.5)
  }

  get minWizPower () {
    return (1 * this.stats.ener / 9) + (this[this.active_skill].finalDamage() * 1.5)
  }

  get atkRate () {
    return (this.level / 5) + (1.5 * this.stats.agi) + (1 * this.stats.str / 4)
  }

  get atkSpeed () {
    return 1 * (this.stats.agi / 15)
  }

  get maxElemAtk () {
    return 1 * (this.stats.ener / 4)
  }

  get minElemAtk () {
    return 1 * (this.stats.ener / 6)
  }

  get elemAtkRate () {
    return (5 * this.level) + (1.5 * this.stats.agi) + (1 * this.stats.str / 4)
  }

  get hp () {
    return (this.level === 1)
      ? this.stats.hp
      : this.stats.hp + (2 * this.level) + (3 * this.stats.vit)
  }

  get mana () {
    return (this.level === 1)
      ? this.stats.mana
      : this.stats.mana + (1 * this.level) + (1 * this.stats.ener)
  }

  get ag () {
    return (this.level === 1)
      ? this.stats.ag
      : this.stats.ag + (0.15 * this.stats.str) + (1 * this.stats.agi / 5) + (1 * this.stats.vit / 3) + (1 * this.stats.ener)
  }

  get sd () {
    return (this.level === 1)
      ? this.stats.sd
      : this.stats.sd + (1.2 * this.level) + (1 * this.defense / 2)
  }
}

module.exports = Knight
