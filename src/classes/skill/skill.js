class Skill {
  constructor (params) {
    if (params === undefined) {
      throw new Error('Undefined parameter(s).')
    }

    if (params.name === undefined) {
      throw new Error('Missing skill name.')
    }

    /** Skill name */
    this.name = params.name ?? 'skill'

    /** Classes who can equip this spell */
    this.classes = params.classes ?? []

    /** Amount of Mana needed to cast the spell */
    this.mana_cost = params.mana_cost ?? 1

    /** Ability Gauge cost */
    this.ag_cost = params.ag_cost ?? 0

    /** Base skill damage */
    this.skillDamage = params.skillDamage ?? 0

    /** skillDamage with multipliers */
    this.damage = params.damage ?? 0

    /** Skill range */
    this.range = params.range ?? 0

    /** Skill type */
    this.type = params.type ?? ''

    /** Caster's total (multiplier numerator) main stat (ener/str/agi) */
    this.stat_pool = 1

    /**  Skill Damage multiplier */
    this.multiplier = params.multiplier ?? 1

    /** Main stat to associate the multiplier with (str/ener/agi/vit) */
    this.stat = params.stat ?? ''

    this.requirements = []
  }

  set (params) {
    if (params === undefined) {
      throw new Error('Undefined parameter(s).')
    }

    const keys = Object.keys(params)

    keys.forEach(item => {
      if (this[item] !== undefined) {
        this[item] = params[item]
      } else {
        throw new Error(`Invalid parameter: ${item}`)
      }
    })
  }

  cast () {
    console.log(`---casting ${this.name}!`)
  }

  finalDamage (statLvl) {
    const pool = (statLvl !== undefined) ? statLvl : this.stat_pool

    return this.multiplier > 1
      ? this.skillDamage + Math.floor(1 * pool / this.multiplier)
      : this.skillDamage
  }

  get () {
    return this
  }
}

module.exports = Skill
