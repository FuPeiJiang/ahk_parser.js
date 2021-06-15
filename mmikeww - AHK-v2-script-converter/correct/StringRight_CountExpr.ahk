                                 String := "This is a test."
                                 count := 6
                                 OutputVar := SubStr(String, -1*(count-1))
                                 FileAppend, %OutputVar%, *