size := VarSetStrCapacity(bufName,255*2),DllCall("RtlFillMemory", "UInt",StrPtr(bufName), "Int",255*2, "UChar",0)

v:=25+255*2
v:=a+25+255*2
; _Struct.ahk
static PTR:=A_PtrSize
    ,TBYTE:= 2,TCHAR:=2
; Acc.ahk
VarSetStrCapacity(sRole,2*nSize)
v:=2*234
; AHK-Studio.ahk
VarSetStrCapacity(str,cp*2)
if ((A_PtrSize=8&&A_IsCompiled="")||!true){
}
; ahk_explorer.ahk
VarSetStrCapacity(downloads,(261+!true)<<!!true)
DllCall("shlwapi\PathCreateFromUrl" "W", "Str",String(vPathUrl), "Str",String(vPath), "UInt*",vChars, "UInt",0)

; ahkdll-v2-release-master\Compiler\Lib\AHKType.ahk
; Get IsUnicode based on the presence of a string matching our encoding
Type["IsUnicode"] := (!RegExMatch(exeData, "MsgBox\0") = !true) ? 1 : ""

 ; Class_LV_InCellEdit.ahk
SendMessage 0x1057, 0, StrPtr(EditText), , "ahk_id " . This["HWND"]
; Gdip.ahk
	return DllCall("gdiplus\GdipDrawString"
					, "Ptr",pGraphics
					, "Ptr",StrPtr(sString)
					, "Ptr",StrPtr(sString))
v:=255*2
v:=2
foo( bufName, 255*2, 0 )
foo( bufName, 255*2, 0 )
foo( bufName, 510, 0 )
foo( bufName,  510)
if (true) {
  v:=510
} else {
  v:=255
}