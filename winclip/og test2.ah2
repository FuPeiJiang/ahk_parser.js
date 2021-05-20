#SingleInstance force
SendMode "Input" ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir A_ScriptDir ; Ensures a consistent starting directory.
#KeyHistory 0
ListLines 0

; https://www.autohotkey.com/boards/viewtopic.php?f=6&t=29314
#Include WinClipAPI.ahk
#Include WinClip.ahk

d WinClip.GetHtml()

return

f3::
  {
    DetectHiddenWindows 1
    ProcessClose WinGetPID(A_ScriptFullPath " - AutoHotkey v2.0-alpha ahk_exe AutoHotkey.exe")
  }
