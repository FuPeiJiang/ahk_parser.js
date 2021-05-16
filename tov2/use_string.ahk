$f1::
    if winactive("ahk_exe code.exe") {
        realBak:=clipboard
        send, {Lctrl}{Lctrl}
        send, ^{right}^{left}
        send, +{end}
        send, ^c
        sleep, 100

        clipBak:=clipboard
        firstParen:=InStr(clipBak, "(")
        firstBracket:=InStr(clipBak, "[")
        if (firstParen and firstBracket) {
            if (firstParen<firstBracket) {
                theFunction:=string_getUntilWithInBetweensULTRA(clipboard, ")", ["'", """", "``"], [["(", ")", 1]])
            } else if (firstBracket<firstParen) {
                theFunction:=string_getUntilWithInBetweensULTRA(clipboard, "]", ["'", """", "``"], [["[", "]", 1]])
            }
        } else if (!firstParen) {
            theFunction:=string_getUntilWithInBetweensULTRA(clipboard, "]", ["'", """", "``"], [["[", "]", 1]])
        } else if (!firstBracket) {
            theFunction:=string_getUntilWithInBetweensULTRA(clipboard, ")", ["'", """", "``"], [["(", ")", 1]])
        } else {
            p("no first parent or bracket")
        }
        send, {left}{shift down}
        send, % "{right " StrLen(theFunction) "}"
        send, {shift up}
        clipboard:=realBak
    } else {
        send, {f1}
    }
return