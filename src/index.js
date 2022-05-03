const {
  Wizard,
  Knight,
  Elf,
  Awakened,
  Character
} = require('./classes/player')

console.log('-------- GAME START --------')

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

tarrent.skill_attack()
tarrent.attack()
hellios.skill_attack()
avatarr.skill_attack()
traveler.skill_attack()

tarrent = new Awakened(tarrent, 'knight')
tarrent.log()
tarrent.skill_attack()
