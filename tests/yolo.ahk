#NoEnv ; Recommended for performance and compatibility with future AutoHotkey releases.
#SingleInstance, force
SendMode Input ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir% ; Ensures a consistent starting directory.
SetBatchLines, -1
#KeyHistory 0
ListLines Off

SetWinDelay, -1
SetControlDelay, -1

#MaxThreads, 20
#MaxThreadsPerHotkey, 4
SetTitleMatchMode, 2

currentDirSearch=
            ;%appdata%\ahk_explorer_settings
        /* FileRead, favoriteFolders, %A_AppData%\ahk_explorer_settings\favoriteFolders.txt
favoriteFolders:=StrSplit(favoriteFolders,"`n","`r")
loadSettings() 
*/
;gsettings
;gsettings

FOLDERID_Downloads := "{374DE290-123F-4565-9164-39C4925E467B}"
RegRead, v, HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders, % FOLDERID_Downloads
VarSetCapacity(downloads, (261 + !A_IsUnicode) << !!A_IsUnicode)
DllCall("ExpandEnvironmentStrings", Str, v, Str, downloads, UInt, 260)