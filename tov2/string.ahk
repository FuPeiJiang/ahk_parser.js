string_Replicate( Str, Count ) { ; By SKAN / CD: 01-July-2017 | goo.gl/U84K7J
    Return StrReplace( Format( "{:0" Count "}", "" ), 0, Str )
}

string_Multiply( Str, Count ) { ; By SKAN / CD: 01-July-2017 | goo.gl/U84K7J
    Return StrReplace( Format( "{:0" Count "}", "" ), 0, Str )
}

string_getBetween(Byref string, Byref left, Byref right, Byref greedy:=true) {
    leftPos:=InStr(string, left) + 1
    rightPos:=greedy ? InStr(string, right,, 0) : InStr(string, right,, leftPos)
    return SubStr(string, leftPos, rightPos - leftPos)
}

string_getUntil(Byref string, Byref Needle) {
    pos:=InStr(string, Needle)
    return SubStr(String, 1 , pos - 1)
}

string_startWith(string, subString) {
    length:=StrLen(subString)
    if (SubStr(string, 1, length) = subString)
        return length + 1
    else
        return false
}

string_endsWith(string, subString) {
    startPos:=StrLen(string) - StrLen(subString) + 1
    if (SubStr(string, startPos) = subString)
        return startPos
    else
        return false
}

string_getUntilWithInBetweensULTRA(Byref string, Byref getUntil, inBetweens*) {
    delimArrArr:=[]

    for index, delimArr in inBetweens {

        startDelims := []
        endDelims := []
        ignoreTimes := []
        for index, delim in delimArr {
            if isObject(delim) {
                startDelims.Push(delim[1])
                endDelims.Push(delim[2])
                ignoreTimes.Push(delim[3])

            } else {
                startDelims.Push(delim)
                endDelims.Push(delim)
            }
        }
        delimArrArr.push({startDelims:startDelims, endDelims:endDelims, ignoreTimes:ignoreTimes})
    }

    ;but only one can be resolved at a time: resolve lookingFor or start a new Delim at a lower level
    ; lookingForArr:=[] ;{level, endDelim} ;to save the higher level delim if start a new Delim
    lookingForArr:=[{level: delimArrArr.Length() + 1, endDelim:getUntil}] ;{level, endDelim} ;to save the higher level delim if start a new Delim
    loop % StrLen(string) {
        char:=SubStr(string, a_index, 1)

        ;resolve, lookingForArr[1].level increases
        if (char == lookingForArr[1].endDelim) {
            lookingForArr.RemoveAt(1)

            if (!lookingForArr.Length())
                return SubStr(string, 1, A_Index)

            continue
            ;maybe new endDelim...
        } else {
            for indexArr, delimArr in delimArrArr {
                if (indexArr<lookingForArr[1].level) {
                    for index, startDelim in delimArr.startDelims {
                        if (char == startDelim) {
                            if (delimArr.ignoreTimes[index]) {
                                delimArr.ignoreTimes[index]-=1
                            } else {
                                lookingForArr.InsertAt(1, {level:indexArr, endDelim: delimArr.endDelims[index]})
                            }
                            continue 3
                        }
                    }

                }
            }
        }

    }

}

string_times(Str, Count) {
    Return StrReplace( Format( "{:0" Count "}", "" ), 0, Str )
}

test(Str, Count) {
    v:=idk%which%[a[indexcccc]] ;yes
    v:=idk%which%[[indexcccc]] ;yes
    v:=idk%which%.ok[[indexcccc]] ;yes
    v:=idk%which%.ok()[[indexcccc]] ;yes
    if idk%which%.ok(ok())[[indexcccc]] ;yes
    Return idk%which%[indexcccc]
}
