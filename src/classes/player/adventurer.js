const Character = require('./character')

/**
 * A set of Character definitions that usually inhabits the World
 */
class Adventurer extends Character {
  constructor (params) {
    super(params)

    this.maxStats = {
      str: 1000,
      agi: 1000,
      vit: 1000,
      ener: 1000
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
