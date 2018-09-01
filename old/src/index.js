const tools = require('./Tools')
const Story = require('./Story')
const test_story = require('./data/test_story.json')
const Terminal = require('./Terminal')
const PlayersDash = require('./PlayersDash')
const Character = require('./Character')
const characters = require('./data/test_characters.json')

// globals
let story = null;
let terminal = null;
let playersDash = null;

function storyDriver(){
  let content = document.getElementById("story-content");
  let title = document.getElementById("story-title");
  let progress = document.getElementById("story-progress");
  story = new Story(content,title,progress);
  story.loadFromJson(test_story);
  document.getElementById("chapter-next").addEventListener("click",()=>story.next());
  document.getElementById("chapter-previous").addEventListener("click",()=>story.prev());
  story.render();
}

function terminalDriver(){
  let input = document.getElementById("terminal-input");
  let output = document.getElementById("terminal-output");
  terminal = new Terminal(input,output);
}

function playersDashDriver(){
  let cards = ['character-left','character-middle','character-right'];
  cards = cards.map((x)=>document.getElementById(x));
  // TODO: remove cross dependency (kinda ruins encapsulation)
  playersDash = new PlayersDash(cards,terminal);
  terminal.playersDash = playersDash;
  characters.map((x)=>{
    let c = new Character();
    c.buildFromJson(x);
    playersDash.newCharacter(c);
  });
}
// init function
function init() {
  storyDriver();
  terminalDriver();
  playersDashDriver();
}

window.onload = init;
