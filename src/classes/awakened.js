const Character = require('./character')
const { CLASSES, CHARACTER_TYPES } = require('../utils/constants')

/**
 * A set of Character definitions that has finished Awakening, and thus can become another Class
 * while retaining the previous Class characteristics and abiliies.
 * Can learn at most (2) Classes (paths)
 */
class Awakened extends Character {
  constructor (params, newClass) {
    if (newClass === undefined) {
      throw new Error('Must specify a new Class.')
    }

    if (!Object.values(CLASSES).includes(newClass)) {
      throw new Error(`Undefined Class, "${newClass}"`)
    }

    if (newClass === params.class) {
      throw new Error('Must select a new Class.')
    }

    if (params.paths.length >= 2) {
      throw new Error('Max Awakening achieved.')
    }

    super(params)

    this.maxStats = {
      str: 2000,
      agi: 2000,
      vit: 2000,
      ener: 2000
    }

    this.class = CHARACTER_TYPES.AWAKENED
    this.paths.push(newClass)
  }

  updateStats (stat, points) {
    if (this.stats[stat] === undefined) {
      throw new Error('Undefined stat.')
    }

    if ((this.stats[stat] + points) > this.maxStats[stat]) {
      throw new Error('Cannot increase stat further.')
    }

    super.updateStats(stat, points)
  }
}

module.exports = Awakened
