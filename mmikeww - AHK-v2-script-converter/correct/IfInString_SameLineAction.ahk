                                 Haystack := "z.y.x.w"
                                 if InStr(Haystack, "y.x", (A_StringCaseSense="On") ? true : false), SysGet, mouse_btns, 43
                                 FileAppend, %mouse_btns%, *