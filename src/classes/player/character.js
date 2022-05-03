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
    this.paths = params.class ? [params.class] : [this.class]
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

      this[this.skill_basic]()
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

    const fields = Object.keys(this)
    const keys = Object.keys(params)

    fields.splice(fields.indexOf('stats'), 1)
    fields.splice(fields.indexOf('maxStats'), 1)
    fields.splice(fields.indexOf('paths'), 1)
    fields.splice(fields.indexOf('skills'), 1)

    if (!keys.every(x => fields.includes(x))) {
      throw new Error('Invalid parameter(s).')
    }

    fields.forEach(item => {
      if (params[item] !== undefined) {
        this[item] = params[item]
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
   * @param {String} skillName
   * @param {Function} skill - Function definition of a new skill
   */
  createSkill (skillName, skill) {
    this[skillName] = skill
    this.skills.push(skillName)
  }

  log () {
    console.log(`CHARACTER [${this.class}] "${this.name}"`)
    console.log(this)
  }
}

module.exports = Character
