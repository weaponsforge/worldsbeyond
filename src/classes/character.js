const { CLASSES } = require('../utils//constants')

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
    this.level = params.level ?? 1
    this.server = params.server ?? 'bahr'
    this.guild = params.guild ?? ''
    this.class = params.class ?? 'player'
    this.paths = params.class ? [params.class] : [this.class]

    this.stats = params.stats ?? {
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

  setPaths (newClass) {
    if (Object.keys(CLASSES).includes(newClass)) {
      this.paths.push(newClass)
    }
  }

  set (params) {
    if (params === undefined) {
      throw new Error('Undefined parameters')
    }

    const fields = Object.keys(this)
    fields.splice(fields.indexOf('stats'), 1)
    fields.splice(fields.indexOf('maxStats'), 1)
    fields.splice(fields.indexOf('paths'), 1)

    const keys = Object.keys(params)

    const validKeys = keys.every(x => fields.includes(x))

    if (!validKeys) {
      throw new Error('Invalid parameter(s).')
    }

    fields.forEach((item, index) => {
      if (params[item] !== undefined) {
        this[item] = params[item]
      }
    })
  }

  log () {
    console.log(`CHARACTER [${this.class}] "${this.name}"`)
    console.log(this)
  }
}

module.exports = Character
