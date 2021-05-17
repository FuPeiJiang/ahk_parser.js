sortAr(ar) {
    str:=""
    for k,v in ar {
        str.=v "|"
    }
    lastValue:=ar[ar.Length]
    if IsNumber(lastValue)
    {
        sortType := "N"
    }

    str:=SubStr(str,1,-1)
    Sort str, "D| " sortType

    return StrSplit(str,"|")
}