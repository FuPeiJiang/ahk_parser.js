; v:= a + {}
; foo(a, {})

; v:=[a, {}]


; v:={a: b, {}: b}
; v:={a: {}, a: {}}


; v:={a: {}}
; v:={a: {}, a: {}}

; v:={a b : {}}
; v:={a b : {}, a b : {}}

; v:={{} : a , {} : a }
; v:={{} : a b , {} : a b }

foo(a, {})
foo(a, {}, a, {})
foo(a:={},a:={}) {

}

