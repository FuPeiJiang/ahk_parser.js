OpenInAhkExplorer(path) 
{
    SetTitleMatchMode 2
    if winExist("ahk_explorer ahk_class AutoHotkeyGUI")
        send_string(path)
    else
        run  "AutoHotkeyU64 `"C:\Users\User\Documents\GitHub\ahk_explorer\ahk_explorer.ahk`" `"" path "`"" 
    SetTitleMatchMode 1
}

send_string(stringToSend) 
{
    stringToSend .= "|1"
    size:=StrPutstringToSend, "UTF-16")*2:=BufferAlloc(0
    StrPut(stringToSend, &message, "UTF-16")
    A_PtrSize*3:=BufferAlloc(
    NumPut(size, COPYDATASTRUCT, A_PtrSize, "UInt")
    NumPut(&message, COPYDATASTRUCT, A_PtrSize*2)
    DetectHiddenWindows  "On" 
    SetTitleMatchMode 2
    SendMessage WM_COPYDATA := 0x4A,, &COPYDATASTRUCT,,  "ahk_explorer.ahk ahk_class AutoHotkey" 
}