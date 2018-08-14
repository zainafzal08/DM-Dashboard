const tools = require('./Tools')

class Story {
  constructor(contentAnchor,titleAnchor,progressAnchor){
    this.contentAnchor = contentAnchor
    this.titleAnchor = titleAnchor
    this.progressAnchor = progressAnchor
    this.currentChapter = null
    this.characters = []
    this.chapters = []
    this.bootstrapColors = [
      "danger",
      "success",
      "warning",
      "info",
      "primary",
      "secondary"
    ]
  }
  loadFromJson(json){
    this.chapters = json.chapters
    this.currentChapter = json.currentChapter
    this.characters = json.characters
  }
  markdownify(ch) {
    let raw = this.chapters[ch].raw
    raw = raw.replace(/_(.*?)_/gi,"<i>$1</i>").replace(/\*(.*?)\*/gi,"<b>$1</b>")
    raw = raw.replace(/\-\-\-+/gi,"<hr>")
    let jmpIcon = "<a data-balloon='Chapter $1' data-balloon-pos='up'><i class='mdi mdi-share chapter-link jmp-link' id='jmp-link-$1'></i><a><br>"
    raw = raw.replace(/\<(\d+)\>/gi,jmpIcon)
    raw = raw.replace(/\[([^\[\]]*)\]\s*\"(.*?)\"/gi,(m,g1,g2,o,s)=>{
      let col = this.characters[g1.toLowerCase()]
      if (this.bootstrapColors.indexOf(col) == -1)
        return `<blockquote style="color: ${col}; border-left-color: ${col}"><b>${g1}:</b> ${g2}</blockquote>`
      return `<blockquote style="border-left-color: var(--${col})" class="text-${col}"><b>${g1}:</b> ${g2}</blockquote>`
    })
    raw = raw.replace(/\[([^\[\]]*)\]/gi,(m,g,o,s)=>{
      let col = this.characters[g.toLowerCase()]
      if (this.bootstrapColors.indexOf(col) == -1)
        return `<span style="color: ${col}"><b>${g}</b></span>`
      return `<span class="text-${col}"><b>${g}</b></span>`
    })
    return raw
  }
  render() {
    if (!this.contentAnchor || !this.titleAnchor || !this.progressAnchor) {
      console.log("Missing Anchors, Aborting render");
      return;
    }
    let chapter = this.chapters[this.currentChapter]
    let renderedContent = this.markdownify(this.currentChapter)
    this.contentAnchor.innerHTML = renderedContent
    this.titleAnchor.innerText = `${this.currentChapter+1}. ${chapter.title}`
    let p = (this.currentChapter+1)/this.chapters.length
    p *= 100
    p += "%"
    this.progressAnchor.style.width = p
    // set up jump links
    let links = document.getElementsByClassName("jmp-link");
    for(let e of links) {
      e.addEventListener("click",()=>{
        this.jump(parseInt(e.id.split("-")[2])-1)
      });
    }
  }
  next() {
    if (this.currentChapter >= this.chapters.length-1) return;
    this.currentChapter++;
    this.render();
  }
  prev() {
    if (this.currentChapter <= 0) return;
    this.currentChapter--;
    this.render();
  }
  jump(ch) {
    if (ch > this.chapters.length-1) return;
    if (ch < 0) return;
    this.currentChapter = ch;
    this.render();
  }
}

module.exports = Story
