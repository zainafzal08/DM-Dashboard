const tools = require('./Tools')

class Character {
  constructor() {
    this.name = null;
    this.type = null;
    this.race = null;
    this.level = null;
    this.class = null;
    this.stats = {
      str:null,
      dex:null,
      con:null,
      int:null,
      wis:null,
      chr:null
    };
    this.iconSet = {
      "str":"sword",
      "dex":"run-fast",
      "con":"heart-half-full",
      "int":"atom",
      "wis":"earth",
      "chr":"forum"
    };
    this.baseStats = {
      initative: null,
      speed: null,
      armourClass: null
    };
    this.baseHP = 0;
    this.maxHP = null;
    this.tempHP = 0;
    this.shown = false;
    this.colors = {
      "HP": (hp) => {
        if (hp >= 50) return "bg-success";
        if (hp >= 20) return "bg-warning";
        return "bg-danger";
      }
    }
  }
  buildFromJson(json) {
    for(let k of Object.keys(json)) {
      if(typeof json[k] == "object")
        this[k] = Object.create(json[k]);
      else
        this[k] = json[k];
    }
  }
  abilityCheck(stat) {
    return this.modifiers[stat];
  }
  savingThrow(stat) {
    return this.modifiers[stat];
  }
  giveTempHP(s) {
    if (s < 0) s = 0;
    this.tempHP = s;
    this.baseHP += this.tempHP;
  }
  clearState() {
    this.tempHP = 0
    if(this.baseHP > this.maxHP) this.baseHP = this.maxHP;
  }
  set HP(s) {
    if (s<0) {
      this.baseHP = 0;
      return;
    }
    if (s > (this.maxHP+this.tempHP)) this.baseHP = (this.maxHP+this.tempHP);
    else this.baseHP = s;
  }
  get HP() {
    let p = Math.ceil(this.baseHP/(this.maxHP+this.tempHP)*100);
    return {
      points: this.baseHP,
      percentage: p
    };
  }
  get modifiers() {
    return {
      str:Math.floor(this.stats.str/2)-5,
      dex:Math.floor(this.stats.dex/2)-5,
      con:Math.floor(this.stats.con/2)-5,
      int:Math.floor(this.stats.int/2)-5,
      wis:Math.floor(this.stats.wis/2)-5,
      chr:Math.floor(this.stats.chr/2)-5
    };
  }

  makeBaseStats() {
    return tools.VDN("div")
      .flex("row")
      .justify("space-around")
      .align("center")
      .fitH("100%","1rem")
      .fitV("15%")
      .addIcon("shield","AC");
  }

  makeCharacterHeader() {
    let subtitleText = `Level ${this.level} ${this.race} ${this.class}`;
    let heading = VDN("h6")
      .setText(this.name);
    let subtitle = VDN("p")
      .setText(subtitleText,"0.8rem")
      .addClass("lead");
    return tools.VDN("div")
      .flex("column")
      .justify("center")
      .align("center")
      .fitH("100%")
      .fitV("25%")
      .addChild(heading)
      .addChild(subtitle);
  }

  makeCharacterStats(terminal) {
    let icons = tools.VDN("div")
      .flex("row")
      .justify("space-between")
      .align("center")
      .fitH("100%","2rem")
      .fitV("23%","1%");

    Object.keys(this.iconSet).map((x)=>{
      icons.addIcon(this.iconSet[x],`${x}: ${this.stats[x]}`)
        .last
        .bind("click",()=>{
          terminal.autoType(`${x} check for [${this.name}]`
          }));
    })

    let mods = tools.makeFlexVDN("row","space-between","center");
    mods.setDim("calc(100% - 2rem)","26%");
    mods.setMargin({top:"1%",left:"1rem",right:"1rem"});
    Object.keys(stats).map((x)=>{
      let modifier = this.modifiers[x];
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

  makeCharacterHP() {
    let p = this.HP.percentage;
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
  throwFull() {
    let container = tools.makeFlexVDN("column","center","center");
    container.setDim("100%","100%");

    let subtitle = `Level ${this.level} ${this.race} ${this.class}`;


    let heading = tools.makeFlexVDN("row","center","center");
    heading.setDim("calc(100% - 2rem)","4rem");
    heading.setMargin({left: "1rem",right:"1rem",bottom:"1rem"});
    heading.addChild(tools.makeDivVDN());
    heading.first.innerText = this.name;
    heading.first.style["font-size"] = "2rem";
    heading.addText("p",subtitle,"lead","1rem");
    container.addChild(heading);

    let stats = this.makeCharacterStats();
    stats.style.width = "calc(100% - 2rem)";
    stats.children[0].children.map((x)=>{
      x.children[0].style["font-size"] = "1.2rem";
    });
    stats.children[1].children.map((x)=>{
      x.children[0].style["font-size"] = "1rem";
    });
    stats.setMargin({left: "1rem",right:"1rem"});
    stats.style.borderBottom = "#EBEBEB 2px solid";
    stats.children[1].style.marginBottom = "1%";


    container.addChild(stats);
    tools.throwModal(container);
  }
  makeCharacterActionbar() {
    let container = tools.makeFlexVDN("row","flex-end","center");
    container.setMargin({left:"0.5rem",right:"0.5rem"});
    container.setDim("calc(100% - 1rem)","1.5rem");
    let child = tools.makeIconVDN("arrow-expand",`expand`);
    child.attributes["data-balloon-pos"] = "left";
    child.bind("click",()=>this.throwFull());
    container.addChild(child);
    return container;
  }
  render(terminal) {
    let root = tools.VDN("div");
    root.addChild(this.makeCharacterActionbar());
    root.addChild(this.makeCharacterHeader());
    root.addChild(this.makeBaseStats());
    root.addChild(this.makeCharacterStats(terminal));
    root.addChild(this.makeCharacterSubHeading("HP"));
    root.addChild(this.makeCharacterHP());
    return root.render();
  }
}

module.exports = Character
