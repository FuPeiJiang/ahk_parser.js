import ahkParser from './parser/index'
import modifyEverythingToV2 from './modifyEverythingToV2'

export default (content: string): string => {
  return modifyEverythingToV2(ahkParser(content.toString().replace(/\r/g, '')))
}