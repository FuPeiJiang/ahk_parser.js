; https://www.autohotkey.com/boards/viewtopic.php?t=666#p5170
sXML_Pretty( XML, IndentationUnit:="`t" ) { ; Adds linefeeds (LF, asc 10) and indentation between XML tags.
  ; NOTE: If the XML does not begin with a "<?xml...?>" tag, the output will begin with a newline.
    il:=StrLen(IndentationUnit)
    Loop Parse, XML, "<"
      If ( A_Index = 1 )
        VarSetStrCapacity(XML,Round(StrLen(XML)*2.3), 0 )
      Else
        Loop Parse, A_LoopField, ">", "`t`n`r " Chr( 160 )
          If ( A_Index = 1 )
          {
            closetag := SubStr( A_LoopField, 1, 1 )
            emptytag := SubStr( A_LoopField, 0 )
            If ( closetag = "?" ) && ( emptytag = "?" )
              XML := "<" A_LoopField
            Else
            {
              If ( closetag = "/" )
              {
                indent:=SubStr(indent,1,-il)
                If ( priortag )
                  XML .= "`n" indent
              }
              Else
              {
                XML .= "`n" indent
                If ( emptytag != "/" ) && ( closetag != "!" )
                  indent .= IndentationUnit
              }
              XML .= "<" A_LoopField
            }
            priortag := closetag = "/" || closetag = "!" || emptytag = "/"
          }
          Else
            XML .= ">" A_LoopField
    Return XML
  } ; END - sXML_Pretty( XML, IndentationUnit="`t" )