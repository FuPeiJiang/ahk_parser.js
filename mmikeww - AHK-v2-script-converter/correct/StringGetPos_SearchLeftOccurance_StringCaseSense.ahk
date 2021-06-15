                                 StringCaseSense, on
                                 Haystack := "abcdefabcdef"
                                 Needle := "DEF"
                                 pos := InStr(Haystack, Needle, (A_StringCaseSense="On") ? true : false, (0)+1, 2) - 1
                                 FileAppend, The string was found at position %pos%, *