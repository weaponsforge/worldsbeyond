const Adventurer = require('./adventurer')
const { shoot } = require('../skill')
const { CLASSES } = require('../../utils/constants')

class Elf extends Adventurer {
  constructor (params) {
    super({ ...params, class: CLASSES.ELF })

    this.stats = {
      str: 22,
      agi: 25,
      vit: 20,
      ener: 15,
      hp: 80,
      mana: 30,
      ag: 30,
      sd: 99,
      dmg: 0,
      asr: 0
    }

    this.createSkill(shoot)
    this.setActiveSkill(shoot.name)
    this.updateActiveSkill()
    this.init()
  }

  get defense () {
    return 1 * (this.stats.agi / 10)
  }

  get defenseRate () {
    return 1 * (this.stats.agi / 4)
  }

  get elemDef () {
    return 1 * (this.stats.agi / 10)
  }

  get elemDefRate () {
    return 1 * (this.stats.agi / 4)
  }

  get maxAtk () {
    return 1 * (this.stats.str / 4)
  }

  get minAtk () {
    return 1 * (this.stats.str / 4)
  }

  get maxWizPower () {
    return 0
  }

  get minWizPower () {
    return 0
  }

  get atkRate () {
    return (this.level / 5) + (1.5 * this.stats.agi) + (1 * this.stats.str / 4)
  }

  get atkSpeed () {
    return 1 * (this.stats.agi / 50)
  }

  get maxElemAtk () {
    return (1 * (this.stats.agi / 4)) + (1 * (this.stats.str / 8))
  }

  get minElemAtk () {
    return 1 * (1 * (this.stats.agi / 8)) + (1 * (this.stats.str / 14))
  }

  get elemAtkRate () {
    return (5 * this.level) + (1.5 * this.stats.agi) + (1 * this.stats.str / 4)
  }

  get hp () {
    return (this.level === 1)
      ? this.stats.hp
      : this.stats.hp + (1 * this.level) + (2 * this.stats.vit)
  }

  get mana () {
    return (this.level === 1)
      ? this.stats.mana
      : this.stats.mana + (1.5 * this.level) + (1.5 * this.stats.ener)
  }

  get ag () {
    return (this.level === 1)
      ? this.stats.ag
      : this.stats.ag + (1 * this.stats.str / 3) + (1 * this.stats.agi / 5) + (1 * this.stats.vit / 3) + (1 * this.stats.ener / 5)
  }

  get sd () {
    return (this.level === 1)
      ? this.stats.sd
      : this.stats.sd + (1.2 * this.level) + (1 * this.defense / 2)
  }
}

module.exports = Elf
