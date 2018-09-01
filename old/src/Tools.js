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
    classes: [],
    get first() {
      return this.children[0];
    },
    get second() {
      return this.children[1];
    },
    addClass(c) {
      this.classes.push(c);
    },
    flex(d) {
      this.style.display = "flex";
      this.style.flexDirection = d;
      return this;
    },
    align(a) {
      this.style.alignItems = a;
      return this;
    },
    justify(j) {
      this.style.justifyContent = j;
      return this;
    },
    fitH(h,m) {
      if(m != undefined)
        this.style.height = `calc(${h} - ( 2 * ${m} ))`;
      else
        this.style.height = h;
      this.style.marginTop = this.style.marginBottom = m;
      return this;
    },
    fitW(w,m){
      if(m != undefined)
        this.style.width = `calc(${w} - ( 2 * ${m} ))`;
      else
        this.style.width = w;
      this.style.marginLeft = this.style.marginRight = m;
      return this;
    },
    addIcon(i,tt) {
      let a = VDN("a");
      a.attributes["data-balloon"] = tt;
      a.attributes["data-balloon-pos"] = "up";
      let icon = VDN("i");
      icon.root.className = "mdi mdi-"+i;
      icon.style.color = "#777";
      icon.style.fontSize = "0.9rem";
      a.addChild(icon);
      this.addChild(icon);
      return this;
    },
    setText(t,s) {
      if (s != undefined)
        this.style.fontSize = s;
      this.innerText = t;
      return this;
    }
    addChild(c) {
      this.children.push(c)
      return this;
    },
    bind(e,handler){
      this.events[e] = handler;
      return this;
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
      for (let c in this.classes)
        e.classList.add(c);
      return e
    }
  }
}

// OTHER
function getRndInteger(min, max) {
    max+=1;
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
  watched: watched,
  sum: sum,
  getRndInteger: getRndInteger,
  throwModal: throwModal,
  closeModal: closeModal
}
