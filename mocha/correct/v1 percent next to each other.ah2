Refs:=StrSplit(References,"|",A_Space "a" A_Tab)
Refs:=StrSplit(References,"|",A_Space A_Tab)
Refs:=StrSplit(References,"|",A_Space A_Tab "a")
Refs:=StrSplit(References,"|","a" A_Space "b")

v:=A_Space "a" A_Tab
v:=A_Space A_Tab
v:=A_Space A_Tab "a"
v:="a" A_Space "b"