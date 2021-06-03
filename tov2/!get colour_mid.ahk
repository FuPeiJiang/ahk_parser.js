#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
#Warn  ; Enable warnings to assist with detecting common errors.
#SingleInstance, force
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.

CoordMode, Pixel, Screen
CoordMode, Mouse, Screen
f1::
MouseGetPos, xpos, ypos

MouseMove, 0, 1, 100, R
MouseMove, 0, 0 , 0
MouseMove, 0, -1, 100, R

; PixelGetColor, OutputVar, %xpos%, %ypos%,RGB

; PixelGetColor, OutputVar, %xpos%, %ypos%,Slow
PixelGetColor, OutputVar, %xpos%, %ypos%,Alt RGB
PixelGetColor, OutputVar, %xpos%, %ypos%,RGB Alt

MouseMove, 0, 1, 100, R
MouseMove %  xpos, ypos, 0
MouseMove, 0, -1, 100, R

;MsgBox, %OutputVar%, %xpos%, %ypos%

clipboard = %OutputVar%, %xpos%, %ypos%
ToolTip % clipboard
Return

f2::
;595, 518
;595, 520
PixelGetColor, OutputVar, 595, 520, slow

sleep, 1000

PixelSearch, OutputVarX, OutputVarY, 595, 520, 595, 520, %OutputVar% , 100, slow


;MsgBox, %OutputVar%, %xpos%, %ypos%

;clipboard = %OutputVar%
; msgbox,  %ErrorLevel%
Return



/*
0x818104
0xF9F906
0xF9F907
*/

/*
0x1B671B
0x3D843D
0x579957
*/

f3::
ExitApp