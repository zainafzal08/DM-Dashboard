const tools = require('./Tools')

class Story {
  constructor(contentAnchor,titleAnchor,progressAnchor){
    this.contentAnchor = contentAnchor
    this.titleAnchor = titleAnchor
    this.progressAnchor = progressAnchor
    this.currentChapter = null
    this.characters = []
    this.chapters = []
  }
  loadFromJson(json){
    this.chapters = json.chapters
    this.currentChapter = json.currentChapter
    this.characters = json.characters
  }
  render() {
    let chapter = this.chapters[this.currentChapter]
    let renderedContent = this.markdownify(this.currentChapter)
    this.contentAnchor.innerHTML = renderedContent
    this.titleAnchor.innerText = `${this.currentChapter+1}. ${chapter.title}`
    let p = (this.currentChapter+1)/this.chapters.length
    p *= 100
    p += "%"
    this.progressAnchor.style.width = p
  }
  next() {
    if (this.currentChapter >= this.chapters.length-1) return
    this.currentChapter++
    this.render()
  }
  prev() {
    if (this.currentChapter <= 0) return
    this.currentChapter--
    this.render()
  }
}

module.exports = Story
