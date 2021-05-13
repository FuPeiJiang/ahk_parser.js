Loop, parse, FileContents, `n, `r  ; Specifying `n prior to `r allows both Windows and Unix files to be parsed.
{
    MsgBox, 4, , Line number %A_Index% is %A_LoopField%.`n`nContinue?
    IfMsgBox, No, break
}
Loop, read, C:\Database Export.txt
{
    Loop, parse, A_LoopReadLine, %A_Tab%   
    {
        MsgBox, Field number %A_Index% is %A_LoopField%.
    }
}
Loop, read, %SourceFile%, %DestFile%
{
    URLSearchString := A_LoopReadLine
    Gosub, URLSearch
}