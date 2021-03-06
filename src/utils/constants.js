const CLASSES = {
  WIZARD: 'wizard',
  KNIGHT: 'knight',
  ELF: 'elf'
}

const CHARACTER_TYPES = {
  PLAYER: 'player',
  ADVENTURER: 'adventurer',
  AWAKENED: 'awakened'
}

const SKILLS_WIZARD = {
  ENERGYBALL: 'EnergyBall',
  FIREBALL: 'FireBall',
  POWERWAVE: 'PowerWave',
  LIGHTNING: 'Lightning',
  TELEPORT: 'Teleport',
  METEOR: 'Meteor',
  ICE: 'Ice',
  POISON: 'Poison',
  FLAME: 'Flame',
  TWISTER: 'Twister',
  EVILSPIRITS: 'EvilSpirits',
  HELLFIRE: 'Hellfire',
  AQUABEAM: 'AquaBeam',
  COMETFALL: 'CometFall',
  INFERNO: 'Inferno',
  TELEPORT_ALLY: 'TeleportAlly',
  SOULBARRIER: 'SoulBarrier',
  ICESTORM: 'IceStorm',
  DECAY: 'Decay',
  METEORSTRIKE: 'MeteorStrike',
  NOVA: 'Nova',
  MANAGLAIVE: 'ManaGlaive'
}

const SKILLS_KNIGHT = {
  RAGEFULBLOW: 'RagefulBlow',
  FALLING_SLASH: 'FallingSlash',
  CYCLONE_SLASH: 'CycloneSlash',
  LUNGE: 'Lunge',
  SLASH: 'Slash',
  IMPALE: 'Impale'
}

const SKILLS_ELF = {
  SHOOT: 'shoot',
  TRIPLESHOT: 'TripleShot',
  PENETRATION: 'Penetration',
  ICEARROW: 'IceArrow',
  HEAL: 'Heal',
  GREATER_DEFENSE: 'GreaterDefense',
  GREATER_DAMAGE: 'GreaterDamage'
}

const SKILL_TYPES = {
  WIND: 'wind',
  EARTH: 'earth',
  NONE: 'none-elements'
}

const MAIN_STATS = {
  STR: 'str',
  AGI: 'agi',
  ENER: 'ener',
  VIT: 'ener'
}

const POINTS_PER_LEVEL = 5

module.exports = {
  CLASSES,
  CHARACTER_TYPES,
  SKILLS_WIZARD,
  SKILLS_KNIGHT,
  SKILLS_ELF,
  SKILL_TYPES,
  POINTS_PER_LEVEL,
  MAIN_STATS
}
