function watched(o,change) {
  let handler = {
    set: (obj,prop,value) => {
      obj[prop]=value
      change(obj)
    }
  }
  return new Proxy(o,handler)
}

function VDN(tagName) {
  return {
    style: {},
    root:{},
    attributes: {},
    children: [],
    tag: tagName,
    setDim(w,h) {
        this.style.width = w
        this.style.height = h
        return this
    },
    setMargin(left="0rem",right="0rem",top="0rem",bottom="0rem") {
      this.style.marginLeft = left
      this.style.marginRight = right
      this.style.marginTop = top
      this.style.marginBottom = bottom
      return this
    },
    addChild(c) {
      this.children.push(c)
      return this
    },
    addText(tag,text,className="",size="1rem") {
      t = VDN(tag)
      t.root.innerHTML = text
      t.style.fontSize = size
      t.root.className = className
      this.addChild(t)
      return this
    },
    render() {
      let e = document.createElement(this.tag)
      for (let k in this.attributes)
        e.setAttribute(k,this.attributes[k])
      for (let k in this.style)
        e.style[k]=this.style[k]
      for (let k in this.root)
        e[k]=this.root[k]
      for (let child in this.children)
        e.appendChild(child.render())
      return e
    }
  }
}

function makeDivVDN(className="") {
  let d = VDN("div")
  d.root.className = className
  return d
}

function makeFlexVDN(dir,jc,ai) {
  let div = VDN("div")
  div.style.display = "flex"
  div.style.flexDirection = dir
  div.style.justifyContent = jc
  div.style.alignItems = ai
  return div
}

function makeIconVDN(i,tt) {
  let a = VDN("a")
  a.attributes["data-balloon"] = tt
  a.attributes["data-balloon-pos"] = "up"
  let icon = VDN("i")
  icon.root.className = "mdi mdi-"+i
  icon.style.color = "#777"
  icon.style.fontSize = "0.9rem"
  a.addChild(icon)
  return a
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function sum(l) {
  return l.reduce((v,a)=>a+v)
}

module.exports = {
  VDN: VDN,
  makeDivVDN: makeDivVDN,
  makeFlexVDN: makeFlexVDN,
  makeIconVDN: makeIconVDN,
  watched: watched,
  sum: sum,
  getRndInteger: getRndInteger
}
