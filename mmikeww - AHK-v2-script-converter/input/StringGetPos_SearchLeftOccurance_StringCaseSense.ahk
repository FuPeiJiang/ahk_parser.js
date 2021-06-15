                                 StringCaseSense, on
                                 Haystack = abcdefabcdef
                                 Needle = DEF
                                 StringGetPos, pos, Haystack, %Needle%, L2
                                 FileAppend, The string was found at position %pos%, *