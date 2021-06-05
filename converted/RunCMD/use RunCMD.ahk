#NoEnv ; Recommended for performance and compatibility with future AutoHotkey releases.
#SingleInstance, force
ListLines Off
SendMode Input ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir% ; Ensures a consistent starting directory.
SetBatchLines, -1
#KeyHistory 0

; d(RunCMD("dir"))
d(RunCMD("grep -oP ""\K[^ \t]*::"" ""C:\Users\Public\AHK\linternaute.ahk"""))

return
#Include C:\Users\User\Documents\GitHub\ahk_parser.js\tov2\RunCMD_mid.ahk
f3::Exitapp