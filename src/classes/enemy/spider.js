const Enemy = require('./enemy')

class Spider extends Enemy {
  constructor (params) {
    super({ ...params, name: 'Spider' })

    this.stats = {
      hp: 20,
      asr: 0
    }

    this.stats_atk = {
      maxAtk: 4,
      minAtk: 3
    }

    this.stats_def = {
      def: 0.5,
      defRate: 0.5
    }

    this.setStats()
  }
}

module.exports = Spider
