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
    this.skills = params.skills ?? []

    /** Current Active Skill */
    this.skill_active = ''

    /** Accumulated points rewarded from leveling up */
    this.levelup_points = 0

    /** Base Stats for reference only.
     * Use the getters to get updated values everytime. */
    this.stats = {
      /** Strength */
      str: 1,
      /** Agility */
      agi: 1,
      /** Vitality */
      vit: 1,
      /** Energy */
      ener: 1,
      /** Health Points */
      hp: 1,
      /** Mana Points */
      mana: 1,
      /** Ability Gauge */
      ag: 1,
      /** Shield Defense */
      sd: 1
    }

    // Dynamic, mutable stats
    this.battle = {
      hp: 1,
      /** Mana Points */
      mana: 1,
      /** Ability Gauge */
      ag: 1,
      /** Shield Defense */
      sd: 1,
      /** Attack Success Rate (experimental) */
      asr: 0,
      /** Final Damage (experimental) */
      dmg: 0
    }
  }

  /** Physical Defense */
  get defense () { return 0 }

  /** Physical Defense Success Rate */
  get defenseRate () { return 0 }

  /** Elemental Defense */
  get elemDef () { return 0 }

  /** Elemental Defense Rate */
  get elemDefRate () { return 0 }

  /** Maximum Physical Attack */
  get maxAtk () { return 0 }

  /** Minimum Physical Attack */
  get minAtk () { return 0 }

  /** Maximum Wizardry Power */
  get maxWizPower () { return 0 }

  /** Minimum Wizardry Power */
  get minWizPower () { return 0 }

  /** Attack Success Rate (Physical Attack) */
  get atkRate () { return 0 }

  /** Attack Speed (Physical Attack) */
  get atkSpeed () { return 0 }

  /** Maximum Elemental Attack Power (Elemental Attack) */
  get maxElemAtk () { return 0 }

  /** Minimum Elemental Attack Power (Elemental Attack) */
  get minElemAtk () { return 0 }

  /** Attack Success Rate (Elemental) */
  get elemAtkRate () { return 0 }

  /** Max Health Points */
  get hp () { return 0 }

  /** Max Mana Points */
  get mana () { return 0 }

  /** Max Ability Gauge */
  get ag () { return 0 }

  /** Max Shield Defense */
  get sd () { return 0 }

  /** Attack Success Rate (experimental) */
  get asr () { return 0 }

  /** Final Damage (experimental) */
  get dmg () { return 0 }

  // Initialize the mutable stats
  init () {
    this.battle.hp = this.hp
    this.battle.mana = this.mana
    this.battle.ag = this.ag
    this.battle.sd = this.sd
  }

  /**
   * Set the values of first-level Object properties
   * @param {Object} params { name, level, server, guild, class, skill_active }
   */
  set (params) {
    if (params === undefined) {
      throw new Error('Undefined parameters')
    }

    const fields = ['stats', 'paths', 'skills']
    const keys = Object.keys(params)

    keys.forEach(item => {
      if (this[item] !== undefined && !fields.includes(item)) {
        if (item === 'level') {
          this[item] = params[item]
          this.onLevelUp(params[item])
        } else {
          this[item] = params[item]
        }
      } else {
        throw new Error(`Invalid parameter '${item}'`)
      }
    })
  }

  // Normal (Physical) attack
  attack () {
    this.battle.asr = this.attackSuccessRate()
    this.battle.dmg = this.maxAtk
    console.log(`[${this.name}] attacking, dmg: ${this.battle.dmg}, asr: ${this.battle.asr}%`)
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
        allow = (this.battle.mana - this[this.skill_active].mana_cost > 0)
      }

      if (allow) {
        this.battle.asr = this.attackSuccessRate()
        this.battle.dmg = (this.maxWizPower !== 0) ? this.maxWizPower : this.maxElemAtk
        this[this.skill_active].cast()
        console.log(`[${this.name}] attacking, dmg: ${this.battle.dmg}, asr: ${this.battle.asr}%`)
      } else {
        console.log('Insufficient mana. Cannot cast skill.')
        this.attack()
      }
    }
  }

  /**
   * Create a new skill
   * @param {Skill} skill - Class definition of a new skill
   */
  createSkill (skill) {
    this[skill.name] = skill
    this.skills.push(skill.name)
  }

  /**
   * Set the basic (skill_attack) skill.
   * @param {String} skill - Skill name
   */
  setActiveSkill (skillName) {
    this.skill_active = skillName
  }

  /**
   * Update (increment/decrement) a (main) stat point
   * @param {String} stat - Stat name (str, agi, vit, ener)
   * @param {Number} points - (+/-) Stat points Number value
   * @param {Bool} usePoints - Flag to use the accumulated "this.levelup_points" during level-up
   */
  setMainStat (stat, points, usePoints = false) {
    if (usePoints) {
      if (this.levelup_points - points >= 0) {
        this.levelup_points -= points

        this.stats[stat] += points
        this.stats.sd += (1.2 * points)
        this.battle.sd += (1.2 * points)
        this.battle.ag = this.ag

        switch (stat) {
        case 'ener':
          this.battle.mana = this.mana
          break
        case 'vit':
          this.battle.hp = this.hp
          break
        default: break
        }
      } else {
        throw new Error('Insufficient level-up points.')
      }
    } else {
      this.stats[stat] = points
    }
  }

  // Set the numerator for the skill dmg multiplier (if any)
  updateActiveSkill () {
    this[this.skill_active].stat_pool = this.stats[this[this.skill_active].stat]
  }

  /**
   * Update the mutable stats on level-up.
   * Characters gain (POINTS_PER_LEVEL * levels) points per level-up. They can use
   * these points to increase their Main Stat points.wwwwww
   * @param {Number} levels - Character level
   */
  onLevelUp (levels) {
    this.levelup_points += POINTS_PER_LEVEL * levels

    // Instant-refill the battle stats with updated values
    this.battle.hp = this.hp
    this.battle.mana = this.mana
    this.battle.sd = this.sd
  }

  // Compute a random-value attack success rate
  // TO-DO: Finalize the actual computation
  attackSuccessRate () {
    const max = 100
    const min = 1
    return Math.random() * (max - min) + min
  }

  /**
   * Decrease the Character's (mutable) hp by a certain amount
   * @param {Number} damage - Amount of damage
   */
  takeDamge (damage) {
    this.battle.hp -= damage
    console.log(`[${this.name}] take damage ${damage}, hp: ${this.battle.hp}`)
  }

  // Checks if the Character is still alive
  isDefeated () {
    if (this.class === CHARACTER_TYPES.PLAYER) {
      // Immortal ^_^
      return false
    } else {
      return this.battle.hp <= 0
    }
  }

  /**
   * Return an Object of getters and their values
   * @returns {Object} Returns the main stats and (getter) stats merged in an Object
   */
  getStats () {
    const getters = Object.getOwnPropertyDescriptors(Character.prototype)
    const obj = {}

    for (const key in getters) {
      if (key !== 'constructor' && typeof this[key] !== 'function') {
        obj[key] = this[key]
      }
    }

    return { ...this.stats, ...obj }
  }

  // Print the stats to console
  logStats (full = true) {
    if (!full) {
      console.log(this.battle)
    } else {
      console.log(this.getStats())
    }
  }

  // Print the class to console
  log () {
    console.log(`CHARACTER [${this.class}] "${this.name}"`)
    console.log(this)
  }
}

module.exports = Character
