; var:="123" += bar += 321
; var:="123" + bar AND 321
;THIS is LEGAL ?!?!
; foo:=4 ;fewf

;+342
; +5
  ; +3
; var:="abc"    foo
; var:=("abc"    foo   )
; var:=("abc"    foo   ("abc"    foo   ))
; var:=
; (
; "abc" foo
; )
; Var3 := "
; (
; Same as above, except that variable references such as %Var% are not resolved.
; Instead, specify variables as follows:" Var "
; )   " Var
; Var3 := "
; (
; Same as above, except that variable references such as %Var% are not resolved.
; )   " Var
; var2:=
; (
; "LOL
; )" Var
var2:= 
(
"abc"  Var
) Var