const {
  Wizard
} = require('./classes/player')

const { Spider } = require('./classes/enemy')

console.log('-------- GAME START --------')

const player = new Wizard({ name: 'player' })
player.set({ level: 5 })
player.setActiveSkill('ManaGlaive')
const spider = new Spider({ level: 8 })

let turn = 1

while (!spider.isDefeated() && !player.isDefeated()) {
  console.log(`--- BATTLE AT TURN # ${turn}`)
  player.skill_attack()

  if (player.activeStats.asr > 50) {
    spider.takeDamage(player.activeStats.dmg)
  }

  if (!spider.isDefeated()) {
    spider.attack()
    if (spider.activeStats.asr > 50) {
      player.takeDamge(spider.activeStats.dmg)
    }
  }

  turn += 1
}

console.log(`---Battle ended on TURN # ${turn}`)

if (player.activeStats.hp > 0) {
  console.log('PLAYER wins')
}

if (spider.activeStats.hp > 0) {
  console.log('ENEMY wins')
}

if (player.activeStats.hp === spider.activeStats.hp) {
  console.log('DRAW')
}
