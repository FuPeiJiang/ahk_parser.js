                                 var = value
                                 IfEqual var, value, FileGetSize, size, %A_ScriptDir%\Tests.ahk
                                 FileAppend, %size%, *