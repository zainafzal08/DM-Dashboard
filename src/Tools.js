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
    events: {},
    tag: tagName,
    setDim(w,h) {
        this.style.width = w
        this.style.height = h
        return this
    },

    setMargin({left,right,top,bottom} = {left: "0rem",right: "0rem",top: "0rem",bottom: "0rem"}) {
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
    addText(tag,text,className,size) {
      let t = VDN(tag);
      t.root.innerHTML = text;
      t.style.fontSize = size;
      t.root.className = className;
      t.style.margin = "0px";
      this.addChild(t);
      return this;
    },
    bind(e,handler){
      this.events[e] = handler;
    },
    render() {
      let e = document.createElement(this.tag);
      for (let k in this.attributes)
        e.setAttribute(k,this.attributes[k]);
      for (let k in this.style)
        e.style[k]=this.style[k];
      for (let k in this.root)
        e[k]=this.root[k];
      for (let child of this.children)
        e.appendChild(child.render());
      for (let k in this.events)
        e.addEventListener(k,this.events[k]);
      return e
    }
  }
}

function makeDivVDN({className} = {className:""}) {
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

function closeModal() {
  let toDie = document.getElementById("thrownModal");
  toDie.style.display = "none";
  document.body.removeChild(toDie);
  document.getElementById("filter").style.display = "none";
}

function throwModal(m) {
  if (document.getElementById("thrownModal") === undefined) return;
  document.getElementById("filter").style.display = "block";
  let container = makeDivVDN({className: "thrown-modal"});
  container.root.id = "thrownModal";
  let top = makeDivVDN({className:"header"})
  let bottom = makeDivVDN({className:"content"})
  let i = makeIconVDN("close","close");
  i.bind("click",closeModal);
  i.root.className = "hoverable";
  i.children[0].style.fontSize = "1.2rem"
  i.attributes["data-balloon-pos"] = "left";
  top.addChild(i);
  bottom.addChild(m);
  container.addChild(top);
  container.addChild(bottom);
  container.style.padding = "1rem";
  document.body.appendChild(container.render());
}

module.exports = {
  VDN: VDN,
  makeDivVDN: makeDivVDN,
  makeFlexVDN: makeFlexVDN,
  makeIconVDN: makeIconVDN,
  watched: watched,
  sum: sum,
  getRndInteger: getRndInteger,
  throwModal: throwModal,
  closeModal: closeModal
}
