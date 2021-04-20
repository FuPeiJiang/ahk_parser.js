#NoEnv ; Recommended for performance and compatibility with future AutoHotkey releases.
#SingleInstance, force
SendMode Input ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir% ; Ensures a consistent starting directory.
SetBatchLines, -1
#KeyHistory 0
ListLines Off


; #Persistentt,1
; #Persistent,1

msgboxx,::msgbox, 4
msgbox,::msgbox, 4
return
,::msgbox, 4
#,::msgbox, 4

; this is a forced expression
; msgbox %::msgbox, 4
; invalid hotkey
; msgbox%::msgbox, 4
%::msgbox, 4

`;::msgbox, 4
;::msgbox, 4
:::msgbox, 4


return

f3::Exitapp