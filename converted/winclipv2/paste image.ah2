ListLines 0
#SingleInstance force
SendMode "Input" ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir A_ScriptDir ; Ensures a consistent starting directory.
#KeyHistory 0


#Include WinClipAPI.ah2
#Include WinClip.ah2

p WinClip.GetHtml()

; sleep 10
WinClip.Snap( data )
WinClip.Clear()
WinClip.SetBitmap("vector.png")
WinClip.SetBitmap("vector.png")
; sleep 10
WinClip.Paste()
; sleep 200
WinClip.Restore( data )
return


return
















f3::Exitapp