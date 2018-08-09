const Character = require('./Character')
const tools = require('./Tools')

class PlayersDash {
  constructor(anchors){
    this.cards = anchors
    this.characterList = []
    this.colors = {
      "NPC": "var(--info)",
      "Player": "var(--success)",
      "Enemy": "var(--danger)",
      "HP": (hp) => {
        if (hp >= 50) return "bg-success"
        if (hp >= 20) return "bg-warning"
        return "bg-danger"
      }
    }
  }

  function getCharacter(n) {
    for(let character of this.characterList) {
      if(character.name.toLowerCase().match(n)) return tools.watched(character,this.render)
    }
    return null
  }

  function newCharacter(c) {
    this.characterList.push(c)
    this.render()
  }
  function makeCharacter() {
    let root = VDN("div")
    root.addChild(this.makeCharacterHeader(characterSet[i]))
    root.addChild(this.makeBaseStats(characterSet[i]))
    root.addChild(this.makeCharacterStats(characterSet[i]))
    root.addChild(this.makeCharacterSubHeading("HP"))
    root.addChild(this.makeCharacterHP(characterSet[i]))
    return root
  }
  function render() {
      // hide and clear
      cards.map((card) => {
        card.style.display = "none"
        card.innerHTML = ""
      })

      // get characters
      let characterSet = this.characterList.filter((x)=>x.shown)
      if(characterSet.length > this.cards.length)
        characterSet = characterSet.slice(0,this.cards.length)

      // build card from sub components
      cards.map((card,i)=>{
        card.style.borderTopColor = this.colors[characterSet[i].type]
        card.appendChild(this.makeCharacter(characterSet[i]).render())
      })

      // display
      cards.map((x)=>x.style.display = "block")
  }

  function makeBaseStats(character) {
    let baseStats = tools.makeFlexVDN("row","space-around","center")
    baseStats.setDim("calc(100% - 2rem)","15%")
    baseStats.setMargin(left="1rem",right="1rem")
    baseStats.addChild(tools.makeIconVDN("shield","AC"))
    return baseStats
  }

  function makeCharacterHeader(character) {
      let container = tools.makeFlexVDN("column","center","center")
      container.setDim("100%","25%").setMargin(top="5%")
      container.addText("h6",character.name)
      let subtitle = `Level ${character.level} ${character.race} ${character.class}`
      container.addText("p",subtitle,className="lead",size="0.8rem")
      return container
  }

  function makeCharacterStats(character) {
    let container = tools.makeFlexVDN("row","space-between","center")
    container.setDim("calc(100% - 2rem)","26%")
    container.setMargin(top="2%",bottom="6%",left="1rem",right="1rem")
    container.domNode.style.borderTop = "solid #EBEBEB 2px"
    container.domNode.style.borderBottom = "solid #EBEBEB 2px"
    let stats = {
      "str":"sword",
      "dex":"run-fast",
      "con":"heart-half-full",
      "int":"atom",
      "wis":"earth",
      "chr":"forum"
    }
    // TODO: put in mod
    return container
  }

  function makeCharacterHP(character) {
    let p = character.
    let color = this.colors.HP(p)
    let container = tools.makeDivVDN(className="progress").addChild(tools.makeDivVDN(className=`progress-bar ${color}`))
    container.domNode.children[0].style.width p+"%"
    container.setMargin(left="1rem",right="1rem").setDim("100%","0.3rem")
    return container
  }

  function makeCharacterSubHeading(t) {
    let container = tools.makeDivVDN()
    container.addText("p",t,className="lead",size="0.8rem")
    container.setMargin(left="1.5rem",bottom="0.2rem")
    return container
  }
}


module.exports = PlayersDash
