#NoEnv ; Recommended for performance and compatibility with future AutoHotkey releases.
#SingleInstance, force
SendMode Input ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir% ; Ensures a consistent starting directory.
SetBatchLines, -1
#KeyHistory 0
ListLines Off

if :=4
  msgbox % "if: " if
else
  msgbox % "else: " if ;it goes here prints "else: ", so if==""
;yes, `if :=4` is an actual if statement

return

f3::Exitapp
