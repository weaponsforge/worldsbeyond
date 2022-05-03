const Adventurer = require('./adventurer')

class Knight extends Adventurer {
  constructor (params) {
    super({ ...params, class: 'knight' })

    this.stats = {
      str: 150,
      agi: 50,
      vit: 30,
      ener: 30
    }
  }

  ragefulblow () {
    console.log('---rageful blow!')
  }

  strike () {
    this.ragefulblow()
  }
}

module.exports = Knight
