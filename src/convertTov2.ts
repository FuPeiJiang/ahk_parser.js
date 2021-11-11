import fs from 'fs'
import ahkParser from './parser/index'
import modifyEverythingToV2 from './modifyEverythingToV2'

const d = console.log.bind(console)

const content: Buffer =
// fs.readFileSync('v2tests/A_IsUnicode.ahk')
// fs.readFileSync('tov2/RunCMD_mid.ahk')
// fs.readFileSync('tov2/jpgs to pdf.ahk')
// fs.readFileSync('tov2/Biga_mid.ahk')
// fs.readFileSync('tov2/sXML_Pretty.ahk')
// fs.readFileSync('tov2/jpgs to pdf.ahk')
fs.readFileSync('tests4/temp.ahk')

const str = content.toString().replace(/\r/g,'')

const startTime = process.hrtime()
const everything = ahkParser(str)
const diff = process.hrtime(startTime)
d(HrTime_diffToMs(diff))
// writeSync(arrOrObjToString(everything),'everything_before.txt')
// const converted = modifyEverythingToV2(everything,false)
const converted = modifyEverythingToV2(everything)

writeSync(converted,'reconstructed.ah2')
writeSync(arrOrObjToString(everything),'everything.txt')

function HrTime_diffToMs(diff) {
    d(diff)
    // return diff[0] * 1000000 + diff[1] / 1000000
    return `${diff[0] * 1000 + diff[1] / 1000000}ms`
}


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
