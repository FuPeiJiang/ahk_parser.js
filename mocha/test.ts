import {strictEqual} from 'assert'
import ahkParser from '../src/parser/index'
import modifyEverythingToV2 from '../src/modifyEverythingToV2'
import fs from 'fs'
const d = console.log.bind(console)

// https://stackoverflow.com/questions/16144455/mocha-tests-with-extra-options-or-parameters#16145019
if (process.env.doFixTest) {
  //replace the function
  doItFiles = doItFilesDoFixTests
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
    doIt('VarSetCapacity(a,b,c)','a:=Buffer(b,c)',false)
  })
  // describe('v1 removed #DIRECTIVES',function() {
  // doIt('#NoEnv\n','')
  // })
  doItFiles('../tov2/jpgs to pdf.ahk','correct/jpgs to pdf.ah2')
  describe('A_IsUnicode',function() {
    doIt('size := VarSetCapacity( bufName, 255*( A_IsUnicode ? 2 : 1 ), 0 )','size := bufName:=BufferAlloc(255*2,0)')
    doIt('foo( bufName, 255*( A_IsUnicode ? 2 : 1 ), 0 )','foo( bufName, 255*2, 0 )')
    doIt('foo( bufName, A_IsUnicode ? 510 : 255 , 0 )','foo( bufName, 510, 0 )')
    doItFiles('../v2tests/A_IsUnicode.ahk','correct/A_IsUnicode.ah2')
  })
  doItFiles('../tov2/!get colour_mid.ahk','correct/!get colour.ah2')
  doItFiles('../tov2/RunCMD_mid.ahk','correct/RunCMD_mid.ah2')
  doItFiles('../tests3/numIfNum.ahk','correct/numIfNum.ah2')
  doItFiles('../tests3/listlines.ahk','correct/listlines.ah2')
  doItFiles('../tests3/v1assign with whiteSpace then nothing.ahk','correct/v1assign with whiteSpace then nothing.ah2')
  doItFiles('../tests3/Renamed variables.ahk','correct/Renamed variables.ah2')
  doItFiles('../tests3/elseTryFinally.ahk','correct/elseTryFinally.ah2')
  doIt('if(v<>"W")','if(v!="W")')
  describe('new Class',function() {
    doIt('DB:=new SQLiteDB','DB:=SQLiteDB.New()')
    doIt('DB:=new SQLiteDB','DB:=SQLiteDB()',false)
  })
  describe('commandFirstParamToFunction',function() {
    doIt(String.raw`IniRead, SQLiteDLL, %A_ScriptDir%\SQLiteDB.ini, Main, DllPath, %SQLiteDLL% ; old`
      ,String.raw`SQLiteDLL:=IniRead(A_ScriptDir "\SQLiteDB.ini","Main","DllPath",SQLiteDLL ); old`)
  })
  doIt('WinGetTitle, OutputVar, A','OutputVar:=WinGetTitle("A")')
  doIt('v:=spr " h"ySep " w"3*xSep " v" "t_" c "_" r','v:=spr " h" ySep " w" 3*xSep " v" "t_" c "_" r')
  doIt('v:=2 "s"','v:=2 "s"')
  doItFiles('../tests3/continuation ) closing parenthesis.ahk','correct/continuation ) closing parenthesis.ah2')
  doItFiles('../tests4/if var in.ahk','correct/if var in.ah2')
  doItFiles('../tests2/function definition fix.ahk','correct/function definition fix.ah2')
  doItFiles('../tests4/fix loop num bracket.ahk','correct/fix loop num bracket.ah2')
  doItFiles('../tests4/loop files EnvGet SystemRoot.ahk','correct/loop files EnvGet SystemRoot.ah2')
  doIt('loop % v\nMsgBox % A_Index}','loop v\nMsgBox A_Index}')
  doItFiles('../tests4/v1 percent next to each other.ahk','correct/v1 percent next to each other.ah2')
  doItFiles('../tests3/splitpath.ahk','correct/splitpath.ah2')
  doItFiles('../v2tests/NumGet.ahk','correct/NumGet.ah2')
})

function toV2(text,is_AHK_H = true) {
  const everything = ahkParser(text.replace(/\r/g,''))
  const converted = modifyEverythingToV2(everything,is_AHK_H)
  return converted
}
function doIt(v1,v2,is_AHK_H = true) {
  it(`\`${v1}\`,\`${v2}\``,function() {
    strictEqual(toV2(v1,is_AHK_H),v2)
  })
}
function readFileToString(path) {
  return fs.readFileSync(`${__dirname}/${path}`).toString()
}
function doItFiles(path1,path2,is_AHK_H = true) {
  it(`FILE: '${path1}' vs '${path2}'`,function() {
    strictEqual(toV2(readFileToString(path1),is_AHK_H),readFileToString(path2))
  })
}
function doItFilesDoFixTests(path1,path2,is_AHK_H = true) {
  it(`FILE: '${path1}' vs '${path2}'`,function() {
    const convertedToV2 = toV2(readFileToString(path1),is_AHK_H)
    try {
      strictEqual(convertedToV2,readFileToString(path2))
    } catch (error) {
      fs.writeFileSync(`${__dirname}/${path2}`,convertedToV2)
      throw error
    }
  })
}
