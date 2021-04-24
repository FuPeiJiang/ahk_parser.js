string_getUntilWithInBetweensULTRA(Byref string, Byref getUntil, inBetweens*) {
    delimArrArr:=[]

    for                                index, delimArr in inBetweens {

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
    lookingForArr:=[{level: delimArrArr.Length + 1, endDelim:getUntil}] ;{level, endDelim} ;to save the higher level delim if start a new Delim
    loop StrLen(string) {
        char:=SubStr(string, a_index, 1)
fekfoekf()
var:=fekfoekf.a
        ;resolve, lookingForArr[1].level increases
        if (char == lookingForArr[1].endDelim) {
            lookingForArr.RemoveAt(1)

            if (!lookingForArr.Length)
                return SubStr(string, 1, A_Index)

            continue
            ;maybe new endDelim...
        } else {
            for indexArr, delimArr in delimArrArr {
                if (indexArr<lookingForArr[1].level) {
                    for index, startDelim in delimArr.startDelims {
                        if (char == startDelim) {
                            if (delimArr.ignoreTimes[index]) {
                                delimArr.ignoreTimes[index]  -=1
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
