const { CHARACTER_TYPES } = require('../../utils/constants')

/**
 * Base Class of all Character classes
 */
class Character {
  constructor (params) {
    if (params === undefined) {
      throw new Error('Missing parameters.')
    }

    if (params.name === undefined) {
      throw new Error('Must provide a character name.')
    }

    this.name = params.name
    this.level = params.level ?? 1
    this.server = params.server ?? 'bahr'
    this.guild = params.guild ?? ''
    this.class = params.class ?? 'player'
    this.paths = [this.class]
    this.skills = params.skills ?? ['walk', 'run', 'attack', 'skill_attack']
    this.skill_active = ''

    this.stats = params.stats ?? {
      str: 10,
      agi: 10,
      vit: 10,
      ener: 10
    }

    this.activeStats = {
      dmg: 1,
      mana: 10,
      hp: 10,
      asr: 0
    }
  }

  // Move towards a specified direction
  walk () {
    console.log('---walking...')
  }

  // Move faster towards a specified direction
  run () {
    console.log('---running...')
  }

  // Normal attack
  attack () {
    this.activeStats.dmg = this.normalAttackDmg()
    this.activeStats.asr = this.attackSuccessRate()
    console.log(`---attack: ${this.name}`)
    console.log(this.name, this.activeStats)
  }

  // Active skill attack
  skill_attack () {
    if (this.skill_active === '') {
      this.attack()
    } else {
      if (this[this.skill_active] === undefined) {
        throw new Error('Undefined skill.')
      }

      let allow = (this.class === CHARACTER_TYPES.PLAYER)
      if (this.class !== CHARACTER_TYPES.PLAYER) {
        allow = (this.activeStats.mana - this[this.skill_active].mana_cost > 0)
      }

      if (allow) {
        this.activeStats.dmg = this[this.skill_active].damage
        this.activeStats.mana -= this[this.skill_active].mana_cost
        this.activeStats.asr = this.attackSuccessRate()
        this[this.skill_active].cast()
        console.log(this.name, this.activeStats)
      } else {
        console.log('Insufficient mana. Cannot cast skill.')
        this.attack()
      }
    }
  }

  /**
   * Update (increment/decrement) a stat point
   * @param {String} stat Stat name (str, agi, vit, ener)
   * @param {Number} points (+/-) Number values
   */
  updateStats (stat, points) {
    if (this.stats[stat] === undefined) {
      throw new Error('Undefined stat.')
    }

    this.stats[stat] += points
  }

  /**
   * Set the values of first-level Object properties
   * @param {Object} params { name, level, server, guild, class, skill_active }
   */
  set (params) {
    if (params === undefined) {
      throw new Error('Undefined parameters')
    }

    const fields = ['stats', 'maxStats', 'paths', 'skills']
    const keys = Object.keys(params)

    if (keys.length > Object.keys(this).length) {
      throw new Error('Too many parameters.')
    }

    keys.forEach(item => {
      if (this[item] !== undefined && !fields.includes(item)) {
        this[item] = params[item]
      } else {
        throw new Error(`Invalid parameter '${item}'`)
      }
    })
  }

  /**
   * Set the basic (skill_attack) skill
   * @param {String} skill - Skill name
   */
  setActiveSkill (skill) {
    if (typeof skill !== 'string') {
      throw new Error('Invalid parameter type.')
    }

    if (!this.skills.includes(skill)) {
      throw new Error('Undefined skill.')
    }

    this.skill_active = skill
  }

  takeDamge (damage) {
    this.activeStats.hp -= damage
    console.log(`[${this.name}] take damage ${damage}, hp: ${this.activeStats.hp}`)
  }

  /**
   * Create a new skill
   * @param {Skill} skill - Class definition of a new skill
   */
  createSkill (skill) {
    let allowed = (this.class === CHARACTER_TYPES.PLAYER)
    let errMsg = ''

    if (this.class !== CHARACTER_TYPES.PLAYER) {
      allowed = true

      if (this.level < skill.lvl_reqt) {
        errMsg += `Skill [${skill.name}] Level requirement not sufficient.`
        allowed = false
      }

      if (!skill.classes.includes(this.class)) {
        errMsg += `\nClass [${this.class}] cannot learn this skill.`
        allowed = false
      }
    }

    if (allowed) {
      this[skill.name] = skill
      this.skills.push(skill.name)
    } else {
      throw new Error(errMsg)
    }
  }

  showSkills () {
    console.log(`[ ${this.skills.toString().split(',').join(' | ')} ]`)
  }

  attackSuccessRate () {
    const max = 100
    const min = 1
    return Math.floor(Math.random() * (max - min) + min)
  }

  normalAttackDmg () {
    return 1
  }

  isDefeated () {
    if (this.class === CHARACTER_TYPES.PLAYER) {
      // Immortal ^_^
      return false
    } else {
      return this.activeStats.hp <= 0
    }
  }

  get () {
    return this
  }

  log () {
    console.log(`CHARACTER [${this.class}] "${this.name}"`)
    console.log(this)
  }
}

module.exports = Character
