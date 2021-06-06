#NoEnv ; Recommended for performance and compatibility with future AutoHotkey releases.
#SingleInstance, force
ListLines Off
SendMode Input ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir% ; Ensures a consistent starting directory.
SetBatchLines, -1
#KeyHistory 0


#include C:\Users\Public\AHK\notes\WinClip.ahk\WinClip.ahk
#include C:\Users\Public\AHK\notes\WinClip.ahk\WinClipAPI.ahk

; $f1::
; WinClip.Snap( data )
WinClip.Clear()
WinClip.SetBitmap("vector.png")
; WinClip.SetBitmap("vector.png")
; sleep 10
; send "^v"
; sleep 200
; WinClip.Restore( data )
return

f3::Exitapp