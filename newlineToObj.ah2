arr:=StrSplit(A_Clipboard, "`n", "`r")
finalStr:="{"
for v in arr {
  finalStr.="'" StrLower(v) "':'" v "',"
}
finalStr:=SubStr(finalStr,1,-1)
finalStr.="}"
A_Clipboard:=finalStr