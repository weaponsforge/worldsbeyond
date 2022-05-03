const Skill = require('./skill')
const { CLASSES, CHARACTER_TYPES } = require('../../utils/constants')

class EnergyBall extends Skill {
  constructor () {
    super({
      name: 'EnergyBall',
      lvl_reqt: 1,
      classes: [CLASSES.WIZARD, CHARACTER_TYPES.AWAKENED, CHARACTER_TYPES.PLAYER],
      mana_cost: 2,
      damage: 2
    })
  }
}

module.exports = EnergyBall
