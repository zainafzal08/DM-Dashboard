// globals

let story = null
let terminal = null
let characters = null
let commands = [
  [/roll (\d+) d(\d+)/,rollDice],
  [/r (\d+) d(\d+)/,rollDice],
  [/clear/,clearTerminal],
  [/help/,helpMsg],
  [/hit (\w+) (\d+)/,hit],
  [/heal (\w+) (\d+)/,heal],
  [/set hp (\w+) (\d+)/,setHP]
]

// helpers
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
function sum(l) {
  return l.reduce((v,a)=>a+v)
}
function typeToColor(t) {
  if (t == "NPC") return "var(--info)"
  if (t == "Player") return "var(--success)"
  if (t == "Enemy") return "var(--danger)"
}

function getCharacter(n) {
  for(let character of characters) {
    if(character.name.toLowerCase().match(n)) return character
  }
  return null
}

function throwModal(card) {
  card.style.position = "absolute"
  document.body.style.opacity = "0.3"
}
// commands

// should just phantom click on the button
function helpMsg(args) {
    return ["error","Bitch you thought"]
}

function clearTerminal() {
  document.getElementById("terminal-output").innerHTML = ""
}

function rollDice(args) {
  let n = parseInt(args[0])
  let d = parseInt(args[1])
  let rolls = Array(n).fill(0).map((x)=>getRndInteger(1,d+1))
  if(n > 1)
    return ["output",sum(rolls) + " ( "+rolls.join("+")+" )"]
  return ["output",sum(rolls)]
}

function hit(args) {
  let character = getCharacter(args[0])
  if(character == null) return ["error","Unknown Character '"+args[0]+"'"]
  let newHp = character.hp - parseInt(args[1])
  adjustHP(character,newHp)
  return ["success","hit "+args[0]+" for "+args[1] +" points of damage"]
}

function heal(args) {
  args[1] = parseInt(args[1]) * -1
  let r = hit(args)
  r[1] = "healed "+args[0]+" for "+(args[1]*-1)+" points of HP"
  return r
}

function setHP(args) {
  let character = getCharacter(args[0])
  if(character == null) return ["error","Unknown Character '"+args[1]+"'"]
  adjustHP(character,parseInt(args[1]))
  return ["success","set HP for "+args[0] +" to "+args[1]]
}

function adjustHP(character, hp) {
  character.hp = hp
  if(character.hp >= (character.maxHP + character.tempHP)) character.hp = (character.maxHP+character.tempHP)
}
// Npcs

function makeBaseStats(character) {
  let baseStats = document.createElement("div")
  baseStats.style.display = "flex"
  baseStats.style.flexDirection = "row"
  baseStats.style.justifyContent = "space-around"
  baseStats.style.width = "calc(100% - 2rem)"
  baseStats.style.height = "15%"
  baseStats.style.marginLeft = "1rem"
  baseStats.style.marginRight = "1rem"
  let ac = makeIcon("shield",["#777","13"],"AC",direction="row")
  let initative = makeIcon("shield",["#777","13"],"AC",direction="row")
  let speed = makeIcon("shield",["#777","13"],"AC",direction="row")
  baseStats.appendChild(ac)
  baseStats.appendChild(initative)
  baseStats.appendChild(speed)
  return baseStats
}
function makeCharacterHeader(character) {
    let container = document.createElement("div")
    container.style.width = "100%"
    container.style.display = "flex"
    container.style.height = "25%"
    container.style.marginTop = "5%"
    container.style.alignItems = "center"
    container.style.justifyContent = "center"
    container.style.flexDirection = "column"
    let title = document.createElement("h6")
    title.innerText = character.name

    let subtitle = document.createElement("p")
    subtitle.innerText = "Level "+character.level+ " " + character.race + " " + character.class
    subtitle.className = "lead"
    subtitle.style.fontSize = "0.8rem"

    container.appendChild(title)
    container.appendChild(subtitle)
    return container
}
function makeIcon(i,t,tt,direction="col") {
  let container = document.createElement("div")
  let ttContainer = document.createElement("a")
  ttContainer.setAttribute("data-balloon",tt)
  ttContainer.setAttribute("data-balloon-pos","up")
  let icon = document.createElement("i")
  icon.className = "mdi mdi-"+i
  icon.style.color = "#777"
  icon.style.fontSize = "0.9rem"
  let text = document.createElement("p")
  text.style.color = t[0]
  text.innerText = t[1]
  text.style.fontSize = "0.9rem"
  text.style.textAlign = "center"
  container.style.marginTop = "1rem"
  container.style.width = "1rem"
  container.style.display = "flex"
  if(direction == "col") container.style.flexDirection = "column"
  if (direction == "row") {
    container.style.flexDirection = "row"
    container.style.width = "auto"
    icon.style.marginRight = "0.5rem"
    container.style.marginTop = "0rem"
  }
  ttContainer.appendChild(icon)
  container.appendChild(ttContainer)
  container.appendChild(text)
  return container
}

