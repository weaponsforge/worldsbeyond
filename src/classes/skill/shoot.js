const Skill = require('./skill')
const { CLASSES, CHARACTER_TYPES, SKILL_TYPES } = require('../../utils/constants')

class Shoot extends Skill {
  constructor () {
    super({
      name: 'TripleShot',
      mana_cost: 5,
      classes: [CLASSES.ELF, CHARACTER_TYPES.AWAKENED, CHARACTER_TYPES.PLAYER],
      skillDamage: 0,
      range: 6,
      multiplier: 100,
      type: SKILL_TYPES.WIND,
      stat: 'agi'
    })
  }
}

module.exports = Shoot
