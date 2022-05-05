const {
  Wizard,
  Knight,
  Elf,
  Awakened,
  Character
} = require('./classes/player')

console.log('-------- GAME START --------')

let tarrent = new Wizard({ name: 'tarrent' })
const avatarr = new Elf({ name: 'avatar' })
const traveler = new Character({ name: 'player_one' })

const hellios = new Knight({ name: 'hellios' })
hellios.set({ level: 30 })
hellios.setMainStat('ener', hellios.levelup_points, true)
hellios.logStats()

try {
  tarrent.setMainStat('ener', 500)
  tarrent.set({ guild: 'kobalos', level: 99 })
} catch (err) {
  console.log(`ERROR: ${err.message}`)
}

try {
  hellios.setMainStat('str', 110)
  hellios.log()
} catch (err) {
  console.log(`ERROR: ${err.message}`)
}

try {
  traveler.setMainStat('str', 5000)
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
