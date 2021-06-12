import {strictEqual} from 'assert'
import ahkParser from '../src/parser/index'
import modifyEverythingToV2 from '../src/modifyEverythingToV2'
import fs from 'fs'

function toV2(text) {
  const everything = ahkParser(text.replace(/\r/g,''))
  const converted = modifyEverythingToV2(everything)
  return converted
}
function doIt(v1,v2) {
  it(`\`${v1}\`,\`${v2}\``,function() {
    strictEqual(toV2(v1),v2)
  })
}
function readFileToString(path) {
  return fs.readFileSync(`${__dirname}/${path}`).toString()
}
function doItFiles(path1,path2) {
  it(`\`${path1}\`,\`${path2}\``,function() {
    strictEqual(toV2(readFileToString(path1)),readFileToString(path2))
  })
}

describe('toV2(text)',function() {
  describe('{} -> Map()',function() {
    doIt('v:={}','v:=Map()')
    doIt('v:={a:b}','v:=Map("a",b)')
    doIt('v:={a:{a:{a:b, c:[]}}}','v:=Map("a",Map("a",Map("a",b, "c",[])))')
  })
  describe('VarSetCapacity()',function() {
    doIt('VarSetCapacity(a,b,c)','a:=BufferAlloc(b,c)')
    doIt('VarSetCapacity(a,VarSetCapacity(a,b,c),c)','a:=BufferAlloc(a:=BufferAlloc(b,c),c)')
  })
  // describe('v1 removed #DIRECTIVES',function() {
  // doIt('#NoEnv\n','')
  // })
  doItFiles('../tov2/jpgs to pdf.ahk','correct/jpgs to pdf.ah2')
})
