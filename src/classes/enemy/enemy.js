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
    this.activeStats = params.activeStats ?? {
      dmg: 1,
      hp: 10,
      ener: 10,
      asr: 0
    }
  }

  attack () {
    this.activeStats.asr = this.attackSuccessRate()
    console.log(`[${this.name}] attacking, dmg: ${this.activeStats.dmg} with asr: ${this.activeStats.asr}%`)
  }

  heal (points) {
    this.activeStats.hp += points
  }

  takeDamage (damage) {
    this.activeStats.hp -= damage
    console.log(`[${this.name}] take damage ${damage}, hp: ${this.activeStats.hp}`)
  }

  attackSuccessRate () {
    const max = 100
    const min = 1
    return Math.floor(Math.random() * (max - min) + min)
  }

  isDefeated () {
    return this.activeStats.hp <= 0
  }

  log () {
    console.log(this)
  }
}

module.exports = Enemy