function statToMod(s) {
    let m = Math.floor(s/2)-5
    if (m == 0) return ["#BBB",m]
    if (m < 0) return ["var(--danger)",m]
    if (m > 0) return ["var(--success)","+"+m]
}

function makeCharacterStats(character) {
  let container = document.createElement("div")
  container.style.width = "calc(100% - 2rem)"
  container.style.display = "flex"
  container.style.height = "26%"
  container.style.marginTop = "2%"
  container.style.marginBottom = "6%"
  container.style.alignItems = "center"
  container.style.justifyContent = "space-between"
  container.style.flexDirection = "row"
  container.style.marginLeft = "1rem"
  container.style.marginRight = "1rem"
  container.style.borderTop = "solid #EBEBEB 2px"
  container.style.borderBottom = "solid #EBEBEB 2px"
  container.appendChild(makeIcon("sword",statToMod(character.stats.str),"str: "+character.stats.str))
  container.appendChild(makeIcon("run-fast",statToMod(character.stats.dex),"dex: "+character.stats.dex))
  container.appendChild(makeIcon("heart-half-full",statToMod(character.stats.con),"con: "+character.stats.con))
  container.appendChild(makeIcon("atom",statToMod(character.stats.int),"int: "+character.stats.int))
  container.appendChild(makeIcon("earth",statToMod(character.stats.wis),"wis: "+character.stats.wis))
  container.appendChild(makeIcon("forum",statToMod(character.stats.chr),"chr: "+character.stats.chr))
  return container
}

function healthToColor(hp) {
  if (hp >= 50) return "bg-success"
  if (hp >= 20) return "bg-warning"
  return "bg-danger"
}

function makeCharacterHP(character) {
  let container = document.createElement("div")
  container.className = "progress"
  let bar = document.createElement("div")
  let p = Math.floor((character.hp/(character.maxHP+character.tempHP))*100)
  bar.className = "progress-bar "+healthToColor(p)
  bar.style.width = p+"%"
  container.style.marginLeft = "1rem"
  container.style.marginRight= "1rem"
  container.style.height = "0.3rem"
  container.appendChild(bar)
  return container
}

function makeCharacterSubHeading(t) {
  let container = document.createElement("p")
  container.className = "lead"
  container.innerText = t
  container.style.fontSize = "0.8rem"
  container.style.marginLeft = "1.5rem"
  container.style.marginBottom  = "0.2rem"
  return container
}
function renderCharacters() {
    let leftCard = document.getElementById("character-left")
    let middleCard = document.getElementById("character-middle")
    let rightCard = document.getElementById("character-right")
    let cards = [leftCard,middleCard,rightCard]
    // clear
    cards.map((x,i)=>x.innerHTML = "")
    // get characters
    let characterSet = characters.filter((x)=>x.shown)
    if(characterSet.length > 3) characterSet = characterSet.slice(0,3)

    // set basic paramaters
    cards.map((x,i)=>x.style.borderTopColor = typeToColor(characterSet[i].type))
    cards.map((x,i)=>x.appendChild(makeCharacterHeader(characterSet[i])))
    cards.map((x,i)=>x.appendChild(makeBaseStats(characterSet[i])))
    cards.map((x,i)=>x.appendChild(makeCharacterStats(characterSet[i])))
    cards.map((x,i)=>x.appendChild(makeCharacterSubHeading("HP")))
    cards.map((x,i)=>x.appendChild(makeCharacterHP(characterSet[i])))
    // display all
    cards.map((x)=>x.style.display = "block")
}

