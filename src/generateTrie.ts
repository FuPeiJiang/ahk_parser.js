const d = console.debug.bind(console)

const string1 = 'while'
let c = 0
const charsLength = string1.length
const trie = {}
var currentTrie = []
currentTrie[0] = trie
while (c < charsLength) {
  d(string1[c], c)
  d(currentTrie[c])
  currentTrie[c][string1[c]] = currentTrie[c][string1[c]] || {}
  d(currentTrie[c])
  currentTrie[c + 1] = currentTrie[c][string1[c]]
  d(currentTrie)
  c++
}
d(currentTrie[0])