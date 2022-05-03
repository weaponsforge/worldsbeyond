const Enemy = require('./enemy')

class Spider extends Enemy {
  constructor (params) {
    super({ ...params, name: 'Spider' })

    this.activeStats = {
      dmg: 2 * this.level,
      hp: 20 * this.level,
      ener: 10 * this.level,
      asr: 0
    }
  }
}

module.exports = Spider
