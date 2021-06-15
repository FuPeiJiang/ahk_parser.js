                                 OldStr := "The quick brown fox"
                                 StrReplace, NewStr, %OldStr%, %A_Space%, +
                                 FileAppend, %NewStr%, *