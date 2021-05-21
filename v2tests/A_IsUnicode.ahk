v:=25+255*(A_IsUnicode ? 2:1)
v:=a+25+255*(A_IsUnicode ? 2:1)
; _Struct.ahk
static PTR:=A_PtrSize
    ,TBYTE:=A_IsUnicode?2:1,TCHAR:=A_IsUnicode?2:1
; Acc.ahk
/* VarSetCapacity(sRole, (A_IsUnicode?2:1)*nSize)
v:=(A_IsUnicode?2:1)*234
; AHK-Studio.ahk
VarSetCapacity(str,cp*(A_IsUnicode?2:1))
if ((A_PtrSize=8&&A_IsCompiled="")||!A_IsUnicode){
}
; ahk_explorer.ahk
VarSetCapacity(downloads, (261 + !A_IsUnicode) << !!A_IsUnicode)
DllCall("shlwapi\PathCreateFromUrl" (A_IsUnicode?"W":"A"), "Str",vPathUrl, "Str",vPath, "UInt*",vChars, "UInt",0)
 */
; ahkdll-v2-release-master\Compiler\Lib\AHKType.ahk
; Get IsUnicode based on the presence of a string matching our encoding
; Type.IsUnicode := (!RegExMatch(exeData, "MsgBox\0") = !A_IsUnicode) ? 1 : ""

 ; Class_LV_InCellEdit.ahk
; SendMessage, % (A_IsUnicode ? 0x1057 : 0x1011), 0, % &EditText, , % "ahk_id " . This.HWND
; Gdip.ahk
	return DllCall("gdiplus\GdipDrawString"
					, Ptr, pGraphics
					, Ptr, A_IsUnicode ? &sString : &wString
					, Ptr, A_IsUnicode ? &sString : &wString)
 */
v:=255*(A_IsUnicode ? 2:1)
v:=A_IsUnicode ? 2:1 + var + "fe" + {} + []
foo( bufName, 255*( A_IsUnicode ? 2 : 1 ), 0 )
foo( bufName, 255*( A_IsUnicode ? 2 : (1) ), 0 )
foo( bufName, A_IsUnicode ? 510 : 255 , 0 )
foo( bufName,  A_IsUnicode        ?       510           :        255   )
if (A_IsUnicode) {
  v:=510
} else {
  v:=255
}