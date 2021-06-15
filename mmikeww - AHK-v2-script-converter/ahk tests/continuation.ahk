#NoEnv ; Recommended for performance and compatibility with future AutoHotkey releases.
#SingleInstance, force
; ListLines Off
SendMode Input ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir% ; Ensures a consistent starting directory.
SetBatchLines, -1
#KeyHistory 0

var:="content"
/* expected := "
(
" var
)
d(expected)

; expected := ""var"oof"
expected := ""var "oof"var
d(expected)

expected := "
(
"var
)
d(expected)
 */
;now other continuation mode

/* expected := "
(Join`r`n %
" var
)
d(expected)

expected := "
(Join`r`n %
"var
)
d(expected)

expected := "
(Join`r`n %
hello"var
)
d(expected)

; this is illegal
      expected := "
         (Join`r`n %
                                 var := "hello"
                                 msg := var . " world"
                                 FileAppend, %msg%, *
         )"
d(expected)
*/

/* expected := "      ;comment
(Join`r`n %
hello
)"
d(expected)

expected := "a      ;comment
(Join`r`n %
hello
)"
d(expected) ;ahello
 */
expected := "a      ;comment
(Join`r`n %
   )b"
d(expected) ;it seems that they are rTrimmed
