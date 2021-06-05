ListLines 0
#SingleInstance force
SendMode "Input" ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir A_ScriptDir ; Ensures a consistent starting directory.
#KeyHistory 0

; p(123)
; d RunCMD('dir')
d(RunCMD('grep -oP "\K[^ \t]*::" "C:\Users\Public\AHK\linternaute.ahk"'))
; p(123)

return
#include C:\Users\User\Documents\GitHub\ahk_parser.js\converted\RunCMD\RunCMD.ah2
; #include C:\Users\User\Documents\GitHub\ahk_parser.js\converted\RunCMD\RunCMD_mid.ah2

f3::Exitapp