SystemRootVar:=EnvGet("SystemRoot")
Loop Files, SystemRootVar "\Microsoft.NET\Framework" (A_PtrSize=8?"64":"") "\*","DR"
msgbox "1"