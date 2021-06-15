                                 OldStr := "The_quick_brown_fox"
                                 StrReplace, NewStr, %OldStr%, _,,, 1
                                 FileAppend, %NewStr%, *