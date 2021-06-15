                                 Haystack := "abcdefghijklmnopqrs"
                                 if InStr(Haystack, "jklm", (A_StringCaseSense="On") ? true : false)
                                    FileAppend, found, *