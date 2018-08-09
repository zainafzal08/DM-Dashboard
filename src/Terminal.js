const tools = require('./Tools')

class Terminal {
  constructor(inputAnchor,outputAnchor) {
    this.output = outputAnchor
    this.input = inputAnchor
    this.commands = [
      [/roll (\d+) d(\d+)/,this.rollDice],
      [/r (\d+) d(\d+)/,this.rollDice],
      [/clear/,this.clear]
    ]
    this.pos = null
    this.history = []
    this.input.addEventListener("keydown",this.registerKeyDown)
  }
  registerKeyDown(event) {
    let key = event.keyCode || event.charCode;
    // up/down
    if (key == 38 || key == 40) {
        if (this.history.length == 0) return;
        if (key == 38) {
          if (this.pos === null) this.pos = this.history.length-1
          else if (this.pos > 0) this.pos--
        } else {
          if (this.pos === null) return;
          else if (this.pos < this.history.length-1) this.pos++
        }
        this.input.value = this.history[this.pos]
    }
  }
  writeOutput(t) {
    let result = document.createElement("p")
    result.className = "lead"
    result.style.fontSize = "1rem"
    result.style.margin = "0px"
    result.innerText = t
    this.output.appendChild(result)
    this.output.scrollTop = output.clientHeight;
  }
  writeError(t) {
    let result = document.createElement("p")
    result.className = "lead text-danger"
    result.style.fontSize = "1rem"
    result.style.margin = "0px"
    result.innerText = t
    this.output.appendChild(result)
    this.output.scrollTop = output.clientHeight;
  }
  execute() {
    let cmd = this.input.value
    this.history.push(cmd)
    cmd = cmd.toLowerCase().replace(/\s+/," ")
    let l = this.commands.map((x)=>[x[0].exec(cmd),x[1]]).filter((x)=>x[0])
    let m = null
    if(l.length > 0) m = l[0]
    if (m) m[1](m[0].slice(1))
  }

  // commands
  clear() {
    this.output.innerHTML = ""
  }

  rollDice(args) {
    let n = parseInt(args[0])
    let d = parseInt(args[1])
    let rolls = Array(n).fill(0).map((x)=>getRndInteger(1,d+1))
    if(n > 1)
       this.writeOutput(`${sum(rolls)} (${rolls.join("+")})`)
    this.writeOutput(sum(rolls))
  }

}
