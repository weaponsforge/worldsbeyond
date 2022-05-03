const Adventurer = require('./adventurer')

class Wizard extends Adventurer {
  constructor (params) {
    super({ ...params, class: 'wizard' })

    this.stats = {
      str: 30,
      agi: 30,
      vit: 20,
      ener: 180
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
