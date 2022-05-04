const Adventurer = require('./adventurer')
const { ragefulblow } = require('../skill')
const { CLASSES } = require('../../utils/constants')

class Knight extends Adventurer {
  constructor (params) {
    super({ ...params, class: CLASSES.KNIGHT })
    this.createSkill(ragefulblow)
    this.setActiveSkill(ragefulblow.name)

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
  }

  setStats () {
    super.setStats()

    // Defense
    this.stats_def.def = 1 * (this.stats.agi / 3)
    this.stats_def.defRate = 1 * (this.stats.agi / 3)
    this.stats_def.elemDef = 1 * (this.stats.agi / 3)
    this.stats_def.elemDefRate = 1 * (this.stats.agi / 3)

    // Attack
    this.stats_atk.maxAtk = 1 * (this.stats.str / 4)
    this.stats_atk.minAtk = 1 * (this.stats.str / 6)
    this.stats_atk.maxWizPower = (1 * this.stats.ener / 4) + (this[this.skill_active].baseDamage * 1.5)
    this.stats_atk.minWizPower = (1 * this.stats.ener / 9) + (this[this.skill_active].baseDamage * 1.5)
    this.stats_atk.atkRate = (this.level / 5) + (1.5 * this.stats.agi) + (1 * this.stats.str / 4) // same
    this.stats_atk.atkSpeed = 1 * (this.stats.agi / 15)
    this.stats_atk.maxElemAtk = 1 * (this.stats.ener / 4)
    this.stats_atk.minElemAtk = 1 * (this.stats.ener / 6)
    this.stats_atk.elemAtkRate = (5 * this.level) + (1.5 * this.stats.agi) + (1 * this.stats.str / 4) // same
  }

  setActiveStat (stat, points) {
    super.setActiveStat(stat, points)

    if (stat === 'vit') {
      this.stats.hp += (2 * this.level) + (3 * this.stats.vit)
      this.setStatAG()
    }

    if (stat === 'ener') {
      this.stats.mana += (1 * this.level) + (1 * this.stats.ener)
      this.setStatAG()
    }

    if (['str', 'agi'].includes(stat)) {
      this.setStatAG()
    }
  }
}

module.exports = Knight
