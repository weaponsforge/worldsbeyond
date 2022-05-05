const ManaGlaive = require('./managlaive')
const Lightning = require('./lightning')
const EnergyBall = require('./energyball')
const RagefulBlow = require('./ragefulblow')
const Cyclone = require('./cyclone')
const Shoot = require('./shoot')

const managlaive = new ManaGlaive()
const lightning = new Lightning()
const energyball = new EnergyBall()
const ragefulblow = new RagefulBlow()
const cyclone = new Cyclone()
const shoot = new Shoot()

module.exports = {
  managlaive,
  lightning,
  energyball,
  ragefulblow,
  cyclone,
  shoot
}
