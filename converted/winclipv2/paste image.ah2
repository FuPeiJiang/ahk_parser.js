ListLines 0
#SingleInstance force
SendMode "Input" ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir A_ScriptDir ; Ensures a consistent starting directory.
#KeyHistory 0


#Include WinClipAPI.ah2
#Include WinClip.ah2

; $f1::
; {
; WinClip.Snap( data )
WinClip.Clear()
WinClip.SetBitmap("vector.png")
; WinClip.SetBitmap("vector.png")
; sleep 10
; send "^v"
; sleep 200
; WinClip.Restore( data )
; }


f3::
  {
    DetectHiddenWindows 1
    ProcessClose WinGetPID(A_ScriptFullPath " - AutoHotkey v2.0-alpha ahk_exe AutoHotkey.exe")
  }