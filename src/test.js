const assert = require('assert')
const Character = require('./Character')
const testCharacters = require('./data/test_characters.json')

describe("Character Object", () => {
  it("Basic", () => {
    let me = new Character()
    me.name = "Blathazor"
    assert.equal(me.name,"Blathazor")
  })
  it("Stats", () => {
    let me = new Character()
    me.stats.str = 20
    me.stats.wis = 21
    me.stats.int = 8
    assert.equal(me.stats.str,20)
    assert.equal(me.modifiers.str,5)
    assert.equal(me.modifiers.wis,5)
    assert.equal(me.modifiers.int,-1)
  })
  it("HP", () => {
    let me = new Character()
    me.maxHP = 100
    me.HP = 50
    assert.equal(me.HP.points,50)
    assert.equal(me.HP.percentage,50)
    me.HP = 75
    assert.equal(me.HP.percentage,75)
    me.maxHP = 80
    assert.equal(me.HP.percentage,94)
    me.HP = 1
    assert.equal(me.HP.percentage,2)
    me.HP = 0
    assert.equal(me.HP.percentage,0)
    me.HP = 1
    me.maxHP = 110
    assert.notEqual(me.HP.percentage,0)
  })
  it("Temp HP", () => {
    let me = new Character()
    me.maxHP = 100
    me.HP = 50
    assert.equal(me.HP.points,50)
    assert.equal(me.HP.percentage,50)
    me.giveTempHP(20)
    assert.equal(me.HP.points,70)
    assert.equal(me.HP.percentage,59)
    me.HP = 100
    me.clearState()
    assert.equal(me.HP.points,100)
    assert.equal(me.HP.percentage,100)
  })
  it("Build from Json", () => {
    let me = new Character(json=testCharacters[0])
    assert.equal(me.name,"Garfield")
    assert.equal(me.type,"NPC")
    assert.equal(me.race,"kitty")
    assert.equal(me.level,1)
    assert.equal(me.class,"bard")
    assert.equal(me.stats.str,13)
    assert.equal(me.stats.dex,13)
    assert.equal(me.stats.con,11)
    assert.equal(me.stats.int,6)
    assert.equal(me.stats.wis,10)
    assert.equal(me.stats.chr,16)
    assert.equal(me.shown,true)
    assert.equal(me.HP.points,20)
    assert.equal(me.HP.percentage,100)
})
})
