function watched(o,change) {
  let handler = {
    set: (obj,prop,value) => {
      obj[prop]=value
      change(obj)
    }
  }
  return new Proxy(o,handler)
}
