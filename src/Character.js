class Character {
  constructor(json=null) {
    this.name = null
    this.type = null
    this.race = null
    this.level = null
    this.class = null
    this.stats = {
      str:null,
      dex:null,
      con:null,
      int:null,
      wis:null,
      chr:null
    }
    this.baseStats = {
      initative: null,
      speed: null,
      armourClass: null
    }
    this.baseHP = 0
    this.maxHP = null
    this.tempHP = 0
    this.shown = false
    if(json !== null) this.buildFromJson(json)
  }
  buildFromJson(json) {
    for(let k of Object.keys(json)) {
      if(typeof json[k] == "object")
        this[k] = Object.create(json[k])
      else
        this[k] = json[k]
    }
  }
  giveTempHP(s) {
    if (s < 0) s = 0
    this.tempHP = s
    this.baseHP += this.tempHP
  }
  clearState() {
    this.tempHP = 0
    if(this.baseHP > this.maxHP) this.baseHP = this.maxHP
  }
  set HP(s) {
    if (s<0) {
      this.baseHP = 0
      return
    }
    if (s > (this.maxHP+this.tempHP)) this.baseHP = (this.maxHP+this.tempHP)
    else this.baseHP = s
  }
  get HP() {
    let p = Math.ceil(this.baseHP/(this.maxHP+this.tempHP)*100)
    return {
      points: this.baseHP,
      percentage: p
    }
  }
  get modifiers() {
    return {
      str:Math.floor(this.stats.str/2)-5,
      dex:Math.floor(this.stats.dex/2)-5,
      con:Math.floor(this.stats.con/2)-5,
      int:Math.floor(this.stats.int/2)-5,
      wis:Math.floor(this.stats.wis/2)-5,
      chr:Math.floor(this.stats.chr/2)-5
    }
  }
}

module.exports = Character
