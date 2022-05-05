class Enemy {
  constructor (params) {
    if (params === undefined) {
      throw new Error('Undefined parameters.')
    }

    if (params.name === undefined) {
      throw new Error('Missing name parameter.')
    }

    this.name = params.name ?? 'enemy'
    this.level = params.level ?? 1

    this.stats = params.stats ?? {
      hp: 1,
      dmg: 0,
      asr: 0
    }

    this.stats_atk = {
      maxAtk: 1,
      minAtk: 1
    }

    this.stats_def = {
      def: 1,
      defRate: 1
    }
  }

  setStats () {
    this.stats.hp *= this.level
    this.stats_atk.maxAtk = this.stats_atk.maxAtk * this.level
    this.stats_atk.minAtk = this.stats_atk.minAtk * this.level
    this.stats_def.def = Math.floor(this.level * this.stats_def.def)
    this.stats_def.defRate = Math.floor(this.level * this.stats_def.defRate)
    this.stats.dmg = this.stats_atk.maxAtk
  }

  attack () {
    this.stats.asr = this.attackSuccessRate()
    console.log(`[${this.name}] attacking, dmg: ${this.stats.dmg} with asr: ${this.stats.asr}%`)
  }

  heal (points) {
    this.stats.hp += points
  }

  takeDamage (damage) {
    this.stats.hp -= damage
    console.log(`[${this.name}] take damage ${damage}, hp: ${this.stats.hp}`)
  }

  attackSuccessRate () {
    const max = 100
    const min = 1
    return Math.floor(Math.random() * (max - min) + min)
  }

  isDefeated () {
    return this.stats.hp <= 0
  }

  log () {
    console.log(this)
  }
}

module.exports = Enemy
