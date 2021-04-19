
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

export const typeOfValidVarName: stringIndexNum = {'#ClipboardTimeout':1,'#CommentFlag':1,'#ErrorStdOut':1,'#EscapeChar':1,'#HotkeyInterval':1,'#HotkeyModifierTimeout':1,'#Hotstring':1,'#If':1,'#IfWinActive':1,'#IfWinExist':1,'#IfWinNotActive':1,'#IfWinNotExist':1,'#IfTimeout':1,'#Include':1,'#IncludeAgain':1,'#InputLevel':1,'#InstallKeybdHook':1,'#InstallMouseHook':1,'#KeyHistory':1,'#MaxHotkeysPerInterval':1,'#MaxMem':1,'#MaxThreads':1,'#MaxThreadsBuffer':1,'#MaxThreadsPerHotkey':1,'#MenuMaskKey':1,'#NoEnv':1,'#NoTrayIcon':1,'#Persistent':1,'#Requires':1,'#SingleInstance':1,'#UseHook':1,'#Warn':1,'#WinActivateForce':1,'#LTrim':1}

export const assignmentOperators: stringIndexBool = {':=':true,'+=':true,'-=':true,'*=':true,'/=':true,'//=':true,'.=':true,'|=':true,'&=':true,'^=':true,'>>=':true,'<<=':true}
