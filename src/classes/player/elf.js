const Adventurer = require('./adventurer')
const { shoot } = require('../skill')
const { CLASSES } = require('../../utils/constants')

class Elf extends Adventurer {
  constructor (params) {
    super({ ...params, class: CLASSES.ELF })
    this.createSkill(shoot)
    this.setActiveSkill(shoot.name)

    this.stats = {
      str: 50,
      agi: 200,
      vit: 20,
      ener: 100
    }
  }
}

module.exports = Elf
