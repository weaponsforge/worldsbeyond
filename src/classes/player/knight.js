const Adventurer = require('./adventurer')
const { ragefulblow } = require('../skill')
const { CLASSES } = require('../../utils/constants')

class Knight extends Adventurer {
  constructor (params) {
    super({ ...params, class: CLASSES.KNIGHT })
    this.createSkill(ragefulblow)
    this.setActiveSkill(ragefulblow.name)

    this.stats = {
      str: 180,
      agi: 50,
      vit: 30,
      ener: 30
    }

    this.activeStats.mana = this.stats.ener
    this.activeStats.hp = this.stats.vit
  }
}

module.exports = Knight
