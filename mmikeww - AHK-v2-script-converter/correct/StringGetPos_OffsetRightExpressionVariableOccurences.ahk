                                 Haystack := "abcdefabcdefabcdef"
                                 Needle := "cde"
                                 var := "0"
                                 pos := InStr(Haystack, Needle, (A_StringCaseSense="On") ? true : false, -1*((var+2)+1), 2) - 1
                                 if (pos >= 0)
                                     FileAppend, The string was found at position %pos%., *