const Adventurer = require('./adventurer')
const { managlaive, energyball } = require('../skill')
const { CLASSES } = require('../../utils/constants')

class Wizard extends Adventurer {
  constructor (params) {
    super({ ...params, class: CLASSES.WIZARD })
    this.createSkill(energyball)
    this.setActiveSkill(energyball.name)

    this.stats = {
      str: 30,
      agi: 30,
      vit: 20,
      ener: 200
    }

    this.activeStats.mana = this.stats.ener
    this.activeStats.hp = this.stats.vit
  }

  set (params) {
    super.set(params)

    if (this.level === 5 && !this.skills.includes('managlaive')) {
      console.log('Get MANAGLAIVE!')
      this.createSkill(managlaive)
    }
  }
}

module.exports = Wizard
