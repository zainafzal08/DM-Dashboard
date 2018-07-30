let story = watched(storyRaw,renderStory)

function renderStory() {
    let chapter = story.chapters[story.currentChapter]
    let container = document.getElementById("story-container")
    let title = document.getElementById("story-title")
    let pb = document.getElementById("story-progress-bar")
    container.innerHTML= markdown(chapter.raw,story)
    title.innerText = chapter.title
    pb.style.width = (((story.currentChapter+1)/story.chapters.length)*100)+"%"
}

function chapterUpdate(event) {
  let delta = 1
  if (event.target.id == "chapter-back") delta = -1
  let c = story.currentChapter + delta;
  if (c < 0 || c >= story.chapters.length) return;
  story.currentChapter = c;
}

document.getElementById("chapter-back").addEventListener("click",chapterUpdate)
document.getElementById("chapter-forward").addEventListener("click",chapterUpdate)

function init() {
  renderStory()
}

window.onload = init
