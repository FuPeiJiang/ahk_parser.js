EnvGet SystemRootVar, SystemRoot
Loop % SystemRootVar "\Microsoft.NET\Framework" (A_PtrSize=8?"64":"") "\*", 2, 1
  msgbox 1