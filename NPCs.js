// Non Player Characters
var NPC = [{
  ID: 0,
  Name:"",
  Description:"hell hound",
  Image: "hellhound.gif",
  Sound1: "hellhound01.wav",
  Sound2: "hellhound02.wav",
  // Dispositions
  // -1: Will Attack
  // 0: Attacks if attacked
  // 1: Friendly
  Disposition: "Aggressive",
  Health: 20,
  // Weapons can be anything including claws or swords
  Weapon: {
    Name: "bite",
    Damage: 5,
    Chance: 50
  },
  Items: [],
  // Willingness to trade items
  Trade: false,
  Phrases: []
},{
  ID: 1,
  Name:"",
  Description:"poison snake",
  Image: "snake.gif",
  Sound1: "snake01.wav",
  Sound2: "snake01.wav",
  Disposition: 'Neutral',
  Health: 20,
  // Weapons can be anything including claws or swords
  Weapon: {
    Name: "bite",
    Damage: 80,
    Chance: 10
  },
  Items: [],
  // Willingness to trade items
  Trade: false,
  Phrases: []
},{
  ID: 2,
  Name:"",
  Description:"spider",
  Image: "spider.gif",
  Sound1: "spider01.wav",
  Sound2: "spider02.wav",
  Health: 5,
  // Weapons can be anything including claws or swords
  Weapon: {
    Name: "bite",
    Damage: 5,
    Chance: 40
  },
  Items: [],
  // Willingness to trade items
  Trade: false,
  Phrases: []
}
]