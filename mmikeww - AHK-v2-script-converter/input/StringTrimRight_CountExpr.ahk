                                 String = This is a test.
                                 count := 3
                                 StringTrimRight, OutputVar, String, count+3
                                 FileAppend, [%OutputVar%], *