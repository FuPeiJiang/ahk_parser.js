                                 OldStr := "The quick brown fox"
                                 StrReplace, NewStr, %OldStr%, %A_Space%, +,, 1
                                 FileAppend, %NewStr%, *