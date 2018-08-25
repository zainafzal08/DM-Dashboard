const Character = require('./Character')
const tools = require('./Tools')

class PlayersDash {
  constructor(anchors, terminal){
    this.cards = anchors;
    this.characterList = [];
    this.terminal = terminal;
    this.colors = {
      "NPC": "var(--info)",
      "Player": "var(--success)",
      "Enemy": "var(--danger)"
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
          card.appendChild(characterSet[i].render(this.terminal));
        }
      });

      // display
      this.cards.map((x)=>x.style.display = "block");
  }
}

module.exports = PlayersDash
