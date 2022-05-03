const Skill = require('./skill')
const { CLASSES, CHARACTER_TYPES } = require('../../utils/constants')

class ManaGlaive extends Skill {
  constructor () {
    super({
      name: 'ManaGlaive',
      lvl_reqt: 5,
      classes: [CLASSES.WIZARD, CHARACTER_TYPES.AWAKENED, CHARACTER_TYPES.PLAYER],
      mana_cost: 15,
      damage: 8
    })
  }
}

module.exports = ManaGlaive
