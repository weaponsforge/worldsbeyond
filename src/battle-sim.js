const { Wizard } = require('./classes/player')
const { Spider } = require('./classes/enemy')

console.log('-------- GAME START --------')

const player = new Wizard({ name: 'player' })
const spider = new Spider({ level: 3 })

let turn = 1

while (!spider.isDefeated() && !player.isDefeated()) {
  console.log(`\n--- BATTLE AT TURN # ${turn}`)
  player.skill_attack()

  if (player.battle.asr > 50) {
    spider.takeDamage(player.battle.dmg)
  }

  if (!spider.isDefeated()) {
    spider.attack()
    if (spider.stats.asr > 50) {
      player.takeDamge(spider.stats.dmg)
    }
  }

  turn += 1
}

console.log(`---Battle ended on TURN # ${turn}`)

if (player.battle.hp > 0) {
  console.log('PLAYER wins')
}

if (spider.stats.hp > 0) {
  console.log('ENEMY wins')
}

if (player.stats.hp <= 0 && spider.stats.hp <= 0) {
  console.log('NO WINNER. ALL DEDZ.')
}
