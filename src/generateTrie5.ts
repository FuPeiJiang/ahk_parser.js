//function at the end of trie
const d = console.debug.bind(console)

const trie = {}
const addToTrie = createAddToTrie(trie)
addToTrie('while', () => console.log(23423))
addToTrie('wOke', () => console.log('fwefwe\'f'))

trie['w']['h']['i']['l']['e']()

d(objToString(trie))

function objToString(obj) {
  var str = ''
  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      if (typeof obj[p] === 'object') {
        str += `,${p}:${objToString(obj[p])}`
      } else {
        str += `,${p}:${obj[p]}` //lol this implicitly calls func.toString()
      }
    }
  }
  return `{${str.slice(1)}}` //remove the first , from string. removes nothing if empty string
}

// https://stackoverflow.com/questions/34193832/forming-a-trie-object-in-javascript#comment-56133947
// If you're using Node.js, you may also try console.dir(), which lets you increase the max depth – console.dir(strie, { depth: 10 }). (Note: default is 2.)
// console.dir(trie, { depth: 10 })
// d(JSON.stringify(trie))
// {"w":{"h":{"i":{"l":{"e":"() => console.log(23423)"}}},"O":{"i":{"l":{"e":"() => console.log('grgergerg')"}}}}}


// https://stackoverflow.com/questions/6754919/json-stringify-function#answer-6755052
// haven't tried this https://www.npmjs.com/package/json-fn
/* d(
  JSON.stringify(trie, function(key, val) {
    if (typeof val === 'function') {
      // return val.toString() // implicitly `toString` it
      // return val + '' // implicitly `toString` it
    }
    return val
  })
) */



function createAddToTrie(trie) {
  let c: number, strLenMinusOne
  return function addToTrie(string1, func) {
    c = 0, strLenMinusOne = string1.length - 1
    recursiveAddKey(trie)
    function recursiveAddKey(obj) {
      const letter = string1[c]
      if (c < strLenMinusOne) {
        obj[letter] = obj[letter] || {}
        c++
        recursiveAddKey(obj[letter])
      } else {
        obj[letter] = func
        // obj[letter] = func.toString()

      }
    }
  }
}

