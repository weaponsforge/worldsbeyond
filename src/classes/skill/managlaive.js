const Skill = require('./skill')
const { CLASSES, CHARACTER_TYPES, SKILL_TYPES } = require('../../utils/constants')

class ManaGlaive extends Skill {
  constructor () {
    super({
      name: 'ManaGlaive',
      mana_cost: 1,
      classes: [CLASSES.WIZARD, CHARACTER_TYPES.AWAKENED, CHARACTER_TYPES.PLAYER],
      ag_cost: 10,
      skillDamage: 90,
      range: 6,
      type: SKILL_TYPES.NONE
    })
  }
}

module.exports = ManaGlaive
