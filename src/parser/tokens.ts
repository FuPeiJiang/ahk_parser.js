
type stringIndexBool = {
  [key: string]: boolean,
}

export const whiteSpace = /\u000B\u000C\u0020\u00A0/
export const whiteSpaceObj: stringIndexBool = {' ':true,'\t':true}
// "([a-zA-Z0-9_#@$]+)\(.*?\)"
export const variableCharsObj: stringIndexBool = {'a':true,'b':true,'c':true,'d':true,'e':true,'f':true,'g':true,'h':true,'i':true,'j':true,'k':true,'l':true,'m':true,'n':true,'o':true,'p':true,'q':true,'r':true,'s':true,'t':true,'u':true,'v':true,'w':true,'x':true,'y':true,'z':true,'A':true,'B':true,'C':true,'D':true,'E':true,'F':true,'G':true,'H':true,'I':true,'J':true,'K':true,'L':true,'M':true,'N':true,'O':true,'P':true,'Q':true,'R':true,'S':true,'T':true,'U':true,'V':true,'W':true,'X':true,'Y':true,'Z':true,'0':true,'1':true,'2':true,'3':true,'4':true,'5':true,'6':true,'7':true,'8':true,'9':true,'_':true,'#':true,'@':true,'$':true}

// export const whiteSpaceObj: stringIndexBool = {' ':true,'	':true}
// export const whiteSpaceObj = {'\u000B':true,'\u000C':true,'\u0020':true,'\u00A0':true}
export const CommentSemiColon = /^[\u000B\u000C\u0020\u00A0]*;/
export const startingMultiLineComment = /^[\u000B\u000C\u0020\u00A0]*\/\*/
export const endingMultiLineComment = /^[\u000B\u000C\u0020\u00A0]*\*\//