// Story

function renderStory() {
    let chapter = story.chapters[story.currentChapter]
    let container = document.getElementById("story-container")
    let title = document.getElementById("story-title")
    let pb = document.getElementById("story-progress-bar")
    container.innerHTML= markdown(chapter.raw,story)
    title.innerText = (story.currentChapter+1) + ". " +chapter.title
    pb.style.width = (((story.currentChapter+1)/story.chapters.length)*100)+"%"
}

function chapterUpdate(event) {
  let delta = 1
  if (event.target.id == "chapter-back") delta = -1
  let c = story.currentChapter + delta;
  if (c < 0 || c >= story.chapters.length) return;
  story.currentChapter = c;
}

// Terminal
function execute(command) {
  command = command.toLowerCase()
  command = command.replace(/\s+/," ")

  result = document.createElement("p")
  result.className = "lead"
  result.style.fontSize = "1rem"
  result.style.margin = "0px"

  let l = commands.map((x)=>[x[0].exec(command),x[1]]).filter((x)=>x[0])
  let m = null
  if(l.length > 0) m = l[0]
  if (m) {
    let r = m[1](m[0].slice(1))
    if (r) result.innerText = r[1]
    if (r && r[0] == "error") result.className = "lead text-danger"
    if (r && r[0] == "success") result.className = "lead text-success"
  } else {
    result.className = "lead text-danger"
    result.innerText = "Unknown Command"
  }

  document.getElementById("terminal-output").appendChild(result)
}

function flushTerminal() {
    document.getElementById("terminal-input").value = ""
    let buffer = terminal.currentState;
    terminal.currentState = ""
    terminal.history.push(buffer)
    execute(buffer)
    let output = document.getElementById("terminal-output")
    output.scrollTop = output.clientHeight;
}

function terminalKeyPress(event) {
    let k = event.key
    terminal.pos = null
    if (k == "Enter") {
      flushTerminal()
    } else {
      terminal.currentState += k
    }
}

function terminalSpecial(event) {
    var key = event.keyCode || event.charCode;
    if (key == 8 || key == 46) {
        terminal.currentState = terminal.currentState.substring(0, terminal.currentState.length - 1);
        terminal.pos = null
    }
    if (key == 38) {
        if(terminal.history.length == 0) return;
        if(terminal.pos === null) terminal.pos = terminal.history.length
        if(terminal.pos != 0) terminal.pos--
        document.getElementById("terminal-input").value = terminal.history[terminal.pos]
        terminal.currentState = terminal.history[terminal.pos]
    }
    if (key == 40) {
        if (terminal.history.length == 0) return;
        if (terminal.pos === null) return;
        if (terminal.pos != terminal.history.length-1) terminal.pos++
        document.getElementById("terminal-input").value = terminal.history[terminal.pos]
        terminal.currentState = terminal.history[terminal.pos]
    }
}
// init
function init() {
  story = watched(storyRaw,renderStory)
  terminal = {
      history: [],
      pos: null,
      currentState: ""
    }
  let characters = new Characters(renderCharacters);

  document.getElementById("chapter-back").addEventListener("click",chapterUpdate)
  document.getElementById("chapter-forward").addEventListener("click",chapterUpdate)
  document.getElementById("terminal-input").addEventListener("keypress",terminalKeyPress)
  document.getElementById("terminal-input").addEventListener("keydown",terminalSpecial)
  renderStory()
  characters.render()
}

window.onload = init
