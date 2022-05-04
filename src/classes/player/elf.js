const Adventurer = require('./adventurer')
const { shoot } = require('../skill')
const { CLASSES } = require('../../utils/constants')

class Elf extends Adventurer {
  constructor (params) {
    super({ ...params, class: CLASSES.ELF })
    this.createSkill(shoot)
    this.setActiveSkill(shoot.name)

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
  }

  setStats () {
    super.setStats()

    // Defense
    this.stats_def.def = 1 * (this.stats.agi / 10)
    this.stats_def.defRate = 1 * (this.stats.agi / 4)
    this.stats_def.elemDef = 1 * (this.stats.agi / 10)
    this.stats_def.elemDefRate = 1 * (this.stats.agi / 4)

    // Attack
    this.stats_atk.maxAtk = 1 * (this.stats.str / 4)
    this.stats_atk.minAtk = 1 * (this.stats.str / 4)
    this.stats_atk.maxWizPower = 0
    this.stats_atk.minWizPower = 0
    this.stats_atk.atkRate = (this.level / 5) + (1.5 * this.stats.agi) + (1 * this.stats.str / 4) // same
    this.stats_atk.atkSpeed = 1 * (this.stats.agi / 50)
    this.stats_atk.maxElemAtk = (1 * (this.stats.agi / 4)) + (1 * (this.stats.str / 8))
    this.stats_atk.minElemAtk = (1 * (this.stats.agi / 8)) + (1 * (this.stats.str / 14))
    this.stats_atk.elemAtkRate = (5 * this.level) + (1.5 * this.stats.agi) + (1 * this.stats.str / 4) // same
  }

  setActiveStat (stat, points) {
    super.setActiveStat(stat, points)

    if (stat === 'vit') {
      this.stats.hp += (1 * this.level) + (2 * this.stats.vit)
      this.setStatAG()
    }

    if (stat === 'ener') {
      this.stats.mana += (1.5 * this.level) + (1.5 * this.stats.ener)
      this.setStatAG()
    }

    if (['str', 'agi'].includes(stat)) {
      this.setStatAG()
    }
  }
}

module.exports = Elf
