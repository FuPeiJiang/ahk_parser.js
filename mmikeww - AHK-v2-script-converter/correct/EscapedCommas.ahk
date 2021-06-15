                                 list := "one,two,three"
                                 StrReplace, list, %list%, `,, `,, ErrorLevel
                                 FileAppend, %ErrorLevel%, *