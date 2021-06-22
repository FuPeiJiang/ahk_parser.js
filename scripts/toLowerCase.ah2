#SingleInstance force
SendMode "Input" ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir A_ScriptDir ; Ensures a consistent starting directory.
#KeyHistory 0
ListLines 0

$f1::
  {
    send "^c"
    sleep 100
    A_Clipboard:=StrLower(A_Clipboard)
    send "^v"
  }

f3::Exitapp