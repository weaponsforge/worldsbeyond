const Skill = require('./skill')
const { CLASSES, CHARACTER_TYPES } = require('../../utils/constants')

class RagefulBlow extends Skill {
  constructor () {
    super({
      name: 'RagefulBlow',
      lvl_reqt: 1,
      classes: [CLASSES.KNIGHT, CHARACTER_TYPES.AWAKENED],
      mana_cost: 2,
      damage: 5
    })
  }
}

module.exports = RagefulBlow
