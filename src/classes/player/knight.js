const Adventurer = require('./adventurer')
const { ragefulblow } = require('../skill')
const { CLASSES } = require('../../utils/constants')

class Knight extends Adventurer {
  constructor (params) {
    super({ ...params, class: CLASSES.KNIGHT })
    this.createSkill(ragefulblow)

    this.stats = {
      str: 180,
      agi: 50,
      vit: 30,
      ener: 30
    }
  }

  strike () {
    this.RagefulBlow.cast()
  }
}

module.exports = Knight
