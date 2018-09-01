<template>
  <div class="container">
    <div class="toolbar">
      <button class="tool bg-warning">Swap Characters</button>
      <button class="tool bg-danger">Start Battle</button>
      <button class="tool bg-info">Console Help</button>
      <button class="tool bg-success">Generate NPC</button>
    </div>
    <div class="terminal-ui">
      <div class="output">
        <p v-for="item in history" class="lead terminal-output-item" :class="{'text-danger':item[1]}">
          {{item[0]}}
        </p>
      </div>
      <div class="input">
        <input type="text" id="input" v-on:keydown.enter="execute()"></input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Terminal',
  data () {
    return {
      history: [],
      commands: [
        [/clear/,this.clear],
        [/r(oll)? (\d+) d(\d+)/,this.rollDice],
        [/r(oll)?( a.*)d(\d+)/,this.rollDice]
      ]
    }
  },
  methods: {
    execute() {
      let cmd = document.getElementById("input").value;
      document.getElementById("input").value = "";
      let matches = this.commands.map((x)=>[x[0].exec(cmd),x[1]]);
      let match = matches.filter((x)=>(x[0]!==null));
      match = match.length > 0 ? match[0]:null;
      if(match) match[1](match[0].slice(1));
      else this.history.push(["Unknown Command",true])
    },
    clear(args) {
      this.history = [];
      this.history.push(["Cleared.",false]);
    },
    rollDice(args) {
      console.log(args.map((x)=>parseInt(x)).map((x)=>x==NaN));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .toolbar {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    height: 15%;
    border: #EBEBEB solid 2px;
    border-radius: 10px;
    margin-bottom: 1%;
    background-color: #FAFAFA;
  }
  .toolbar .tool {
    padding-left: 1rem;
    padding-right: 1rem;
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 0.8rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  }
  .terminal-ui {
    width: 100%;
    margin-top: 1%;
    height: 82%;
    border: #EBEBEB solid 2px;
    border-radius: 10px;
  }
  .terminal-ui .output {
    border-bottom: #EBEBEB solid 2px;
    width: 100%;
    height: 85%;
    max-height: 85%;
    background-color: #FAFAFA;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 1rem;
    overflow-y: scroll;
  }
  .terminal-ui .input {
    border-top: #EBEBEB solid 2px;
    width: 100%;
    height: 15%;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
  }
  .terminal-ui .input input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding-left: 2rem;
    padding-right: 2rem;
    color: #777;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
  }
  .terminal-output-item {
    margin: 0px;
    font-size: 1rem;
  }
</style>
