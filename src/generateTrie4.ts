const d = console.debug.bind(console)

const trie = {}
const addToTrie = createAddToTrie(trie)
addToTrie('while')
addToTrie('wOile')

// https://stackoverflow.com/questions/34193832/forming-a-trie-object-in-javascript#comment-56133947
// If you're using Node.js, you may also try console.dir(), which lets you increase the max depth – console.dir(strie, { depth: 10 }). (Note: default is 2.)
console.dir(trie, { depth: 10 })

function createAddToTrie(trie) {
  let c: number
  return function addToTrie(string1) {
    c = 0
    recursiveAddKey(trie)
    function recursiveAddKey(obj) {
      const letter = string1[c]
      if (letter) {
        obj[letter] = obj[letter] || {}
        c++
        recursiveAddKey(obj[letter])
      }
    }
  }
}

