const Adventurer = require('./adventurer')
const { CLASSES } = require('../../utils/constants')

class Knight extends Adventurer {
  constructor (params) {
    super({ ...params, class: CLASSES.KNIGHT })
    this.skills.push('ragefulblow')

    this.stats = {
      str: 180,
      agi: 50,
      vit: 30,
      ener: 30
    }
  }

  ragefulblow () {
    console.log('---rageful blow!')
  }

  strike () {
    this.ragefulblow()
  }
}

module.exports = Knight
