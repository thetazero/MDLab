function markdown(text) {
  // console.log(toHTML(tokenize(text)))
  return toHTML(toInstructions(tokenize(text)))
}

function tokenize(str) {
  let res = []
  str = str.replace(/}/g, '{')
  str = str.split('')
  let stack = ''
  let key = {
    '#': 3,
    '\n': 1,
    '*': 1,
    '_': 2,
    '{': 1,
    '-': 1,
  }
  for (let i = 0; i < str.length; i++) {
    let len = key[str[i]]
    // console.log(len, stack.length, key[stack[0]], key[str[i]] == undefined)
    if (i == 0 || (stack[0] == str[i] && len > stack.length) || (key[stack[0]] == undefined && key[str[i]] == undefined)) {
      stack += str[i]
    } else {
      res.push(stack)
      stack = str[i]
    }
    // console.log(len, str[i], stack)
  }
  res.push(stack)
  return res
}

function toInstructions(tokens) {
  res = []
  let newLinesAfterListStarted = false
  let listStarted = false
  for (let i = 0; i < tokens.length; i++) {
    t = tokens[i]
    if (t == '-') {
      newLinesAfterListStarted = 0
      if (!listStarted) {
        listStarted = true
        res.push('<ul>')
      }
      res.push(t)
    } else if (t == '\n') {
      newLinesAfterListStarted++;
      res.push(t)
      if (newLinesAfterListStarted == 2) {
        res.push('</ul>')
        listStarted = false
      }
    } else {
      res.push(t)
    }
  }
  return res
}

function toHTML(tokens) {
  let res = ''
  let key = {
    "*": "b",
    "_": "u",
    "__": "i",
    '{': 'value',
  }
  let lineKey = {
    "#": "h1",
    "##": "h2",
    "###": "h3",
    '-': 'li'
  }
  let newlineOpen = []
  let normalOpen = []
  for (let i = 0; i < tokens.length; i++) {
    let t = tokens[i]
    if (lineKey[t]) {
      newlineOpen.push(t)
      res += `<${lineKey[t]}>`
    } else if (key[t]) {
      if (normalOpen.includes(t)) {
        normalOpen.splice(normalOpen.indexOf(t), 1)
        res += `</${key[t]}>`
      } else {
        normalOpen.push(t)
        res += `<${key[t]}>`
      }
    } else if (t == "\n") {
      for (let j = newlineOpen.length - 1; j > -1; j--) {
        // console.log(newlineOpen)
        res += `</${lineKey[newlineOpen[j]]}>`
      }
      if (!newlineOpen.length) {
        res += `<br>`
      }
      newlineOpen = []
    } else {
      res += t
    }
  }
  return res;
}

class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}