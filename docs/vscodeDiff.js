function vscodeDiff(rootElement, one, other) {
  const d = console.log.bind(console)

  /*   const one = `[
    {type:'assignment', text:'v', i1:0, c1:undefined, c2:1},
    {type:'2operator', text:':=', i1:0, c1:1, c2:3},
    {type:'{ object', text:'{', i1:0, c1:3},
    ooffewfwefwef1
    {type:'} object', text:'}', i1:0, c1:4},
    ooffewfwefwef2
    {type:'2operator', text:':=', i1:0, c1:1, c2:3},
    {type:'end assignment'},
    ooffewfwefwef3
  {type:'2operator', text:':=', i1:0, c1:1, c2:3},
    first
    second
    third
  ]`,
    other = `[
    {type:'assignment', text:'v', i1:0, c1:undefined, c2:1},
    {type:'2operator', text:':=', i1:0, c1:1, c2:3},
    {type:'{ object', text:'Map(', i1:0, c1:3},
    ooffewfwefwef1
    {type:'} object', text:')', i1:0, c1:4},
    ooffewfwefwef2
    {type:'2operator', text:'multi
    line
    3rd
    ', i1:0, c1:1, c2:3},
    {type:'end assignment'},
    ooffewfwefwef3
    first
    second
  {type:'2operator', text:':=', i1:0, c1:1, c2:3},
  ]` */
  /* const one = `[
  {type:'2operator', text:':=', i1:0, c1:1, c2:3},
    first
    second
    third
  ]`,
    other = `[
  {type:'2operator', text:':=', i1:0, c1:1, c2:3},
  ]` */

  // rootElement.style.backgroundColor = "#1e1e1e"
  document.body.style.backgroundColor = '#1e1e1e'

  let span = null

  // console.log(Diff.diffLines(one, other))

  const diff = Diff.diffWordsWithSpace(one, other)
  // const diff = Diff.diffChars(one, other)

  //<pre id="pre1" style="position: relative;width: 49vw;display: inline-block"></pre>
  //<pre id="pre2" style="position: relative;width: 49vw;display: inline-block"></pre>
  // pre1 = document.getElementById('pre1')
  // pre2 = document.getElementById('pre2')

  const pre1 = document.createElement('pre')
  pre1.style.position = 'relative'
  // pre1.style.width = '49vw'
  pre1.style.width = '50%'
  pre1.style.display = 'inline-block'
  pre1.style.overflow = 'hidden'
  // pre1.style.overflowX = 'hidden'
  pre1.style.verticalAlign = 'top'
  // pre1.style.backgroundColor = "#1e1e1e"
  const pre2 = pre1.cloneNode()

  // fragment = document.createDocumentFragment()
  console.log(diff)


  // 0x4B1818, 814, 169

  // const fragment2 = document.createDocumentFragment()
  const topOffSetUnit = 15
  const theEmSize = 1.3

  const theDiv = document.createElement('div')
  theDiv.style.fontFamily = 'Consolas,"Courier New",monospace'
  theDiv.style.fontSize = '14px'
  theDiv.style.color = '#d4d4d4'
  // theDiv.style.position = "absolute"
  // theDiv.style.position = "relative"
  // theDiv.style.zIndex = 2
  theDiv.style.display = 'inline-block'
  theDiv.style.textalign = 'center'
  // theDiv.style.height = 0 //hightlight won't work
  theDiv.style.width = 'auto'
  // theDiv.style.height = `${theEmSize}em`
  // theDiv.style.lineHeight = `${theEmSize}em`
  theDiv.style.height = `${topOffSetUnit}px`
  theDiv.style.lineHeight = `${topOffSetUnit}px`
  // theDiv.style.lineHeight = '1.3em'
  // redDiv.style.width = 'auto'

  const redDiv = theDiv.cloneNode()
  redDiv.style.backgroundColor = '#6F1313'
  const greenDiv = theDiv.cloneNode()
  greenDiv.style.backgroundColor = '#618311'

  const theSpan = document.createElement('span')
  theSpan.style.fontFamily = 'Consolas,"Courier New",monospace'
  // theSpan.style.fontFeatureSettings = '"liga" 0, "calt" 0'
  theSpan.style.fontSize = '14px'
  theSpan.style.textSizeAdjust = '100%'
  // theSpan.style.fontWeight = 400
  // theSpan.style.color = "rgb(212, 212, 212)"
  theSpan.style.color = '#d4d4d4'
  // theSpan.style.position = "absolute"
  theSpan.style.position = 'relative'
  // theSpan.style.display = "inline-block"
  // theSpan.style.verticalAlign = "bottom"
  theSpan.style.whiteSpace = 'no-wrap'
  theSpan.style.height = '17px'
  // theSpan.style.height = `100px`
  // theSpan.style.height = `${topOffSetUnit}px`
  // theSpan.style.lineHeight = "21.2px"
  // theSpan.style.lineHeight = 19/14
  // theSpan.style.lineHeight = `${topOffSetUnit}px`
  theSpan.style.zIndex = 2
  // theSpan.style.position = "absolute"
  // 0x32564B, 1051, 314
  // 0x4B5632, 1044, 265
  const redSpan = theSpan.cloneNode()
  redSpan.style.backgroundColor = '#6F1313'

  const greenSpan = theSpan.cloneNode()
  greenSpan.style.backgroundColor = '#618311'

  const baseHighlight = document.createElement('div')
  // baseHighlight.style.position = 'absolute'
  // baseHighlight.style.position = "relative"

  // const topOffSetUnit = 18.18
  // baseHighlight.style.height = `${theEmSize}em`
  // baseHighlight.style.height = '1.3em'
  baseHighlight.style.height = `${topOffSetUnit}px`

  // baseHighlight.style.height = '18.18px'
  baseHighlight.style.width = '100%'
  // baseHighlight.style.zIndex = 0


  // redDiv.appendChild(theSpan)

  const removedHighlight = baseHighlight.cloneNode()
  removedHighlight.style.backgroundColor = '#4B1818'
  const addedHighlight = baseHighlight.cloneNode()
  addedHighlight.style.backgroundColor = '#373D29'
  // removedHighlight.style.fontFamily = 'Segoe WPC,Segoe UI,sans-serif'

  // removedHighlight.style.textSizeAdjust = "100%"
  // removedHighlight.style.lineHeight = `21.2px`
  // removedHighlight.style.lineHeight = `18.2px`
  // removedHighlight.style.lineHeight = 18.2/13
  // removedHighlight.style.fontSize = "13px"
  // 8.8 x 19
  // 8.81 x 18.18
  const diagonalFill = baseHighlight.cloneNode()
  diagonalFill.style.backgroundImage = `linear-gradient(
  -45deg,
  rgba(204, 204, 204, 0.2) 12.5%,
  #0000 12.5%, #0000 50%,
  rgba(204, 204, 204, 0.2) 50%, rgba(204, 204, 204, 0.2) 62.5%,
  #0000 62.5%, #0000 100%
)`
  diagonalFill.style.backgroundSize = '8px 8px'
  diagonalFill.style.backgroundColor = '#1e1e1e'
  diagonalFill.style.color = '#d4d4d4'
  diagonalFill.style.zIndex = 3
  // diagonalFill.style.position = "relative"

  // background-image: linear-gradient(
  // -45deg
  // , rgba(204, 204, 204, 0.2) 12.5%, #0000 12.5%, #0000 50%, rgba(204, 204, 204, 0.2) 50%, rgba(204, 204, 204, 0.2) 62.5%, #0000 62.5%, #0000 100% );
  // background-size: 8px 8px;
  function getTop(num) {
    return `${num * theEmSize}em`
  }
  function getWidth(num) {
    return `${num * topOffSetUnit}px`
  }
  function doCurrentLineDiv(howManyFound) {
    for (let i = 0, howManyFoundMOne = howManyFound - 1; i < howManyFoundMOne; i++) {
      fragment1.appendChild(baseHighlight.cloneNode())
    }
    redCurrentLineDiv = baseHighlight.cloneNode()
  }
  let lineNumber = 0
  let alreadyHighlighted = false
  //red
  const fragment1 = document.createDocumentFragment()
  const fragment2 = document.createDocumentFragment()
  let redCurrentLineDiv = baseHighlight.cloneNode()
  let greenCurrentLineDiv = baseHighlight.cloneNode()
  const whichDiv = [redDiv, greenDiv]
    , whichCurrentLine = [redCurrentLineDiv, greenCurrentLineDiv]
    , firstFragment = [fragment1, fragment2]
    , secondFragment = [fragment2, fragment1]
    , whichHighlight = [removedHighlight, addedHighlight]

  diff.forEach((part) => {
    const text = part.value
    // const span = theSpan.cloneNode()
    // span.appendChild(document.createTextNode(text))
    // span.style.top = `${lineNumber * topOffSetUnit}px`
    let LR, idx1, idx2
    if (part.removed) {
      /*      const splitByNewline = text.split('\n')
           let len = splitByNewline.length
           //assume text is NOT empty
           if (text[text.length - 1] === '\n') {
             len--
           }
           redCurrentLineDiv.style.backgroundColor = '#4B1818'
           let tDiv = redDiv.cloneNode()
           tDiv.textContent = splitByNewline[0]
           redCurrentLineDiv.appendChild(tDiv)
           let tSpan
           if (len - 1) {
             lineNumber += len - 1
             for (let i = 1; i < len; i++) {
               fragment1.appendChild(redCurrentLineDiv)
               redCurrentLineDiv = removedHighlight.cloneNode()
               tSpan = redDiv.cloneNode()
               tSpan.textContent = splitByNewline[i]
               redCurrentLineDiv.appendChild(tSpan)
             }
           } */
      LR = 0
      idx1 = 0
      idx2 = 1
    } else if (part.added) {
      LR = 1
      idx1 = 1
      idx2 = 0
    } else {
      // span.style.backgroundColor = '#373D29'
      // const howManyFound = occurrences(text, '\n')
      const splitByNewline = text.split('\n')
      let len = splitByNewline.length
      //assume text is NOT empty
      if (text[text.length - 1] === '\n') {
        len--
      }
      let tDiv = theDiv.cloneNode()
      tDiv.textContent = splitByNewline[0]
      whichCurrentLine[0].appendChild(tDiv.cloneNode(true))
      whichCurrentLine[1].appendChild(tDiv)
      if (len - 1) {
        lineNumber += len - 1
        for (let i = 1; i < len; i++) {
          fragment1.appendChild(whichCurrentLine[0])
          fragment2.appendChild(whichCurrentLine[1])
          whichCurrentLine[0] = baseHighlight.cloneNode()
          whichCurrentLine[1] = baseHighlight.cloneNode()
          tDiv = theDiv.cloneNode()
          tDiv.textContent = splitByNewline[i]
          whichCurrentLine[0].appendChild(tDiv.cloneNode(true))
          whichCurrentLine[1].appendChild(tDiv)
        }
        // doCurrentLineDiv(howManyFound)
      }
      // fragment1.appendChild(currentLineDiv)
      return
    }
    const splitByNewline = text.split('\n')
    let lenMOne = splitByNewline.length - 1
    //assume text is NOT empty
    if (text[text.length - 1] === '\n') {
      lenMOne--
    }
    let tDiv = whichDiv[LR].cloneNode()
    tDiv.textContent = splitByNewline[0]
    whichCurrentLine[idx1].appendChild(tDiv)
    if (lenMOne) {
      lineNumber += lenMOne

      for (let i = 1, len = lenMOne + 1; i < len; i++) {
        // d(whichCurrentLine[idx1])
        firstFragment[LR].appendChild(whichCurrentLine[idx1])
        whichCurrentLine[idx1] = whichHighlight[LR].cloneNode()
        tDiv = whichDiv[LR].cloneNode()
        tDiv.textContent = splitByNewline[i]
        whichCurrentLine[idx1].appendChild(tDiv)
      }

      secondFragment[LR].appendChild(whichCurrentLine[idx2])
      whichCurrentLine[idx2] = diagonalFill.cloneNode()
      // currentLineDiv.style.height = `${lenMOne}em`
      whichCurrentLine[idx2].style.height = `${(lenMOne - 1) * topOffSetUnit}px`
      secondFragment[LR].appendChild(whichCurrentLine[idx2])
      whichCurrentLine[idx2] = baseHighlight.cloneNode()
    }
  })
  fragment1.appendChild(whichCurrentLine[0]) //push the final
  fragment2.appendChild(whichCurrentLine[1]) //push the final
  // fragment1.appendChild(redCurrentLineDiv) //push the final
  // fragment2.appendChild(greenCurrentLineDiv) //push the final

  pre1.appendChild(fragment1)
  pre2.appendChild(fragment2)

  // const fragmentAll = document.createDocumentFragment()
  // fragmentAll.appendChild(pre1)
  // fragmentAll.appendChild(pre2)
  // rootElement.appendChild(fragmentAll)
  rootElement.replaceChildren(pre1, pre2)
  // rootElement.appendChild(document.createDocumentFragment().appendChild(pre1))
  return
  throw 234


  lineNumber = 0

  // const fragment2 = document.createDocumentFragment()
  //green
  diff.forEach((part) => {
    const text = part.value
    if (part.removed) {
      const howManyFound = occurrences(text, '\n')
      if (howManyFound) {
        lineNumber += howManyFound
        const highlight = diagonalFill.cloneNode()
        d(highlight.style.backgroundImage)
        highlight.style.height = `${howManyFound * 19}px`
        // highlight.style.top = `${lineNumber * 19}px`
        fragment2.appendChild(highlight)
      }
    } else if (part.added) {

      span = theSpan.cloneNode()
      // if (part.added) {
      // span.style.backgroundColor = '#4ec9b0'
      span.style.backgroundColor = '#618311'
      // span.style.backgroundColor = '#4B5632'
      // span.style.backgroundColor = '#32564B'
      // span.style.backgroundColor = 'green'

      const highlight = addedHighlight.cloneNode()
      highlight.style.top = `${lineNumber * 19}px`
      fragment2.appendChild(highlight)

      let howManyFound = occurrences(text, '\n')
      if (text.slice(-1) === '\n') {
        howManyFound--
      }
      for (let i = 0; i < howManyFound; i++) {
        lineNumber++
        const highlight = addedHighlight.cloneNode()
        d(lineNumber)
        highlight.style.top = `${lineNumber * 19}px`
        fragment2.appendChild(highlight)
      }

    } else {
      // span.style.backgroundColor = '#373D29'
      const howManyFound = occurrences(text, '\n')
      if (howManyFound) {
        lineNumber += howManyFound
      }
    }

    span.appendChild(document
      .createTextNode(text))



    fragment2.appendChild(span)
    // }
  })
  pre1.appendChild(fragment1)
  pre2.appendChild(fragment2)

  // const fragmentAll = document.createDocumentFragment()
  fragmentAll.appendChild(pre1)
  fragmentAll.appendChild(pre2)
  rootElement.appendChild(fragmentAll)

  /* diff.forEach((part) => {
    // green for additions, red for deletions
    // grey for common parts
    const color = part.added ? 'green' :
      part.removed ? 'red' : 'grey'
    span = document.createElement('span')
    span.style.color = color
    span.appendChild(document
      .createTextNode(part.value))
    fragment1.appendChild(span)
  }) */

  function occurrences(string, subString) {
    const substrLen = subString.length
    string += ''
    subString += ''
    if (substrLen <= 0) {return (string.length + 1)}

    var n = 0,
      pos = 0,
      step = substrLen

    while (true) {
      pos = string.indexOf(subString, pos)
      if (pos >= 0) {
        ++n
        pos += step
      } else {break}
    }
    return n
  }

}