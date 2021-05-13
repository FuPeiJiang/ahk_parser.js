Loop, Reg, HKEY_CURRENT_USER\Software\Microsoft\Windows, KVR
{
    if (A_LoopRegType = "key")
        value := ""
    else
    {
        RegRead, value
        if ErrorLevel
            value := "*error*"
    }
    MsgBox, 4, , %A_LoopRegName% = %value% (%A_LoopRegType%)`n`nContinue?
    IfMsgBox, NO, break
}