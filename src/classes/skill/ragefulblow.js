const Skill = require('./skill')
const { CLASSES, CHARACTER_TYPES, SKILL_TYPES } = require('../../utils/constants')

class RagefulBlow extends Skill {
  constructor () {
    super({
      name: 'RagefulBlow',
      mana_cost: 25,
      ag_cost: 20,
      classes: [CLASSES.KNIGHT, CHARACTER_TYPES.AWAKENED, CHARACTER_TYPES.PLAYER],
      skillDamage: 60,
      range: 3,
      multiplier: 150,
      type: SKILL_TYPES.EARTH,
      stat: 'str'
    })
  }
}

module.exports = RagefulBlow
