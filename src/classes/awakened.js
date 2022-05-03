const Character = require('./character')
const { CLASSES, CHARACTER_TYPES } = require('../utils/constants')
const Knight = require('./knight')
const Wizard = require('./wizard')
const Elf = require('./elf')

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

    this.init(params, newClass)
  }

  init (params, newClass) {
    // Set the basic skill from previous Class
    switch (params.class) {
    case CLASSES.WIZARD:
      this.energyball = params.energyball
      break
    case CLASSES.KNIGHT:
      this.ragefulblow = params.ragefulblow
      break
    case CLASSES.ELF:
      this.shoot = params.shoot
      break
    default: break
    }

    // Set the Awakened Skills
    let temp
    switch (newClass) {
    case CLASSES.KNIGHT:
      temp = new Knight({ name: 'temp' })
      this.createSkill('ragefulblow', temp.ragefulblow)
      this.setBasicSkill('ragefulblow')
      break
    case CLASSES.WIZARD:
      temp = new Wizard({ name: 'temp' })
      this.createSkill('energyball', temp.energyball)
      this.setBasicSkill('energyball')
      break
    case CLASSES.ELF:
      temp = new Elf({ name: 'temp' })
      this.createSkill('shoot', temp.shoot)
      this.setBasicSkill('shoot')
      break
    default: break
    }

    temp = null

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
