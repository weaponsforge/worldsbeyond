const Skill = require('./skill')
const { CLASSES, CHARACTER_TYPES, SKILL_TYPES } = require('../../utils/constants')

class Lightning extends Skill {
  constructor () {
    super({
      name: 'Lightning',
      mana_cost: 72,
      ag_cost: 10,
      classes: [CLASSES.WIZARD, CHARACTER_TYPES.AWAKENED, CHARACTER_TYPES.PLAYER],
      skillDamage: 17,
      range: 6,
      multiplier: 40,
      type: SKILL_TYPES.WIND,
      stat: 'ener'
    })
  }
}

module.exports = Lightning
