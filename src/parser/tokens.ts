
type stringIndexBool = {
  [key: string]: boolean,
}
type stringIndexNum = {[key: string]: number}

type stringIndexString = {
  [key: string]: string,
}

export type {stringIndexBool,stringIndexNum,stringIndexString}

export const whiteSpace = /\u000B\u000C\u0020\u00A0/
export const whiteSpaceObj: stringIndexBool = {' ':true,'\t':true}
// "([a-zA-Z0-9_#@$]+)\(.*?\)"
export const variableCharsObj: stringIndexBool = {'a':true,'b':true,'c':true,'d':true,'e':true,'f':true,'g':true,'h':true,'i':true,'j':true,'k':true,'l':true,'m':true,'n':true,'o':true,'p':true,'q':true,'r':true,'s':true,'t':true,'u':true,'v':true,'w':true,'x':true,'y':true,'z':true,'A':true,'B':true,'C':true,'D':true,'E':true,'F':true,'G':true,'H':true,'I':true,'J':true,'K':true,'L':true,'M':true,'N':true,'O':true,'P':true,'Q':true,'R':true,'S':true,'T':true,'U':true,'V':true,'W':true,'X':true,'Y':true,'Z':true,'0':true,'1':true,'2':true,'3':true,'4':true,'5':true,'6':true,'7':true,'8':true,'9':true,'_':true,'#':true,'@':true,'$':true}
export const propCharsObj: stringIndexBool = {'a':true,'b':true,'c':true,'d':true,'e':true,'f':true,'g':true,'h':true,'i':true,'j':true,'k':true,'l':true,'m':true,'n':true,'o':true,'p':true,'q':true,'r':true,'s':true,'t':true,'u':true,'v':true,'w':true,'x':true,'y':true,'z':true,'A':true,'B':true,'C':true,'D':true,'E':true,'F':true,'G':true,'H':true,'I':true,'J':true,'K':true,'L':true,'M':true,'N':true,'O':true,'P':true,'Q':true,'R':true,'S':true,'T':true,'U':true,'V':true,'W':true,'X':true,'Y':true,'Z':true,'0':true,'1':true,'2':true,'3':true,'4':true,'5':true,'6':true,'7':true,'8':true,'9':true,'_':true}

// export const whiteSpaceObj = {'\u000B':true,'\u000C':true,'\u0020':true,'\u00A0':true}

