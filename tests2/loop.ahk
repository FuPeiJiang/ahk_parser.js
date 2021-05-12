loop % LV_GetCount()
{
    LV_Modify(A_Index, "+Select") ; select                            
}
Loop Files, %A_ProgramFiles%\*.txt, R  ; Recurse into subfolders.
{
    MsgBox, 4, , Filename = %A_LoopFileFullPath%`n`nContinue?
    IfMsgBox, No
        break
}