LineNum := 1,  sOutput := ""
While (RunCMD_PID + DllCall("Sleep", "Int",0))
    and DllCall("PeekNamedPipe", "Ptr",hPipeR, "Ptr",0, "Int",0, "Ptr",0, "Ptr",0, "Ptr",0)
      Msgbox 1
        ; While RunCMD_PID and (Line := File.ReadLine())
          ; sOutput .= Fn ? Fn.Call(Line, LineNum++) : Line