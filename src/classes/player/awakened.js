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
    this.setStats()
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

    // Increment the Awakened stats
    this.mainstats.forEach(item => {
      const bonus = 400
      const tempStat = temp.stats[item] + bonus
      this.stats[item] = tempStat
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

  setStats () {
    super.setStats()

    // Defense
    this.stats_def.def = 1 * (this.stats.agi / 4)
    this.stats_def.defRate = 1 * (this.stats.agi / 3)
    this.stats_def.elemDef = 1 * (this.stats.agi / 4)
    this.stats_def.elemDefRate = 1 * (this.stats.agi / 3)

    // Attack
    this.stats_atk.maxAtk = 1 * (this.stats.str / 8)
    this.stats_atk.minAtk = 1 * (this.stats.str / 16)
    this.stats_atk.maxWizPower = (1 * this.stats.ener / 8) + (this[this.skill_active].baseDamage * 3)
    this.stats_atk.minWizPower = (1 * this.stats.ener / 18) + (this[this.skill_active].baseDamage * 3)
    this.stats_atk.atkRate = (this.level / 10) + (3 * this.stats.agi) + (1 * this.stats.str / 8)
    this.stats_atk.atkSpeed = 1 * (this.stats.agi / 15)
    this.stats_atk.maxElemAtk = 1 * (this.stats.ener / 12)
    this.stats_atk.minElemAtk = 1 * (this.stats.ener / 18)
    this.stats_atk.elemAtkRate = (10 * this.level) + (3 * this.stats.agi) + (1 * this.stats.str / 8)
  }

  setActiveStat (stat, points) {
    super.setActiveStat(stat, points)

    if (stat === 'vit') {
      this.stats.hp += (1 * this.level) + (1 * this.stats.vit)
      this.setStatAG()
    }

    if (stat === 'ener') {
      this.stats.mana += (2 * this.level) + (2 * this.stats.ener)
      this.setStatAG()
    }

    if (['str', 'agi'].includes(stat)) {
      this.setStatAG()
    }
  }
}

module.exports = Awakened
