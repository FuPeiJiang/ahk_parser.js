ListLines 0
#SingleInstance force
SendMode "Input"  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir A_ScriptDir  ; Ensures a consistent starting directory.
#KeyHistory 0
#Warn VarUnset, Off

assert(array_isNotEqual(A.chunk(["a", "b", "c", "d"], 2), [["a", "b"], ["c", "d"]]), false)
assert(array_isNotEqual(A.drop([1, 2, 3]), [2, 3]), false)
assert(array_isNotEqual(A.drop([1, 2, 3], 5), []), false)
assert(array_isNotEqual(A.drop([1, 2, 3], 3), []), false)
assert(array_isNotEqual(A.dropRight([1, 2, 3]), [1, 2]), false)
assert(array_isNotEqual(A.dropRight([1, 2, 3], 5), []), false)
assert(array_isNotEqual(A.dropRight([1, 2, 3], 3), []), false)
assert(array_isNotEqual(A.defaults(Map("a",1), Map("b",2), Map("a",3)), Map("a",1, "b",2)), false)
users := [ Map("user", "barney",     "active", false)
        , Map( "user", "fred",     "active", false )
        , Map( "user", "pebbles",     "active", true ) ]
assert(array_isNotEqual(A.dropWhile(users, "fn_dropWhile"), [Map("active",1, "user","pebbles")]), false)
; => [{ "user": "pebbles", "active": true }]
users := [ Map("user", "barney",     "active", true)
        , Map( "user", "fred",     "active", false )
        , Map( "user", "pebbles",     "active", false ) ]
assert(array_isNotEqual(A.dropRightWhile(users, "fn_dropRightWhile"), [Map("active",1, "user","barney")]), false)
; => [{"user": "barney", "active": true }]

assert(array_isNotEqual(A.initial([1, 2, 3]), [1, 2]), false)
assert(array_isNotEqual(A.initial("fred"), ["f", "r", "e"]), false)

assert(array_isNotEqual(A.uniq([2, 1, 2]), [2, 1]), false)

fn_dropWhile(o)
{
    return !o["active"]
}
fn_dropRightWhile(o)
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