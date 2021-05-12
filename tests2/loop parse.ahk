Loop, parse, FileContents, `n, `r  ; Specifying `n prior to `r allows both Windows and Unix files to be parsed.
{
    MsgBox, 4, , Line number %A_Index% is %A_LoopField%.`n`nContinue?
    IfMsgBox, No, break
}