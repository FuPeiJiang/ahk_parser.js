#NoEnv
#Warn
#SingleInstance, Force
SetWorkingDir %A_ScriptDir% 

File := "ahkicon.png"
If ! FileExist( File )
URLDownloadToFile, http://i.imgur.com/dS56Ewu.png, %File%

FileGetSize, nBytes, %File%
FileRead, Bin, *c %File%
B64Data := Base64Enc( Bin, nBytes, 100, 2 )
MsgBox % Clipboard := B64Data 

Return ;     // end of auto-execcute section //


Base64Enc( ByRef Bin, nBytes, LineLength := 64, LeadingSpaces := 0 ) { ; By SKAN / 18-Aug-2017
Local Rqd := 0, B64, B := "", N := 0 - LineLength + 1  ; CRYPT_STRING_BASE64 := 0x1
  DllCall( "Crypt32.dll\CryptBinaryToString", "Ptr",&Bin ,"UInt",nBytes, "UInt",0x1, "Ptr",0,   "UIntP",Rqd )
  VarSetCapacity( B64, Rqd * ( A_Isunicode ? 2 : 1 ), 0 )
  DllCall( "Crypt32.dll\CryptBinaryToString", "Ptr",&Bin, "UInt",nBytes, "UInt",0x1, "Str",B64, "UIntP",Rqd )
  If ( LineLength = 64 and ! LeadingSpaces )
    Return B64
  B64 := StrReplace( B64, "`r`n" )        
  Loop % Ceil( StrLen(B64) / LineLength )
    B .= Format("{1:" LeadingSpaces "s}","" ) . SubStr( B64, N += LineLength, LineLength ) . "`n" 
Return RTrim( B,"`n" )    
}