Loop, HKEY_CURRENT_USER, Software\Microsoft\Internet Explorer\TypedURLs, 1, 1
    RegRead
Loop, C:\*.*, 1, 1
    FileList .= A_LoopFileName "`n"