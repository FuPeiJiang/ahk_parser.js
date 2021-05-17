sortAr(ar) {
    str=
    for k,v in ar {
        str.=v "|"
    }
    lastValue:=ar[ar.Length()]
    if lastValue is number
    {
        sortType := "N"
    }

    StringTrimRight, str, str, 1
    Sort, str, % "D| " sortType

    return StrSplit(str,"|")
}