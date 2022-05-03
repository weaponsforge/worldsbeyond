const ManaGlaive = require('./managlaive')
const EnergyBall = require('./energyball')
const RagefulBlow = require('./ragefulblow')
const Shoot = require('./shoot')

const managlaive = new ManaGlaive()
const energyball = new EnergyBall()
const ragefulblow = new RagefulBlow()
const shoot = new Shoot()

module.exports = {
  managlaive,
  energyball,
  ragefulblow,
  shoot
}
