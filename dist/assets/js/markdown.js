let bootstrapColors = [
  "danger",
  "success",
  "warning",
  "info",
  "primary",
  "secondary"
]

function markdown(raw,story) {
  raw = raw.replace(/_(.*?)_/gi,"<i>$1</i>")
  raw = raw.replace(/\*(.*?)\*/gi,"<b>$1</b>")
  raw = raw.replace(/\-\-\-+/gi,"<hr>")
  raw = raw.replace(/\<(\d+)\>/gi,"<i class='mdi mdi-share chapter-link' onclick='story.currentChapter=$1-1'></i><br>")
  raw = raw.replace(/\[(.*?)\]\s*\"(.*?)\"/gi,(m,g1,g2,o,s)=>{
    let col = story.characters[g1.toLowerCase()]
    if (bootstrapColors.indexOf(col) == -1)
      return `<blockquote style="color: ${col}; border-left-color: ${col}"><b>${g1}:</b> ${g2}</blockquote>`
    return `<blockquote style="border-left-color: var(--${col})" class="text-${col}"><b>${g1}:</b> ${g2}</blockquote>`
  })
  raw = raw.replace(/\[(.*?)\]/gi,(m,g,o,s)=>{
    let col = story.characters[g.toLowerCase()]
    if (bootstrapColors.indexOf(col) == -1)
      return `<span style="color: ${col}"><b>${g}</b></span>`
    return `<span class="text-${col}"><b>${g}</b></span>`
  })
  return raw
}
