const Adventurer = require('./adventurer')
const { CLASSES } = require('../../utils/constants')

class Wizard extends Adventurer {
  constructor (params) {
    super({ ...params, class: CLASSES.WIZARD })
    this.skills.push('energyball')

    this.stats = {
      str: 30,
      agi: 30,
      vit: 20,
      ener: 200
    }
  }

  energyball () {
    console.log('---energyball!')
  }

  strike () {
    this.energyball()
  }
}

module.exports = Wizard
