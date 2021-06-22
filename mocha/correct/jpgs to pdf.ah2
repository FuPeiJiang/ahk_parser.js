#SingleInstance force
SendMode "Input"  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir A_ScriptDir  ; Ensures a consistent starting directory.
#KeyHistory 0
ListLines 0
; #include <biga>

darkenWithIrfanView:=true
tempAR:=[]
if (darkenWithIrfanView) {
    ar := StrSplit(A_Clipboard, "`n", "`r")
    ar:=sortAr(ar)

    for k, v in ar {
        input:=v
        SplitPath input,OutFileName, OutDir
        convertTo:=OutDir "\IrfanViewConverted\" OutFileName

        fileExist:=FileExist(convertTo)
        if (!fileExist) {
            ok:="`"C:\Program Files\IrfanView\i_view64.exe`" " input " /contrast=-30 /gamma=0.30 /convert=" convertTo
            RunWait ok
        }
        tempAR.Push(convertTo)
    }
    
}

if (tempAR.Length) {
    ar:=tempAR
} else {
    ar := StrSplit(A_Clipboard, "`n", "`r")
}

; ar:=A.sortBy(ar)

; /contrast=-30 /gamma=0.35 /convert=
; /convert
; /contrast=-30
; /gamma=0.35 
; contrast -30
; gamma 0.35

SplitPath ar[1],, OutDir,,firstOutNameNoExt
finalStr:="python `"lib\jpgs to pdf.py`" `"" firstOutNameNoExt "`" `"" OutDir "`" `"" OutDir "`""

for k, v in ar {
    if (!FileExist(v)) {
        p("file no exist")
        Exitapp
    }
    
    SplitPath v,,,OutExtension,OutNameNoExt
    if (OutExtension!="jpg") {
        p("illegal extension:", OutExtension)
        Exitapp
    }
    
    finalStr.= " `"" OutNameNoExt "`""
}
finalStr:=StrReplace(finalStr,"\","/")

; clipboard:=finalStr
runWait finalStr
soundplay "*-1"
OpenInAhkExplorer(OutDir "\" firstOutNameNoExt ".pdf")

Exitapp

f3::Exitapp