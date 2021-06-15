                                 OldStr := "The quick brown fox"
                                 StrReplace, NewStr, %OldStr%, %A_Space%, +, ErrorLevel
                                 FileAppend, number of replacements: %ErrorLevel%, *