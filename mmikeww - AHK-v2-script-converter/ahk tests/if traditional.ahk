#NoEnv ; Recommended for performance and compatibility with future AutoHotkey releases.
#SingleInstance, force
; ListLines Off
SendMode Input ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir% ; Ensures a consistent starting directory.
SetBatchLines, -1
#KeyHistory 0

var:=","

/* if var var = ,,
p(123)
else
p(321) ;here

if var var = ",,"
p(123) ;here
else
p(321)
 */

/* foo() {
  return ","
}

if var = foo()
p(123)
else
p(321) ;here

var:="foo()"
if var = foo()
p(123) ;here
else
p(321)
 */

/* if var = a . b + c
p(123)
else
p(321) ;here

var:="a . b + c"
if var = a . b + c
p(123) ;here
else
p(321)
;ayt, understood
 */

/* var:=24
a:=1
b:=2
c:=12
if var = % (a . b) + c
p("okkkkkk") ;here
else
p("nononono")
 */

not:="MyVar"
p(not) ;DOES NOTHING
p(not
and 45
or 45)
; not 45) ;but not doesnt continue it
if not = ,, ;I assume this is 
p("okkkkkk") ;here
else
p("nononono")


if not = MyVar
p("okkkkkk") ;here
else
p("nononono")

if not = MyVarr
p("okkkkkk")
else
p("nononono") ;here ;so this really IS a v1string compare. 
; the variable MyVar or MyVarr are both blank
; if not was blank
