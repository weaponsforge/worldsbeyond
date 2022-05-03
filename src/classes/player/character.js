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
    this.skills = params.skills ?? ['walk', 'run', 'strike']
    this.skill_basic = ''

    this.stats = params.stats ?? {
      str: 10,
      agi: 10,
      vit: 10,
      ener: 10
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

  // Basic attack skill
  strike () {
    if (this.skill_basic === '') {
      console.log('---strike!')
    } else {
      if (this[this.skill_basic] === undefined) {
        throw new Error('Undefined skill.')
      }

      this[this.skill_basic].cast()
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
   * @param {Object} params { name, level, server, guild, class, skill_basic }
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
   * Set the basic (strike) skill
   * @param {String} skill - Skill name
   */
  setBasicSkill (skill) {
    if (!this.skills.includes(skill)) {
      throw new Error('Undefined skill.')
    }

    this.skill_basic = skill
  }

  /**
   * Create a new skill
   * @param {Skill} skill - Class definition of a new skill
   */
  createSkill (skill) {
    if (this.level < skill.lvl_reqt) {
      throw new Error(`Skill [${skill.name}] Level requirement not sufficient.`)
    }

    if (!skill.classes.includes(this.class)) {
      throw new Error(`Class [${this.class}] cannot learn this skill.`)
    }

    this[skill.name] = skill
    this.skills.push(skill.name)
  }

  showSkills () {
    console.log(`[ ${this.skills.toString().split(',').join(' | ')} ]`)
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
