const d = console.debug.bind(console)

const string1 = 'while'
const charsLength = string1.length
let c = 0
const trie = {}
c = 0
addToTrie(trie)

d(trie)


function addToTrie(trie) {
  const letter = string1[c]
  if (letter) {
    trie[letter] = trie[letter] || {}
    c++
    addToTrie(trie[letter])
  }
}
