const Adventurer = require('./adventurer')
const { CLASSES } = require('../utils/constants')

class Elf extends Adventurer {
  constructor (params) {
    super({ ...params, class: CLASSES.ELF })

    this.stats = {
      str: 50,
      agi: 200,
      vit: 20,
      ener: 100
    }
  }

  shoot () {
    console.log('---shoot arrow!')
  }

  strike () {
    this.shoot()
  }
}

module.exports = Elf
