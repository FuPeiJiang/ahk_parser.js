                                 String := "This is a test."
                                 count := 3
                                 OutputVar := SubStr(String, 1, -1*(count+3))
                                 FileAppend, [%OutputVar%], *