const Adventurer = require('./adventurer')
const { energyball } = require('../skill')
const { CLASSES } = require('../../utils/constants')

class Wizard extends Adventurer {
  constructor (params) {
    super({ ...params, class: CLASSES.WIZARD })

    this.stats = {
      str: 18,
      agi: 18,
      vit: 15,
      ener: 30,
      hp: 60,
      mana: 60,
      ag: 21,
      sd: 99,
      dmg: 0,
      asr: 0
    }

    this.createSkill(energyball)
    this.setActiveSkill(energyball.name)
    this.updateActiveSkill()
    this.init()
  }

  get defense () {
    return (this.stats.agi / 4)
  }

  get defenseRate () {
    return 1 * (this.stats.agi / 3)
  }

  get elemDef () {
    return 1 * (this.stats.agi / 4)
  }

  get elemDefRate () {
    return 1 * (this.stats.agi / 3)
  }

  get maxAtk () {
    return 1 * (this.stats.str / 4)
  }

  get minAtk () {
    return 1 * (this.stats.str / 8)
  }

  get maxWizPower () {
    return (1 * this.stats.ener / 4) + (this[this.skill_active].finalDamage() * 1.5)
  }

  get minWizPower () {
    return (1 * this.stats.ener / 9) + this[this.skill_active].finalDamage()
  }

  get atkRate () {
    return (this.level / 5) + (1.5 * this.stats.agi) + (1 * this.stats.str / 4)
  }

  get atkSpeed () {
    return 1 * (this.stats.agi / 10)
  }

  get maxElemAtk () {
    return 1 * (this.stats.ener / 6)
  }

  get minElemAtk () {
    return 1 * (this.stats.ener / 9)
  }

  get elemAtkRate () {
    return (5 * this.level) + (1.5 * this.stats.agi) + (1 * this.stats.str / 4)
  }

  get hp () {
    return (this.level === 1)
      ? this.stats.hp
      : this.stats.hp + (1 * this.level) + (1 * this.stats.vit)
  }

  get mana () {
    return (this.level === 1)
      ? this.stats.mana
      : this.stats.mana + (2 * this.level) + (2 * this.stats.ener)
  }

  get ag () {
    return (this.level === 1)
      ? this.stats.ag
      : this.stats.ag + (1 * this.stats.str / 5) + (0.4 * this.stats.agi) + (1 * this.stats.vit / 3) + (1 * this.stats.ener / 5)
  }

  get sd () {
    return (this.level === 1)
      ? this.stats.sd
      : this.stats.sd + (1.2 * this.level) + (1 * this.defense / 2)
  }
}

module.exports = Wizard
