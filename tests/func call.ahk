; var:=foo("abc" + 321 foo("abc" + 321))
; foo("abc" + 321)
; foo("abc" + 321)
; foo(arg1
; , Byref arg2
; :=3) {  p(4535, arg2)
; }
; foo(Byref Byref)
; {  
  ; p(4535, Byref)
; }
; d('illegal function DEFINITION: need something after (',char())
; foo(
foo()
foo(,)
foo(
  ,a
  , a)
; foo(
; ,,a)
; foo(
; ,,
; )

; var:=foo(
; ,,
; )

; foo(   )
; foo( ,  )
; var:={}
; var:={  }
; var:=[a
; ,b]
  ; ,fef)
; foo() {
; }