const Skill = require('./skill')
const { CLASSES, CHARACTER_TYPES, SKILL_TYPES } = require('../../utils/constants')

class EnergyBall extends Skill {
  constructor () {
    super({
      name: 'EnergyBall',
      mana_cost: 1,
      classes: [CLASSES.WIZARD, CHARACTER_TYPES.AWAKENED, CHARACTER_TYPES.PLAYER],
      skillDamage: 3,
      range: 6,
      type: SKILL_TYPES.WIND,
      stat: 'ener'
    })
  }
}

module.exports = EnergyBall
