                                 var := A_Now
                                 var := DateAdd(var, 7, "days")
                                 FormatTime, var, %var%, ShortDate
                                 FileAppend, %var%, *