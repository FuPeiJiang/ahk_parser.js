ListLines 0
#SingleInstance force
SendMode "Input"  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir A_ScriptDir  ; Ensures a consistent starting directory.
#KeyHistory 0
#Warn VarUnset, Off

; d b:=array_p(A.chunk(["a", "b", "c", "d"], 2)), "`n==================`n", b=='[["a", "b"], ["c", "d"]]'

; d b:=array_p(A.drop([1, 2, 3])), "`n==================`n", b=='[2, 3]'
; d b:=array_p(A.drop([1, 2, 3], 5)), "`n==================`n", b=='[]'
; d b:=array_p(A.drop([1, 2, 3], 3)), "`n==================`n", b=='[]'

; d b:=array_p(A.dropRight([1, 2, 3])), "`n==================`n", b=='[1, 2]'
; d b:=array_p(A.dropRight([1, 2, 3], 5)), "`n==================`n", b=='[]'
; d b:=array_p(A.dropRight([1, 2, 3], 3)), "`n==================`n", b=='[]'

; d b:=array_p(A.defaults(Map("a",1), Map("b",2), Map("a",3))), "`n==================`n", b=='{"a":1, "b":2}'

users := [ Map("user", "barney",     "active", false)
        , Map( "user", "fred",     "active", false )
        , Map( "user", "pebbles",     "active", true ) ]
d b:=array_p(A.dropWhile(users, "fn_dropWhile")), "`n==================`n", b=='[{"active":1, "user":"pebbles"}]'
; => [{ "user": "pebbles", "active": true }]

fn_dropWhile(o)
{
    return !o["active"]
}

; d A.invert(Map("a",1, "b",2, "c",1))
; A.cloneDeep(Map("a",1, "b",2, "c",1))
; d(&Map("a",1, "b",2, "c",1))
; var := ObjDump(Map("a",1, "b",2, "c",1))
; d var

; firstMap := Map("a",1, "b",2, "c",Map("a",1, "b",2, "c",Map("a",1, "b",2, "c",1)))
; dClone := deepClone(firstMap)
; firstMap["c"]["c"]["b"]:=3
; d(firstMap)
; d(dClone)
; 
; deepClone(obj) {
  ; return ObjLoad(ObjDump(obj))
; }

; f:=FileOpen(A_ScriptDir "\MyDump.bin","w -rwd")
; f.RawWrite(ObjDump(Map("a",1, "b",2, "c",1))),f.Close()


return

#Include Biga.ah2










f3::Exitapp