export const namedIf: stringIndexBool = {'ifequal':true,'ifnotequal':true,'ifless':true,'iflessorequal':true,'ifgreater':true,'ifgreaterorequal':true}
export const typeOfValidVarName: stringIndexNum = {'class':5,'autotrim':4,'blockinput':4,'break':4,'catch':4,'click':4,'clipwait':4,'continue':4,'control':4,'controlclick':4,'controlfocus':4,'controlget':4,'controlgetfocus':4,'controlgetpos':4,'controlgettext':4,'controlmove':4,'controlsend':4,'controlsendraw':4,'controlsettext':4,'coordmode':4,'critical':4,'detecthiddentext':4,'detecthiddenwindows':4,'drive':4,'driveget':4,'drivespacefree':4,'edit':4,'else':4,'envadd':4,'envdiv':4,'envget':4,'envmult':4,'envset':4,'envsub':4,'envupdate':4,'exit':4,'exitapp':4,'fileappend':4,'filecopy':4,'filecopydir':4,'filecreatedir':4,'filecreateshortcut':4,'filedelete':4,'fileencoding':4,'fileinstall':4,'filegetattrib':4,'filegetshortcut':4,'filegetsize':4,'filegettime':4,'filegetversion':4,'filemove':4,'filemovedir':4,'fileread':4,'filereadline':4,'filerecycle':4,'filerecycleempty':4,'fileremovedir':4,'fileselectfile':4,'fileselectfolder':4,'filesetattrib':4,'filesettime':4,'finally':4,'for':4,'formattime':4,'getkeystate':4,'gosub':4,'goto':4,'groupactivate':4,'groupadd':4,'groupclose':4,'groupdeactivate':4,'gui':4,'guicontrol':4,'guicontrolget':4,'hotkey':4,'ifequal':4,'ifnotequal':4,'ifexist':4,'ifnotexist':4,'ifgreater':4,'ifgreaterorequal':4,'ifinstring':4,'ifnotinstring':4,'ifless':4,'iflessorequal':4,'ifmsgbox':4,'ifwinactive':4,'ifwinnotactive':4,'ifwinexist':4,'ifwinnotexist':4,'imagesearch':4,'inidelete':4,'iniread':4,'iniwrite':4,'input':4,'inputbox':4,'keyhistory':4,'keywait':4,'listhotkeys':4,'listlines':4,'listvars':4,'loop':4,'menu':4,'mouseclick':4,'mouseclickdrag':4,'mousegetpos':4,'mousemove':4,'msgbox':4,'onexit':4,'outputdebug':4,'pause':4,'pixelgetcolor':4,'pixelsearch':4,'postmessage':4,'process':4,'progress':4,'random':4,'regdelete':4,'regread':4,'regwrite':4,'reload':4,'return':4,'run':4,'runas':4,'runwait':4,'send':4,'sendraw':4,'sendinput':4,'sendplay':4,'sendevent':4,'sendlevel':4,'sendmessage':4,'sendmode':4,'setbatchlines':4,'setcapslockstate':4,'setcontroldelay':4,'setdefaultmousespeed':4,'setenv':4,'setformat':4,'setkeydelay':4,'setmousedelay':4,'setnumlockstate':4,'setscrolllockstate':4,'setregview':4,'setstorecapslockmode':4,'settimer':4,'settitlematchmode':4,'setwindelay':4,'setworkingdir':4,'shutdown':4,'sleep':4,'sort':4,'soundbeep':4,'soundget':4,'soundgetwavevolume':4,'soundplay':4,'soundset':4,'soundsetwavevolume':4,'splashimage':4,'splashtexton':4,'splashtextoff':4,'splitpath':4,'statusbargettext':4,'statusbarwait':4,'stringcasesense':4,'stringgetpos':4,'stringleft':4,'stringlen':4,'stringlower':4,'stringmid':4,'stringreplace':4,'stringright':4,'stringsplit':4,'stringtrimleft':4,'stringtrimright':4,'stringupper':4,'suspend':4,'switch':4,'sysget':4,'thread':4,'throw':4,'tooltip':4,'transform':4,'traytip':4,'try':4,'until':4,'urldownloadtofile':4,'while':4,'winactivate':4,'winactivatebottom':4,'winclose':4,'wingetactivestats':4,'wingetactivetitle':4,'wingetclass':4,'winget':4,'wingetpos':4,'wingettext':4,'wingettitle':4,'winhide':4,'winkill':4,'winmaximize':4,'winmenuselectitem':4,'winminimize':4,'winminimizeall':4,'winminimizeallundo':4,'winmove':4,'winrestore':4,'winset':4,'winsettitle':4,'winshow':4,'winwait':4,'winwaitactive':4,'winwaitnotactive':4,'winwaitclose':4,'global':3,'local':3,'static':3,'if':2,'#clipboardtimeout':1,'#commentflag':1,'#errorstdout':1,'#escapechar':1,'#hotkeyinterval':1,'#hotkeymodifiertimeout':1,'#hotstring':1,'#if':1,'#ifwinactive':1,'#ifwinexist':1,'#ifwinnotactive':1,'#ifwinnotexist':1,'#iftimeout':1,'#include':1,'#includeagain':1,'#inputlevel':1,'#installkeybdhook':1,'#installmousehook':1,'#keyhistory':1,'#maxhotkeysperinterval':1,'#maxmem':1,'#maxthreads':1,'#maxthreadsbuffer':1,'#maxthreadsperhotkey':1,'#menumaskkey':1,'#noenv':1,'#notrayicon':1,'#persistent':1,'#requires':1,'#singleinstance':1,'#usehook':1,'#warn':1,'#winactivateforce':1,'#ltrim':1}
//javascript key can't be number, it's automatically converted to string
export const whiteSpaceOverrideAssign: stringIndexBool = {1:true,2:true,3:true}

