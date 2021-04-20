#NoEnv ; Recommended for performance and compatibility with future AutoHotkey releases.
#SingleInstance, force
SendMode Input ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir% ; Ensures a consistent starting directory.
SetBatchLines, -1
#KeyHistory 0
ListLines Off



; Undo,::msgbox


return

send_string(stringToSend) 
{
    stringToSend .= "|1"
    VarSetCapacity(message, size := StrPut(stringToSend, "UTF-16")*2, 0)
    StrPut(stringToSend, &message, "UTF-16")
    VarSetCapacity(COPYDATASTRUCT, A_PtrSize*3)
    NumPut(size, COPYDATASTRUCT, A_PtrSize, "UInt")
    NumPut(&message, COPYDATASTRUCT, A_PtrSize*2)
    DetectHiddenWindows, On
    SetTitleMatchMode, 2
    SendMessage, WM_COPYDATA := 0x4A,, &COPYDATASTRUCT,, var_whitespace_test.ah2 ahk_class AutoHotkey
}

f3::Exitapp
