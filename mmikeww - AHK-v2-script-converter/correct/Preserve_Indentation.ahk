                                 if (1) {
                                    var := "val"
                                    if (var = "hello")
                                 		MsgBox, this line starts with 2 tab characters
                                    else {
                                       if (var = "val")
                                          pos := InStr(var, "al") - 1
                                    }
                                 }
                                 FileAppend, pos=%pos%, *