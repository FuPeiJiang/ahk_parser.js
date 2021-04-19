#Include FileOrDirName
#IncludeAgain FileOrDirName
{ ... } (block)
Break , LoopLabel
Continue , LoopLabel
Critical , OnOffNumeric
Else
  Else If
Exit , ExitCode
ExitApp , ExitCode
For Key , Value in Expression
Gosub, Label
Goto, Label
If
  AT THIS POINT, THESE ARE COMMANDS

  IfEqual, Var , Value          ; if Var = Value
  IfNotEqual, Var , Value       ; if Var != Value
  IfLess, Var , Value           ; if Var < Value
  IfLessOrEqual, Var , Value    ; if Var <= Value
  IfGreater, Var , Value        ; if Var > Value
  IfGreaterOrEqual, Var , Value ; if Var >= Value

  If (expression)

              If var [not] between Low and High
              If var is [not] type
              If var [not] in/contains MatchList

  IfExist, FilePattern
  IfNotExist, FilePattern

  IfInString, Var, SearchString
  IfNotInString, Var, SearchString

  IfMsgBox

  IfWinActive , WinTitle, WinText, ExcludeTitle, ExcludeText
  IfWinNotActive , WinTitle, WinText, ExcludeTitle, ExcludeText

  IfWinExist , WinTitle, WinText, ExcludeTitle, ExcludeText
  IfWinNotExist , WinTitle, WinText, ExcludeTitle, ExcludeText
Loop
                  Loop
                  Loop (files & folders)
                  Loop (parse a string)
                  Loop (read file contents)
                  Loop (registry)
FUNCTION
  OnError()
  OnExit()
THIS IS A COMMAND
  OnExit , Label

Pause , OnOffToggle, OperateOnUnderlyingThread
Reload
Return , Expression
SetBatchLines, 20ms
SetTimer , Label, PeriodOnOffDelete, Priority
Sleep, DelayInMilliseconds
Suspend , Mode
Switch SwitchValue
Thread, SubCommand , Value1, Value2
Throw , Expression
Try Statement
    } catch e {
      } finally {
Loop {
    ...
} Until Expression
While(Expression)