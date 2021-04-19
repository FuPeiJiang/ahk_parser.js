
type stringIndexBool = {
  [key: string]: boolean,
}
type stringIndexNum = { [key: string]: number }

export const whiteSpace = /\u000B\u000C\u0020\u00A0/
export const whiteSpaceObj: stringIndexBool = {' ':true,'\t':true}
// "([a-zA-Z0-9_#@$]+)\(.*?\)"
export const variableCharsObj: stringIndexBool = {'a':true,'b':true,'c':true,'d':true,'e':true,'f':true,'g':true,'h':true,'i':true,'j':true,'k':true,'l':true,'m':true,'n':true,'o':true,'p':true,'q':true,'r':true,'s':true,'t':true,'u':true,'v':true,'w':true,'x':true,'y':true,'z':true,'A':true,'B':true,'C':true,'D':true,'E':true,'F':true,'G':true,'H':true,'I':true,'J':true,'K':true,'L':true,'M':true,'N':true,'O':true,'P':true,'Q':true,'R':true,'S':true,'T':true,'U':true,'V':true,'W':true,'X':true,'Y':true,'Z':true,'0':true,'1':true,'2':true,'3':true,'4':true,'5':true,'6':true,'7':true,'8':true,'9':true,'_':true,'#':true,'@':true,'$':true}

// export const whiteSpaceObj: stringIndexBool = {' ':true,'	':true}
// export const whiteSpaceObj = {'\u000B':true,'\u000C':true,'\u0020':true,'\u00A0':true}
export const CommentSemiColon = /^[\u000B\u000C\u0020\u00A0]*;/
export const startingMultiLineComment = /^[\u000B\u000C\u0020\u00A0]*\/\*/
export const endingMultiLineComment = /^[\u000B\u000C\u0020\u00A0]*\*\//

export const typeOfValidVarName: stringIndexNum = {'global':3,'local':3,'static':3,'if':2,'#clipboardtimeout':1,'#commentflag':1,'#errorstdout':1,'#escapechar':1,'#hotkeyinterval':1,'#hotkeymodifiertimeout':1,'#hotstring':1,'#if':1,'#ifwinactive':1,'#ifwinexist':1,'#ifwinnotactive':1,'#ifwinnotexist':1,'#iftimeout':1,'#include':1,'#includeagain':1,'#inputlevel':1,'#installkeybdhook':1,'#installmousehook':1,'#keyhistory':1,'#maxhotkeysperinterval':1,'#maxmem':1,'#maxthreads':1,'#maxthreadsbuffer':1,'#maxthreadsperhotkey':1,'#menumaskkey':1,'#noenv':1,'#notrayicon':1,'#persistent':1,'#requires':1,'#singleinstance':1,'#usehook':1,'#warn':1,'#winactivateforce':1,'#ltrim':1}

export const assignmentOperators: stringIndexBool = {':=':true,'+=':true,'-=':true,'*=':true,'/=':true,'//=':true,'.=':true,'|=':true,'&=':true,'^=':true,'>>=':true,'<<=':true}
