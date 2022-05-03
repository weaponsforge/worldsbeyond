const { Wizard, Knight, Elf, Awakened, Character } = require('./classes')
console.log('start')

let tarrent = new Wizard({ name: 'tarrent' })
const hellios = new Knight({ name: 'hellios' })
const avatarr = new Elf({ name: 'avatar' })
const traveler = new Character({ name: 'player_one' })

try {
  tarrent.updateStats('ener', 500)
  tarrent.set({ guild: 'kobalos', level: 99 })
} catch (err) {
  console.log(`ERROR: ${err.message}`)
}

try {
  hellios.updateStats('str', 110)
  hellios.log()
} catch (err) {
  console.log(`ERROR: ${err.message}`)
}

try {
  traveler.updateStats('str', 5000)
  traveler.log()
} catch (err) {
  console.log(`ERROR: ${err.message}`)
}

tarrent.strike()
hellios.strike()
avatarr.strike()
traveler.strike()

tarrent = new Awakened(tarrent, 'elf')
tarrent.log()
tarrent.strike()
