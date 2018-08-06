class Characters {
  constructor(rerender){
    this.rerender = rerender
    this.characterList = []
  }
  function render() {
    this.rerender()
  }
}
