; delimArrArr.push({startDelims:startDelims, endDelims:endDelims, ignoreTimes:ignoreTimes})
; a.b.c()
; a.b.c()
; a.b;fef
; a.b.c ;fef
; var:=a.b.c();ger
; var:=a.b.c() ;ger
;LEGAL
; var2:=a.b.c
; [betweenExpression]var3:=2
var2:=a.b.c(
  ,2)4
var3:=2
; ILLEGAL
; var1:=a.b.c [betweenExpression])ger
; var3:=2
; why does [betweenExpression] end ?
; insideContinuation is false
; findBetween is false
; insideContinuation is false
; so it skipped lines until find something
; if something is a between, check
; if blocked by invalid, I can flag invalid
; if blocked by valid, oof
; then I should check if still on the same line
; I mean, on the same line as last found: exprFoundLine

; var1:=a.b.c)ger
; var3:=2
; var3:=a.b.c+1
; lookingForArr:=[{level: delimArrArr.Length + 1, endDelim:getUntil}] ;{level, endDelim} ;to save the higher level delim if start a new Delim
; lookingForArr.InsertAt(1, {level:indexArr, endDelim: delimArr.endDelims[index]})