#NoEnv ; Recommended for performance and compatibility with future AutoHotkey releases.
#SingleInstance, force
SendMode Input ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir% ; Ensures a consistent starting directory.
SetBatchLines, -1
#KeyHistory 0
ListLines Off

first:=""
lol:=""""

ok:="
(
 hello
)"

ok:="(
(
 hello
)"

ok:="gergerg
(
 hello
)"

ok:="gergerg
(
 hello

""
) greherh
(
  fefefef
)"

    CmdLine := ( A_IsCompiled ? "" : """" A_AhkPath """" ) A_Space ( """" A_ScriptFullpath """" )
    TaskName := "[RunAsTask] " A_ScriptName " @" SubStr( "000000000" DllCall( "NTDLL\RtlComputeCrc32"
    , "Int",0, "WStr",CmdLine, "UInt",StrLen( CmdLine ) * 2, "UInt" ), -9 )

; p(ok)
123(ok)
aaap(ok)
aaap(aaap(ok))

bruhv:="ge(rg)erg"

p(bruhv)


return

f3::Exitapp