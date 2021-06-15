                                 OldStr := "The quick brown fox"
                                 StrReplace, NewStr, %OldStr%, % " ", % "+"
                                 FileAppend, %NewStr%, *