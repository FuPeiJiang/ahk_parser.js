                                 Haystack := "abcdefabcdef"
                                 Needle := "cde"
                                 var := "1"
                                 pos := InStr(Haystack, Needle, (A_StringCaseSense="On") ? true : false, (var+2)+1, 1) - 1
                                 if (pos >= 0)
                                     FileAppend, The string was found at position %pos%., *