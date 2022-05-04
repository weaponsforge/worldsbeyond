const { CHARACTER_TYPES, POINTS_PER_LEVEL } = require('../../utils/constants')

/**
 * Base Class of all Character classes.
 * Somewhat follows Mu Online's game formulas and calculations.
 */
class Character {
  constructor (params) {
    if (params === undefined) {
      throw new Error('Missing parameters.')
    }

    if (params.name === undefined) {
      throw new Error('Must provide a character name.')
    }

    /** Character Name */
    this.name = params.name
    /** Character Level (max: 400) */
    this.level = params.level ?? 1
    /** Character Class */
    this.class = params.class ?? 'player'
    /** Server Name */
    this.server = params.server ?? 'bahr'
    /** Guild Name */
    this.guild = params.guild ?? ''
    /** Character Classes (max 2 values if Awakened) */
    this.paths = [this.class]
    /** Character Skills List */
    this.skills = params.skills ?? ['walk', 'run', 'attack', 'skill_attack']
    /** Current Active Skill */
    this.skill_active = ''

    this.stats = params.stats ?? {
      /** Strength */
      str: 10,
      /** Agility */
      agi: 10,
      /** Vitality */
      vit: 10,
      /** Energy */
      ener: 10,
      /** Health Points */
      hp: 1,
      /** Mana Points */
      mana: 1,
      /** Ability Gauge */
      ag: 1,
      /** Shield Defense */
      sd: 1,
      /** Attack Success Rate (experimental) */
      asr: 1,
      /** Final Damage (experimental) */
      dmg: 1
    }

    // List of MAIN stats. Sets the values of other (sub) stats
    this.mainstats = ['str', 'agi', 'vit', 'ener']

    // Stats that mutate during battles
    this.activestats = {
      hp: 'vit',
      mana: 'ener',
      ag: 'agi', // str, agi, vit, ener
      sd: 'def'
    }

    // Attack Formulas
    this.stats_atk = {
      /** Maximum Physical Attack */
      maxAtk: 1,
      /** Minimum Physical Attack */
      minAtk: 1,
      /** Maximum Wizardry Power */
      maxWizPower: 1,
      /** Minimum Wizardry Power */
      minWizPower: 1,
      /** Attack Success Rate (Physical Attack) */
      atkRate: 1,
      /** Attack Speed (Physical Attack) */
      atkSpeed: 1,
      /** Maximum Elemental Attack Power (Elemental Attack) */
      maxElemAtk: 1,
      /** Minimum Elemental Attack Power (Elemental Attack) */
      minElemAtk: 1,
      /** Attack Success Rate (Elemental) */
      elemAtkRate: 1
    }

    // Defense Formulas
    this.stats_def = {
      /** Physical Defense */
      def: 1,
      /** Physical Defense Success Rate */
      defRate: 1,
      /** Elemental Defense */
      elemDef: 1,
      /** Elemental Defense Rate ww */
      elemDefRate: 1
    }

    this.points = 0
  }

  // Set the Attack and Defense values.
  // Override this method per Character Class.
  setStats () {
    this.stats.sd += (1.2 * this.level) + (1.2 * this.stats_def.def / 2)
    /*
    // Defense
    this.stats_def.def = ?
    this.stats_def.defRate = ?
    this.stats_def.elemDef = ?
    this.stats_def.elemDefRate = ?

    // Attack
    this.stats_atk.maxAtk = ?
    this.stats_atk.minAtk = ?
    this.stats_atk.maxWizPower = ?
    this.stats_atk.minWizPower = ?
    this.stats_atk.atkRate = ?
    this.stats_atk.atkSpeed = ?
    this.stats_atk.maxElemAtk = ?
    this.stats_atk.minElemAtk = ?
    this.stats_atk.elemAtkRate = ?
    */
  }

  // Set the Active stats values
  // Override this method per Character Class
  setActiveStat (stat, points) {
    // sd plus 1.2 per every applied stat point
    this.stats.sd += (1.2 * points)

    /*
    switch (stat) {
      case 'hp':
        this.stats.hp += ?
        break
      case 'mana':
        this.stats.mana += ?
        break
      case 'ag':
        this.stats.ag += ?
        break
      case 'sd':
        this.stats.sd += ?
        break
      default: break
    }
    */
  }

  // Set the Ability Gauge
  setStatAG () {
    this.stats.ag += (1 * this.stats.str / 3) + (1 * this.stats.agi / 5) + (1 * this.stats.vit / 3) + (1 * this.stats.ener / 5)
  }

  // Normal (Physical) attack
  attack () {
    this.stats.asr = this.attackSuccessRate()
    this.stats.dmg = this.stats_atk.maxAtk
    console.log(`[${this.name}] attacking, dmg: ${this.stats.dmg}, asr: ${this.stats.asr}%`)
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
        allow = (this.stats.mana - this[this.skill_active].mana_cost > 0)
      }

      if (allow) {
        this.stats.asr = this.attackSuccessRate()
        this.stats.dmg = (this.stats_atk.maxWizPower !== 0) ? this.stats_atk.maxWizPower : this.stats_atk.maxElemAtk
        this[this.skill_active].cast()
        console.log(`[${this.name}] attacking, dmg: ${this.stats.dmg}, asr: ${this.stats.asr}%`)
      } else {
        console.log('Insufficient mana. Cannot cast skill.')
        this.attack()
      }
    }
  }

  /**
   * Update (increment/decrement) a (main) stat point
   * @param {String} stat - Stat name (str, agi, vit, ener)
   * @param {Number} points - (+/-) Number values
   * @param {Bool} usePoints - Flag to use the accumulated "this.points" during level-up
   */
  updateStats (stat, points, usePoints = false) {
    if (!this.mainstats.includes(stat)) {
      throw new Error(`[${stat}] Not a main stat.`)
    }

    if (usePoints) {
      const temp = this.points - points
      if (temp >= 0) {
        this.points -= points
        this.stats[stat] += points
        this.setActiveStat(stat, points)
        this.setStats()
      } else {
        throw new Error('Insufficient level-up points.')
      }
    } else {
      this.stats[stat] = points
    }
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
        if (item === 'level') {
          const increment = Math.abs(this.level - params[item])
          this.points += POINTS_PER_LEVEL * increment * ((params[item] - this.level > 0) ? 1 : -1)
          this[item] = params[item]

          this.setStats()
        } else {
          this[item] = params[item]
        }
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
    this.stats_atk.maxWizPower = (1 * (this.stats.ener / 4)) + this[skill].damage * 1.5
    this.stats_atk.minWizPower = (1 * (this.stats.ener / 9)) + this[skill].damage
  }

  takeDamge (damage) {
    this.stats.hp -= damage
    console.log(`[${this.name}] take damage ${damage}, hp: ${this.stats.hp}`)
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
    return Math.random() * (max - min) + min
  }

  isDefeated () {
    if (this.class === CHARACTER_TYPES.PLAYER) {
      // Immortal ^_^
      return false
    } else {
      return this.stats.hp <= 0
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
