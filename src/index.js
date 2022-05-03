const { Wizard, Knight, Character } = require('./classes')
console.log('start')

const tarrent = new Wizard({ name: 'tarrent' })
console.log(`created ${tarrent.class} "${tarrent.name}"`)
console.log(tarrent.stats)

const hellios = new Knight({ name: 'hellios' })
console.log(`created ${hellios.class} "${hellios.name}"`)
console.log(hellios.stats)

const traveler = new Character({ name: 'player_one' })
console.log(`created ${traveler.class} "${traveler.name}"`)

try {
  tarrent.updateStats('ener', 1000)
  console.log(`--${tarrent.name} stats`)
  console.log(tarrent.stats)
} catch (err) {
  console.log(`ERROR: ${err.message}`)
}

try {
  hellios.updateStats('str', 110)
  console.log(`--${hellios.name} stats`)
  console.log(hellios.stats)
} catch (err) {
  console.log(`ERROR: ${err.message}`)
}

try {
  traveler.updateStats('str', 5000)
  console.log(`--${traveler.name} stats`)
  console.log(traveler.stats)
} catch (err) {
  console.log(`ERROR: ${err.message}`)
}

tarrent.strike()
hellios.strike()
traveler.strike()
