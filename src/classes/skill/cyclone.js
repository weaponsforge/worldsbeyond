const Skill = require('./skill')
const { CLASSES, CHARACTER_TYPES, SKILL_TYPES } = require('../../utils/constants')

class Cyclone extends Skill {
  constructor () {
    super({
      name: 'Cyclone',
      mana_cost: 9,
      classes: [CLASSES.KNIGHT, CHARACTER_TYPES.AWAKENED, CHARACTER_TYPES.PLAYER],
      skillDamage: 0,
      range: 2,
      multiplier: 30,
      type: SKILL_TYPES.WIND,
      stat: 'str'
    })
  }
}

module.exports = Cyclone
