                                 String := "This is a test."
                                 OutputVar := SubStr(String, 1, -1*(6))
                                 FileAppend, [%OutputVar%], *