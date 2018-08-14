const Character = require('./Character')
const tools = require('./Tools')

class PlayersDash {
  constructor(anchors){
    this.cards = anchors;
    this.characterList = [];
    this.colors = {
      "NPC": "var(--info)",
      "Player": "var(--success)",
      "Enemy": "var(--danger)",
      "HP": (hp) => {
        if (hp >= 50) return "bg-success";
        if (hp >= 20) return "bg-warning";
        return "bg-danger";
      }
    }
  }

  getCharacter(n) {
    for(let character of this.characterList) {
      if(character.name.toLowerCase().match(n))
        return tools.watched(character,this.render);
    }
    return null;
  }

  newCharacter(c) {
    this.characterList.push(c);
    this.render();
  }
  makeCharacter(c) {
    let root = tools.VDN("div");
    root.addChild(this.makeCharacterHeader(c));
    root.addChild(this.makeBaseStats(c));
    root.addChild(this.makeCharacterStats(c));
    root.addChild(this.makeCharacterSubHeading("HP"));
    root.addChild(this.makeCharacterHP(c));
    return root;
  }
  render() {
      // hide and clear
      this.cards.map((card) => {
        card.style.display = "none";
        card.innerHTML = "";
      });

      // get characters
      let characterSet = this.characterList.filter((x)=>x.shown);
      if(characterSet.length > this.cards.length)
        characterSet = characterSet.slice(0,this.cards.length);

      // build card from sub components
      this.cards.map((card,i)=>{
        if (i <= characterSet.length - 1) {
          card.style.borderTopColor = this.colors[characterSet[i].type];
          card.appendChild(this.makeCharacter(characterSet[i]).render());
        }
      });

      // display
      this.cards.map((x)=>x.style.display = "block");
  }

  makeBaseStats(character) {
    let baseStats = tools.makeFlexVDN("row","space-around","center");
    baseStats.setDim("calc(100% - 2rem)","15%");
    baseStats.setMargin({left:"1rem",right:"1rem"});
    baseStats.addChild(tools.makeIconVDN("shield","AC"));
    return baseStats;
  }

  makeCharacterHeader(character) {
      let container = tools.makeFlexVDN("column","center","center");
      container.setDim("100%","25%").setMargin({top:"5%"});
      container.addText("h6",character.name,"","1rem");
      let subtitle = `Level ${character.level} ${character.race} ${character.class}`;
      container.addText("p",subtitle,"lead","0.8rem");
      return container;
  }

  makeCharacterStats(character) {
    let icons = tools.makeFlexVDN("row","space-between","center");
    icons.setDim("calc(100% - 2rem)","26%");
    icons.setMargin({top:"1%",bottom:"0%",left:"1rem",right:"1rem"});
    let stats = {
      "str":"sword",
      "dex":"run-fast",
      "con":"heart-half-full",
      "int":"atom",
      "wis":"earth",
      "chr":"forum"
    }
    Object.keys(stats).map((x)=>{
      let cs = character.stats[x];
      icons.addChild(tools.makeIconVDN(stats[x],`${x}: ${cs}`))
    })
    let mods = tools.makeFlexVDN("row","space-between","center");
    mods.setDim("calc(100% - 2rem)","26%");
    mods.setMargin({top:"1%",left:"1rem",right:"1rem"});
    Object.keys(stats).map((x)=>{
      let modifier = character.modifiers[x];
      let modText = null;
      if (modifier > 0)
        modText = tools.makeDivVDN().addText("p",`+${modifier}`,"lead faint text-success","0.7rem");
      else if (modifier < 0)
        modText = tools.makeDivVDN().addText("p",`${modifier}`,"lead faint text-danger","0.7rem");
      else
        modText = tools.makeDivVDN().addText("p",`${modifier}`,"lead faint","0.7rem");
      mods.addChild(modText)
    })
    let container = tools.makeFlexVDN("column","center","center");
    container.setMargin({top:"2%",left:"1rem",right:"1rem"});
    container.addChild(icons);
    container.addChild(mods);
    container.style.borderTop = "solid #EBEBEB 2px";
    return container;
  }

  makeCharacterHP(character) {
    let p = character.HP.percentage;
    let color = this.colors.HP(p);
    let container = tools.makeDivVDN().setDim("calc(100% - 2rem)","0.3rem");
    container.setMargin({left: "1rem",right: "1rem"});
    let pbc = tools.makeDivVDN({className:"progress"});
    pbc.setDim("100%","100%");
    pbc.addChild(tools.makeDivVDN({className:`progress-bar ${color}`}));
    pbc.children[0].style.width = p+"%";
    pbc.children[0].style.height = "100%";
    container.addChild(pbc);
    return container;
  }

  makeCharacterSubHeading(t) {
    let container = tools.makeDivVDN();
    container.addText("p",t,"lead","0.8rem");
    container.setMargin({left:"1.5rem",top:"1rem",bottom:"0.4rem"});
    return container;
  }
}


module.exports = PlayersDash
