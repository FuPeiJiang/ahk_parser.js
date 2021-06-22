#NoEnv ; Recommended for performance and compatibility with future AutoHotkey releases.
#SingleInstance, force
SendMode Input ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir% ; Ensures a consistent starting directory.
SetBatchLines, -1
#KeyHistory 0
ListLines Off

setMouseDelay, -1
SetKeyDelay, 10
SetDefaultMouseSpeed, 0
SetWinDelay, -1
SetControlDelay, -1

arr:=StrSplit(clipboard, "`n", "`r")
finalStr:=""
for k,v in arr {
    if (Trim(v)) {
        packageName:=string_getBetween(v, """", """", false)
        if (packageName) {
            finalStr.=" """ packageName "@latest"""
        }
    }
}
toRun:= "yarn add -D" finalStr "`r"

if winactive("ahk_exe code.exe") {
    vscodeRun(toRun)
} else {
    clipboard:=toRun
}

return
vscodeRun(g4Commands)
{
    MouseGetPos, Xpos, Ypos
    Click, 1161, 1038

    Send, % g4Commands
    MouseMove, Xpos, Ypos
}

f3::Exitapp