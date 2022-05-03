const Enemy = require('./enemy')

class Spider extends Enemy {
  constructor () {
    super({ name: 'Spider' })
    this.activeStats = {
      dmg: 2,
      hp: 20,
      ener: 10,
      asr: 0
    }
  }
}

module.exports = Spider
