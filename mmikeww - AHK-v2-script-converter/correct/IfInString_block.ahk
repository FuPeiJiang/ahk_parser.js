                                 Haystack := "abcdefghijklmnopqrs"
                                 if InStr(Haystack, "jklm", (A_StringCaseSense="On") ? true : false)
                                 {
                                    Sleep, 10
                                    FileAppend, found, *
                                 }