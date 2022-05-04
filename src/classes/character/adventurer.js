const Character = require('./character')

/**
 * A set of Character definitions that usually inhabits the World
 */
class Adventurer extends Character {
  constructor (params) {
    super(params)

    this.maxStats = {
      str: 2000,
      agi: 2000,
      vit: 2000,
      ener: 2000
    }
  }

  setMainStat (stat, points, usePoints = false) {
    if (this.stats[stat] === undefined) {
      throw new Error('Undefined stat.')
    }

    if ((this.stats[stat] + points) > this.maxStats[stat]) {
      throw new Error('Cannot increase stat further.')
    }

    super.setMainStat(stat, points, usePoints)
  }
}

module.exports = Adventurer
