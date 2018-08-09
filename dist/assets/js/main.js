
function hit(args) {
  let character = characters.getCharacter(args[0])
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


// Terminal
function execute(command) {
  command = command.toLowerCase()
  command = command.replace(/\s+/," ")



  let l = commands.map((x)=>[x[0].exec(command),x[1]]).filter((x)=>x[0])
  let m = null
  if(l.length > 0) m = l[0]
  if (m) {
    let r = m[1](m[0].slice(1))
    if (r) result.innerText = r[1]

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
  terminal = {
      history: [],
      pos: null,
      currentState: ""
    }
  document.getElementById("terminal-input").addEventListener("keypress",terminalKeyPress)
  document.getElementById("terminal-input").addEventListener("keydown",terminalSpecial)
}

window.onload = init
