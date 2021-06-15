                                 var := "chris mallet"
                                 StrLower, newvar, %var%, T
                                 if (newvar == "Chris Mallet")
                                    FileAppend, it worked, *