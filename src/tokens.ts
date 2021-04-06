
type stringIndexBool = {
  [key: string]: boolean,
}

export const whiteSpace = /\u000B\u000C\u0020\u00A0/
export const whiteSpaceObj: stringIndexBool = {' ':true,'\t':true}
// export const whiteSpaceObj: stringIndexBool = {' ':true,'	':true}
// export const whiteSpaceObj = {'\u000B':true,'\u000C':true,'\u0020':true,'\u00A0':true}
export const CommentSemiColon = /^[\u000B\u000C\u0020\u00A0]*;/
export const startingMultiLineComment = /^[\u000B\u000C\u0020\u00A0]*\/\*/
export const endingMultiLineComment = /^[\u000B\u000C\u0020\u00A0]*\*\//
