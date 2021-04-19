#SingleInstance force
SendMode "Input"  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir A_ScriptDir  ; Ensures a consistent starting directory.
#KeyHistory 0
ListLines 0

OnMessage(0x4A, "WM_COPYDATA_READ")

; text:=FileRead("..\ahk_docs2_toTest.ahk")
text:=FileRead("..\tmLanguage.ahk")
arr:=StrSplit(text, "`n", "`r")

ifWhiteSpaceMap:=Map()

currentControlFlow:=(arr.Length > 0) ? arr[1] : "" ;for external use, before f1
for v in arr {
  ifWhiteSpaceMap[v]:="whiteSpace"
}

closeErrorMessages("test37.ahk")

f1::
{
global arr, ifWhiteSpaceMap, currentControlFlow

; fileObj:=FileOpen("test37.ahk", "a`n")
; fileObj:=FileOpen("test37.ahk", "rw`n")

; line:=1
; while (line<15) {
  ; fileObj.ReadLine()
  ; line++
; }
; p TextLine := fileObj.ReadLine()
; p arr[1] "  :=4"

; fileObj.WriteLine(arr[1] '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000')
; fileObj.WriteLine(arr[1] "  :=4")
; fileObj.WriteLine("if (#Ltrim" arr[1] "+ 5==9)")
; fileObj.Close()



for v in arr {
  currentControlFlow:=v
  toClipboard:=v "  :=4`nif (" v " + 5==9)`n"
  ; p toClipboard

  ; send "{ctrl down}xx{ctrl up}"
  send "{shift down}{up 2}{shift up}"
  ; sleep 100

  A_Clipboard:=toClipboard

  send "{ctrl down}v"

  sleep 100

  send "s{ctrl up}"

  sleep 200

  SetTitleMatchMode 2
  try {
    PID:=WinGetPID("test37.ahk ahk_class AutoHotkey")
    ProcessClose PID
  }
  Run '"C:\Program Files\AutoHotkey\AutoHotkeyU64.exe" /CP65001 "test37.ahk"'

  sleep 500

  closeErrorMessages("test37.ahk")

  sleep 500
}
p A_Clipboard:=Array_PrintString(ifWhiteSpaceMap)
d ifWhiteSpaceMap
}



return

closeErrorMessages(title) {
  global ifWhiteSpaceMap, currentControlFlow
  loop {
    ;close the error messages
    try {
      PID:=WinGetPID(title " ahk_class #32770")
      Text := WinGetText("ahk_pid " PID)
      ; p Text
      
      ifWhiteSpaceMap[currentControlFlow]:=["error message",Text]

      ; p A_Clipboard:=Array_PrintString(ifWhiteSpaceMap)
      ; d ifWhiteSpaceMap
      
      ProcessClose PID
    } catch {
      break
    }
  }
}


WM_COPYDATA_READ(wParam, lParam, msg, hwnd) {
  ;only lParam is used
  global ifWhiteSpaceMap, currentControlFlow
  source:=NumGet(lParam + A_PtrSize*2,0,"UPtr")
  data := StrGet(source,, "UTF-16")
  RegExMatch(data, "s)(.*)\|(\d+)", match)

  message:=match[2]
  ; p message
  if (message==1) {
    ifWhiteSpaceMap[currentControlFlow]:="fine variable"
  } else if (message==0) {
    ifWhiteSpaceMap[currentControlFlow]:="sent 0"
  }
  ; p ifWhiteSpaceMap
}













f3::
  {
    DetectHiddenWindows 1
    ProcessClose WinGetPID(A_ScriptFullPath " - AutoHotkey v2.0-alpha ahk_exe AutoHotkey.exe")
  }