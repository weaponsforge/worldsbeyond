const Skill = require('./skill')
const { CLASSES, CHARACTER_TYPES } = require('../../utils/constants')

class Shoot extends Skill {
  constructor () {
    super({
      name: 'Shoot',
      lvl_reqt: 1,
      classes: [CLASSES.ELF, CHARACTER_TYPES.AWAKENED, CHARACTER_TYPES.PLAYER],
      mana_cost: 2,
      damage: 2
    })
  }
}

module.exports = Shoot