export const operatorsObj: stringIndexBool = {'new':true,'++':true,'--':true,'**':true,'!':true,'~':true,'&':true,'*':true,'/':true,'//':true,'-':true,'+':true,'<<':true,'>>':true,'^':true,'|':true,'.':true,'~=':true,'>':true,'<':true,'>=':true,'<=':true,'=':true,'==':true,'<>':true,'!=':true,'not':true,'and':true,'&&':true,'or':true,'||':true,'?':true,':':true,':=':true,'+=':true,'-=':true,'*=':true,'/=':true,'//=':true,'.=':true,'|=':true,'&=':true,'^=':true,'>>=':true,'<<=':true}
export const assignmentOperators: stringIndexBool = {'++':true,'--':true,':=':true,'+=':true,'-=':true,'*=':true,'/=':true,'//=':true,'.=':true,'|=':true,'&=':true,'^=':true,'>>=':true,'<<=':true}
export const v1Continuator: stringIndexBool = {',':true,'**':true,'!':true,'~':true,'&':true,'*':true,'/':true,'//':true,'-':true,'+':true,'<<':true,'>>':true,'^':true,'|':true,'.':true,'~=':true,'>':true,'<':true,'>=':true,'<=':true,'=':true,'==':true,'<>':true,'!=':true,'&&':true,'||':true,'?':true,':=':true,'+=':true,'-=':true,'*=':true,'/=':true,'//=':true,'.=':true,'|=':true,'&=':true,'^=':true,'>>=':true,'<<=':true}
export const v2Continuator: stringIndexBool = {'**':true,'!':true,'~':true,'&':true,'*':true,'/':true,'//':true,'-':true,'+':true,'<<':true,'>>':true,'^':true,'|':true,'.':true,'~=':true,'>':true,'<':true,'>=':true,'<=':true,'=':true,'==':true,'<>':true,'!=':true,'and':true,'&&':true,'or':true,'||':true,'?':true,':':true,':=':true,'+=':true,'-=':true,'*=':true,'/=':true,'//=':true,'.=':true,'|=':true,'&=':true,'^=':true,'>>=':true,'<<=':true}
export const legacyIfOperators: stringIndexBool = {'=':true,'<>':true,'!=':true,'>':true,'>=':true,'<':true,'<=':true}

export const elseLoopReturn: stringIndexBool = {'else':true,'loop':true,'return':true,'try':true,'finally':true}
export const elseTryFinally: stringIndexString = {'else':'else','try':'try','finally':'finally'}

export const thisCouldBeFuncName: stringIndexBool = {'idkVariable':true,'(.) property findTrailingExpr':true}
export const emptyLinesObj: stringIndexBool = {'emptyLines':true,'emptyLines EOF':true}

