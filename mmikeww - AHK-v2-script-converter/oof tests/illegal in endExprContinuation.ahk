/* expected := "
   (Join`r`n %
                           var := "hello"
                           msg := var . " world"
                           FileAppend, %msg%, *
   )"
 */
expected := "  ;comment
(Join`r`n %
                        var := "hello"
                        msg := var . " world"
                        FileAppend, %msg%, *
)"
; in v2 that could alternatively be:
; msg := "%var% world"

; first test that our expected code actually produces the same results in v2
;result_input    := ExecScript_v1(input_script)
;result_expected := ExecScript_v2(expected)
;MsgBox, 'input_script' results (v1):`n[%result_input%]`n`n'expected' results (v2):`n[%result_expected%]
;Yunit.assert(result_input = result_expected, "input v1 execution != expected v2 execution")

; then test that our converter will correctly covert the input_script to the expected script
converted := Convert(input_script)