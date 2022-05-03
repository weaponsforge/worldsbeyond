/**
 * Base Class of all Character classes
 */
class Character {
  constructor (params) {
    if (params === undefined) {
      throw new Error('Missing parameters.')
    }

    if (params.name === undefined) {
      throw new Error('Must provide a character name.')
    }

    this.name = params.name
    this.level = 1
    this.server = params.server ?? 'bahr'
    this.guild = ''
    this.class = params.class ?? 'player'

    this.stats = {
      str: 10,
      agi: 10,
      vit: 10,
      ener: 10
    }
  }

  walk () {
    console.log('---walking...')
  }

  run () {
    console.log('---running...')
  }

  strike () {
    console.log('---strike!')
  }

  updateStats (stat, points) {
    if (this.stats[stat] === undefined) {
      throw new Error('Undefined stat.')
    }

    this.stats[stat] += points
  }
}

module.exports = Character
