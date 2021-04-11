const d = console.debug.bind(console)

const string1 = 'while'
const c = 0
const charsLength = string1.length
const trie = {}
var currentTrie = []
currentTrie[0] = trie
addToTrie(string1, trie)

function addToTrie(string1, trie, c = 0) {
  const letter = string1[c]
  trie[letter] = trie[letter] || {}
  if (letter) {
    addToTrie(string1, trie[letter], c + 1)
  }
}

d(currentTrie[0])