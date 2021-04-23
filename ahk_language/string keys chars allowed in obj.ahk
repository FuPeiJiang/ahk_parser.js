#NoEnv ; Recommended for performance and compatibility with future AutoHotkey releases.
#SingleInstance, force
SendMode Input ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir% ; Ensures a consistent starting directory.
SetBatchLines, -1
#KeyHistory 0
ListLines Off


;illegal
; p({#:b})
; p({$:b})
; p({_:b})
; ---------------------------
; string keys chars allowed in obj.ahk
; ---------------------------
; Error at line 12.
; 
; Line Text: $:b})
; Error: Quote marks are required around this key.
; 
; The program will exit.
; ---------------------------
; OK   
; ---------------------------

Exitapp
f3::Exitapp