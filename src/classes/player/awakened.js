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

    this.stats = {
      str: 36,
      agi: 36,
      vit: 30,
      ener: 60,
      hp: 120,
      mana: 120,
      ag: 42,
      sd: 150,
      dmg: 0,
      asr: 0
    }

    this.init(params, newClass)
  }

  get defense () {
    return (this.stats.agi / 2)
  }

  get defenseRate () {
    return 1 * (this.stats.agi / 1.5)
  }

  get elemDef () {
    return 1 * (this.stats.agi / 2)
  }

  get elemDefRate () {
    return 1 * (this.stats.agi / 1.5)
  }

  get maxAtk () {
    return 1 * (this.stats.str / 2)
  }

  get minAtk () {
    return 1 * (this.stats.str / 4)
  }

  get maxWizPower () {
    return (1 * this.stats.ener / 2) + (this[this.active_skill].finalDamage() * 0.5)
  }

  get minWizPower () {
    return (1 * this.stats.ener / 4) + this[this.active_skill].finalDamage()
  }

  get atkRate () {
    return (this.level / 2) + (0.5 * this.stats.agi) + (1 * this.stats.str / 2)
  }

  get atkSpeed () {
    return 1 * (this.stats.agi / 5)
  }

  get maxElemAtk () {
    return 1 * (this.stats.ener / 5)
  }

  get minElemAtk () {
    return 1 * (this.stats.ener / 5)
  }

  get elemAtkRate () {
    return (5 * this.level) + (1.5 * this.stats.agi) + (1 * this.stats.str / 4)
  }

  get hp () {
    return (this.level === 1)
      ? this.stats.hp
      : this.stats.hp + (1 * this.level) + (1 * this.stats.vit)
  }

  get mana () {
    return (this.level === 1)
      ? this.stats.mana
      : this.stats.mana + (2 * this.level) + (2 * this.stats.ener)
  }

  get ag () {
    return (this.level === 1)
      ? this.stats.ag
      : this.stats.ag + (1 * this.stats.str / 5) + (0.4 * this.stats.agi) + (1 * this.stats.vit / 3) + (1 * this.stats.ener / 5)
  }

  get sd () {
    return (this.level === 1)
      ? this.stats.sd
      : this.stats.sd + (1.2 * this.level) + (1 * this.defense / 2)
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
      this.setActiveSkill(ragefulblow.name)
      break
    case CLASSES.WIZARD:
      temp = new Wizard({ name: 'temp' })
      this.createSkill(energyball)
      this.setActiveSkill(energyball.name)
      break
    case CLASSES.ELF:
      temp = new Elf({ name: 'temp' })
      this.createSkill(shoot)
      this.setActiveSkill(shoot.name)
      break
    default: break
    }

    this.updateActiveSkill()

    // Increment the Awakened stats
    Object.keys(this.stats).forEach(item => {
      const bonus = 400
      const tempStat = temp.stats[item] + bonus
      this.stats[item] = tempStat
    })

    temp = null
    super.init()
  }

  setMainStat (stat, points) {
    if (this.stats[stat] === undefined) {
      throw new Error('Undefined stat.')
    }

    if ((this.stats[stat] + points) > this.maxStats[stat]) {
      throw new Error('Cannot increase stat further.')
    }

    super.setMainStat(stat, points)
  }
}

module.exports = Awakened
