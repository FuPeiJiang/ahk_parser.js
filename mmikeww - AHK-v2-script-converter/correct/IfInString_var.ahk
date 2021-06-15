                                 Haystack := "abcdefghijklmnopqrs"
                                 Needle := "abc"
                                 if InStr(Haystack, Needle, (A_StringCaseSense="On") ? true : false)
                                    FileAppend, found, *