import fs from 'fs'
import ahkParser from './parser/index'
import modifyEverythingToV2 from './modifyEverythingToV2'


const content: Buffer =
// fs.readFileSync('tests4/fix loop num bracket.ahk')
fs.readFileSync('tov2/clr.ahk')
// fs.readFileSync('tests2/function definition fix.ahk')
// fs.readFileSync('tests4/stuff.ahk')
// fs.readFileSync('tests2/if legacy in.ahk')
// fs.readFileSync('tests4/if var in.ahk')
// fs.readFileSync('tests4/SplashyTest.ahk')
// fs.readFileSync('tests3/continuation ) closing parenthesis.ahk')
// fs.readFileSync('tests3/numeric string plus zero #20.ahk')
// fs.readFileSync('v2tests/hotkey return to brackets.ahk')
// fs.readFileSync('tests3/SplashyTest gui add.ahk')
// fs.readFileSync('v2tests/IniRead.ahk')
// fs.readFileSync('tests3/new class.ahk')
// fs.readFileSync('tests3/Incorrect quoting of parameters #6.ahk')
// fs.readFileSync('tests3/elseTryFinally.ahk')
// fs.readFileSync('tests3/Renamed variables.ahk')
// fs.readFileSync('tests3/Legacy If var op value.ahk')
// fs.readFileSync('tests3/v1assign with whiteSpace then nothing.ahk')
// fs.readFileSync('tov2/Base64Enc().ahk')
// fs.readFileSync('tests3/IfEqual_SameLineAction_mod.ahk')
// fs.readFileSync('mmikeww - AHK-v2-script-converter/input/ForcedExpression_Traditional_If_GreaterThanInt.ahk')
// fs.readFileSync('mmikeww - AHK-v2-script-converter/input/ForcedExpression_IfEqual_CommandThenComma.ahk')
// fs.readFileSync('tests3/numIfNum.ahk')
// fs.readFileSync('tests3/while and.ahk')
// fs.readFileSync('tov2/RunCMD_mid.ahk')
// fs.readFileSync('tov2/RunCMD.ahk')
// fs.readFileSync('v2tests/PixelGetColor.ahk')
// fs.readFileSync('tov2/!get colour_mid.ahk')
// fs.readFileSync('tov2/!get colour.ahk')
// fs.readFileSync('tests3/redo func definition.ahk')
// fs.readFileSync('tests3/fix multiline comments.ahk')
// fs.readFileSync('tests3/L colon L colon.ahk')
// fs.readFileSync('tests3/msgbox up colon.ahk')
// fs.readFileSync('v2tests/prop in func.ahk')
// fs.readFileSync('tests3/loop bracket.ahk')
// fs.readFileSync('tests3/assignment percent.ahk')
// fs.readFileSync('tests3/if paren no ws.ahk')
// fs.readFileSync('tov2/Biga_mid.ahk')
// fs.readFileSync('tov2/Biga.ahk')
// fs.readFileSync('v2tests/A_IsUnicode from WinClipAPI.ahk')
// fs.readFileSync('v2tests/A_IsUnicode start group space.ahk')
// fs.readFileSync('v2tests/A_IsUnicode.ahk')
// fs.readFileSync('v2tests/fix numput.ahk')
// fs.readFileSync('v2tests/fix if not.ahk')
// fs.readFileSync('tov2/WinClip.ahk')
// fs.readFileSync('tov2/WinClipAPI.ahk')
// fs.readFileSync('v2tests/v1concat space or not.ahk')
/* fs.readFileSync('tests3/listlines.ahk')
// fs.readFileSync('tests3/ampersand to .Ptr.ahk')
// fs.readFileSync('tests3/VarSetCapacity with func inside.ahk')
fs.readFileSync('tests3/recurse VarSetCapacity replacement.ahk')
fs.readFileSync('tov2/OpenInAhkExplorer.ahk') */
// fs.readFileSync('tov2/sortAr.ahk')
// fs.readFileSync('tests3/splitpath.ahk')
// fs.readFileSync('tests3/not assignment operatEor.ahk')
// fs.readFileSync('tests3/idkAnymore23.ahk')
// fs.readFileSync('tov2/jpgs to pdf.ahk')
// fs.readFileSync('tests3/command EOF.ahk')
// fs.readFileSync('tests3/test validName VARIABLE EOL.ahk')
// fs.readFileSync('tov2/use_string.ahk')
// fs.readFileSync('tests3/fix if no paren.ahk')
// fs.readFileSync('tov2/string.ahk')
// fs.readFileSync('tests/ahk_explorer.ahk')

const everything = ahkParser(content.toString().replace(/\r/g,''))
// writeSync(arrOrObjToString(everything),'everything_before.txt')
// const converted = modifyEverythingToV2(everything,false)
const converted = modifyEverythingToV2(everything)

writeSync(converted,'reconstructed.ah2')
writeSync(arrOrObjToString(everything),'everything.txt')

function arrOrObjToString(obj) {
  const objDelim = ', ',objDelimLen = objDelim.length
  return innerFunc(obj)
  function innerFunc(obj) {
    var str = ''
    if (typeof obj === 'object')
    {
      if (Array.isArray(obj)) {
        for (let i = 0,len = obj.length; i < len; i++) {
          if (typeof obj[i] === 'object') {
            str += `\n${innerFunc(obj[i])},`
          } else {
            if (typeof obj[i] === 'string') {
              str += `\n'${obj[i]}',` //lol this implicitly calls func.toString()
            } else {
              str += `\n${obj[i]},` //lol this implicitly calls func.toString()
            }
          }
        }
        return `[\n${str.slice(1)}\n]` //remove the first , from string. removes nothing if empty string
      } else {
        for (var p in obj) {
          if (obj.hasOwnProperty(p)) {
            if (typeof obj[p] === 'object') {
              str += `${objDelim}${p}:${innerFunc(obj[p])}`
            } else {
              if (typeof obj[p] === 'string') {
                str += `${objDelim}${p}:'${obj[p]}'` //lol this implicitly calls func.toString()
              } else {
                str += `${objDelim}${p}:${obj[p]}` //lol this implicitly calls func.toString()
              }
            }
          }
        }
        return `{${str.slice(objDelimLen)}}` //remove the first , from string. removes nothing if empty string
      }
    } else {
      return ''
    }
  }
}

function writeSync(content: string,fileName: string) {
  fs.writeFileSync(fileName,`${content}`,'utf-8')
  // console.log('readFileSync complete')
}
