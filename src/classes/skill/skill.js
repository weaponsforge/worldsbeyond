class Skill {
  constructor (params) {
    if (params === undefined) {
      throw new Error('Undefined parameter(s).')
    }

    if (params.name === undefined) {
      throw new Error('Missing skill name.')
    }

    this.name = params.name ?? 'skill'
    this.lvl_reqt = params.lvl_reqt ?? 0
    this.classes = params.classes ?? []
    this.mana_cost = params.mana_cost ?? 0
    this.baseDamage = params.damage ?? 0
    this.damage = params.damage ?? 0
  }

  set (params) {
    if (params === undefined) {
      throw new Error('Undefined parameter(s).')
    }

    if (Object.keys(params) > Object.keys(this)) {
      throw new Error('Too many parameners')
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

  get () {
    return this
  }
}

module.exports = Skill
