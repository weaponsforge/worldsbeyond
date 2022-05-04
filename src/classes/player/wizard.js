const Adventurer = require('./adventurer')
const { managlaive, energyball } = require('../skill')
const { CLASSES } = require('../../utils/constants')

class Wizard extends Adventurer {
  constructor (params) {
    super({ ...params, class: CLASSES.WIZARD })
    this.createSkill(energyball)
    this.setActiveSkill(energyball.name)

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

    this.setStats()
  }

  set (params) {
    super.set(params)

    if (this.level >= 5 && !this.skills.includes('managlaive')) {
      console.log('Get MANAGLAIVE!')
      this.createSkill(managlaive)
    }
  }

  setStats () {
    super.setStats()

    // Defense
    this.stats_def.def = 1 * (this.stats.agi / 4)
    this.stats_def.defRate = 1 * (this.stats.agi / 3)
    this.stats_def.elemDef = 1 * (this.stats.agi / 4)
    this.stats_def.elemDefRate = 1 * (this.stats.agi / 3)

    // Attack
    this.stats_atk.maxAtk = 1 * (this.stats.str / 4)
    this.stats_atk.minAtk = 1 * (this.stats.str / 8)
    this.stats_atk.maxWizPower = (1 * this.stats.ener / 4) + (this[this.skill_active].baseDamage * 1.5)
    this.stats_atk.minWizPower = (1 * this.stats.ener / 9) + (this[this.skill_active].baseDamage * 1.5)
    this.stats_atk.atkRate = (this.level / 5) + (1.5 * this.stats.agi) + (1 * this.stats.str / 4)
    this.stats_atk.atkSpeed = 1 * (this.stats.agi / 10)
    this.stats_atk.maxElemAtk = 1 * (this.stats.ener / 6)
    this.stats_atk.minElemAtk = 1 * (this.stats.ener / 9)
    this.stats_atk.elemAtkRate = (5 * this.level) + (1.5 * this.stats.agi) + (1 * this.stats.str / 4)
  }

  setActiveStat (stat, points) {
    super.setActiveStat(stat, points)

    if (stat === 'vit') {
      this.stats.hp += (1 * this.level) + (1 * this.stats.vit)
      this.setStatAG()
    }

    if (stat === 'ener') {
      this.stats.mana += (2 * this.level) + (2 * this.stats.ener)
      this.setStatAG()
    }

    if (['str', 'agi'].includes(stat)) {
      this.setStatAG()
    }
  }
}

module.exports = Wizard
