const Character = require('./character')
const {
  CLASSES,
  CHARACTER_TYPES,
  SKILLS_WIZARD, SKILLS_KNIGHT, SKILLS_ELF
} = require('../../utils/constants')

// Classes
const Knight = require('./knight')
const Wizard = require('./wizard')
const Elf = require('./elf')

// Skills
const {
  energyball, ragefulblow, shoot
} = require('../skill')

/**
 * A set of Character definitions for players that has finished Awakening.
 * Awakened Characters can learn the skills of another Class while retaining their
 * previous Class characteristics and abiliies.
 * Awakened Characters can learn at most (2) Classes (paths)
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
    this.class = CHARACTER_TYPES.AWAKENED
    this.paths.push(newClass)
    let skills = []

    // Copy the skills from previous Class
    switch (params.class) {
    case CLASSES.WIZARD:
      skills = Object.values(SKILLS_WIZARD)
      break
    case CLASSES.KNIGHT:
      skills = Object.values(SKILLS_KNIGHT)
      break
    case CLASSES.ELF:
      skills = Object.values(SKILLS_ELF)
      break
    default: break
    }

    skills.forEach(skill => {
      if (params[skill] !== undefined) {
        this[skill] = params[skill]
      }
    })

    // Set the Awakened (Basic) Skills
    let temp
    switch (newClass) {
    case CLASSES.KNIGHT:
      temp = new Knight({ name: 'temp' })
      this.createSkill(ragefulblow)
      this.setBasicSkill(ragefulblow.name)
      break
    case CLASSES.WIZARD:
      temp = new Wizard({ name: 'temp' })
      this.createSkill(energyball)
      this.setBasicSkill(energyball.name)
      break
    case CLASSES.ELF:
      temp = new Elf({ name: 'temp' })
      this.createSkill(shoot)
      this.setBasicSkill(shoot.name)
      break
    default: break
    }

    // Increment the Awakened stats
    Object.keys(temp.stats).forEach(item => {
      const bonus = 400
      const tempStat = temp.stats[item] + bonus
      this.updateStats(item, tempStat)
    })

    temp = null
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
