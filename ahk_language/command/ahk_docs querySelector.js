listItems = document.querySelectorAll('tbody > tr > td:first-of-type > a')
finalStr = ''
for (let i = 0, len = listItems.length; i < len; i++) {
  finalStr += `\n${listItems[i].innerHTML}`
}
finalStr = finalStr.slice(1)
console.log(finalStr)