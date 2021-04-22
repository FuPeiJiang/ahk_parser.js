; delimArrArr.push({startDelims:startDelims, endDelims:endDelims, ignoreTimes:ignoreTimes})
; a.b.c()
; a.b.c()
; a.b;fef
; a.b.c ;fef
; var:=a.b.c();ger
; var:=a.b.c() ;ger
var1:=a.b.c#ger
; var2:=a.b.c ;ger
; var3:=a.b.c+1
; lookingForArr:=[{level: delimArrArr.Length + 1, endDelim:getUntil}] ;{level, endDelim} ;to save the higher level delim if start a new Delim
; lookingForArr.InsertAt(1, {level:indexArr, endDelim: delimArr.endDelims[index]})