const Skill = require('./skill')
const { CLASSES, CHARACTER_TYPES } = require('../../utils/constants')

class ManaGlaive extends Skill {
  constructor () {
    super({
      name: 'managlaive',
      lvl_reqt: 5,
      classes: [CLASSES.WIZARD, CHARACTER_TYPES.AWAKENED],
      mana_cost: 15,
      damage: 35
    })
  }
}

module.exports = ManaGlaive