export const A_VarsObj: stringIndexString = {'a_index':'A_Index','a_space':'A_Space','a_tab':'A_Tab','a_workingdir':'A_WorkingDir','a_scriptdir':'A_ScriptDir','a_scriptname':'A_ScriptName','a_yyyy':'A_YYYY','a_mm':'A_MM','a_dd':'A_DD','a_hour':'A_Hour','a_min':'A_Min','a_sec':'A_Sec','a_issuspended':'A_IsSuspended','a_batchlines':'A_BatchLines','a_listlines':'A_ListLines','a_titlematchmode':'A_TitleMatchMode','a_timeidle':'A_TimeIdle','a_timeidlephysical':'A_TimeIdlePhysical','a_timeidlekeyboard':'A_TimeIdleKeyboard','a_timeidlemouse':'A_TimeIdleMouse','a_gui':'A_Gui','a_guicontrol':'A_GuiControl','a_guievent':'A_GuiEvent','a_eventinfo':'A_EventInfo','a_thishotkey':'A_ThisHotkey','a_endchar':'A_EndChar','a_thismenuitem':'A_ThisMenuItem','a_osversion':'A_OSVersion','a_screenwidth':'A_ScreenWidth','a_screenheight':'A_ScreenHeight','a_cursor':'A_Cursor','a_caretx':'A_CaretX','a_carety':'A_CaretY','a_args':'A_Args','a_scriptfullpath':'A_ScriptFullPath','a_scripthwnd':'A_ScriptHwnd','a_linenumber':'A_LineNumber','a_linefile':'A_LineFile','a_thisfunc':'A_ThisFunc','a_thislabel':'A_ThisLabel','a_ahkversion':'A_AhkVersion','a_ahkpath':'A_AhkPath','a_isunicode':'A_IsUnicode','a_iscompiled':'A_IsCompiled','a_exitreason':'A_ExitReason','a_year':'A_Year','a_mon':'A_Mon','a_mday':'A_MDay','a_mmmm':'A_MMMM','a_mmm':'A_MMM','a_dddd':'A_DDDD','a_ddd':'A_DDD','a_wday':'A_WDay','a_yday':'A_YDay','a_yweek':'A_YWeek','a_msec':'A_MSec','a_now':'A_Now','a_nowutc':'A_NowUTC','a_tickcount':'A_TickCount','a_ispaused':'A_IsPaused','a_iscritical':'A_IsCritical','a_numbatchlines':'A_NumBatchLines','a_titlematchmodespeed':'A_TitleMatchModeSpeed','a_detecthiddenwindows':'A_DetectHiddenWindows','a_detecthiddentext':'A_DetectHiddenText','a_autotrim':'A_AutoTrim','a_stringcasesense':'A_StringCaseSense','a_fileencoding':'A_FileEncoding','a_formatinteger':'A_FormatInteger','a_formatfloat':'A_FormatFloat','a_sendmode':'A_SendMode','a_sendlevel':'A_SendLevel','a_storecapslockmode':'A_StoreCapsLockMode','a_keydelay':'A_KeyDelay','a_keyduration':'A_KeyDuration','a_keydelayplay':'A_KeyDelayPlay','a_keydurationplay':'A_KeyDurationPlay','a_windelay':'A_WinDelay','a_controldelay':'A_ControlDelay','a_mousedelay':'A_MouseDelay','a_mousedelayplay':'A_MouseDelayPlay','a_defaultmousespeed':'A_DefaultMouseSpeed','a_coordmodetooltip':'A_CoordModeToolTip','a_coordmodepixel':'A_CoordModePixel','a_coordmodemouse':'A_CoordModeMouse','a_coordmodecaret':'A_CoordModeCaret','a_coordmodemenu':'A_CoordModeMenu','a_regview':'A_RegView','a_iconhidden':'A_IconHidden','a_icontip':'A_IconTip','a_iconfile':'A_IconFile','a_iconnumber':'A_IconNumber','a_defaultgui':'A_DefaultGui','a_defaultlistview':'A_DefaultListView','a_defaulttreeview':'A_DefaultTreeView','a_guiwidth':'A_GuiWidth','a_guiheight':'A_GuiHeight','a_guix':'A_GuiX','a_guiy':'A_GuiY','a_guicontrolevent':'A_GuiControlEvent','a_thismenu':'A_ThisMenu','a_thismenuitempos':'A_ThisMenuItemPos','a_priorhotkey':'A_PriorHotkey','a_priorkey':'A_PriorKey','a_timesincethishotkey':'A_TimeSinceThisHotkey','a_timesincepriorhotkey':'A_TimeSincePriorHotkey','a_comspec':'A_ComSpec','a_temp':'A_Temp','a_ostype':'A_OSType','a_is64bitos':'A_Is64bitOS','a_ptrsize':'A_PtrSize','a_language':'A_Language','a_computername':'A_ComputerName','a_username':'A_UserName','a_windir':'A_WinDir','a_programfiles':'A_ProgramFiles','a_':'A_','a_appdata':'A_AppData','a_appdatacommon':'A_AppDataCommon','a_desktop':'A_Desktop','a_desktopcommon':'A_DesktopCommon','a_startmenu':'A_StartMenu','a_startmenucommon':'A_StartMenuCommon','a_programs':'A_Programs','a_programscommon':'A_ProgramsCommon','a_startup':'A_Startup','a_startupcommon':'A_StartupCommon','a_mydocuments':'A_MyDocuments','a_isadmin':'A_IsAdmin','a_screendpi':'A_ScreenDPI','a_ipaddress1':'A_IPAddress1','a_lasterror':'A_LastError','a_loopfilename':'A_LoopFileName','a_loopregname':'A_LoopRegName','a_loopreadline':'A_LoopReadLine','a_loopfield':'A_LoopField','a_loopfileext':'A_LoopFileExt','a_loopfilefullpath':'A_LoopFileFullPath','a_loopfilepath':'A_LoopFilePath','a_loopfilelongpath':'A_LoopFileLongPath','a_loopfileshortpath':'A_LoopFileShortPath','a_loopfileshortname':'A_LoopFileShortName','a_loopfiledir':'A_LoopFileDir','a_loopfiletimemodified':'A_LoopFileTimeModified','a_loopfiletimecreated':'A_LoopFileTimeCreated','a_loopfiletimeaccessed':'A_LoopFileTimeAccessed','a_loopfileattrib':'A_LoopFileAttrib','a_loopfilesize':'A_LoopFileSize','a_loopfilesizekb':'A_LoopFileSizeKB','a_loopfilesizemb':'A_LoopFileSizeMB','a_loopregtype':'A_LoopRegType','a_loopregkey':'A_LoopRegKey','a_loopregsubkey':'A_LoopRegSubKey','a_loopregtimemodified':'A_LoopRegTimeModified'}
