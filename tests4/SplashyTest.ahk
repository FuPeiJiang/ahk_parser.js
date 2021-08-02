Class Splashy
{

	spr := 0
	spr1 := 0
	spr2 := 0

	; HTML Colours (RGB- no particular order)
	STATIC HTML := {CYAN: "0X00FFFF", AQUAMARINE : "0X7FFFD4", BLACK: "0X000000", BLUE: "0X0000FF", FUCHSIA: "0XFF00FF", GRAY: "0X808080", AUBURN: "0X2A2AA5"
	 , LIME: "0X00FF00", MAROON: "0X800000", NAVY: "0X000080", OLIVE: "0X808000", PURPLE: "0X800080", INDIGO: "0X4B0082", LAVENDER: "0XE6E6FA", DKSALMON: "0X7A96E9"
	 , SILVER: "0XC0C0C0", TEAL: "0X008080", WHITE: "0XFFFFFF", YELLOW: "0XFFFF00", WHEAT: "0xF5DEB3", ORANGE: "0XFFA500", BEIGE: "0XF5F5DC", CELADON: "0XACE1AF"
	 , CHESTNUT: "0X954535", TAN: "0xD2B48C", CHOCOLATE: "0X7B3F00", TAUPE: "0X483C32", SALMON: "0XFA8072", VIOLET: "0X7F00FF", GRAPE: "0X6F2DA8", STEINGRAU: "0X485555"
	 , PEACH: "0XFFE5B4", CORAL: "0XFF7F50", CRIMSON: "0XDC143C", VERMILION: "0XE34234", CERULEAN: "0X007BA7", TURQUOISE: "0X40E0D0", VIRIDIAN: "0X40826D", RED: "0XFF0000"
	 , PLUM: "0X8E4585", MAGENTA: "0XF653A6", GOLD: "0XFFD700", GOLDENROD: "0XDAA520", GREEN: "0X008000", ONYX: "0X353839", KHAKIGRAU: "0X746643", FELDGRAU: "0X3D5D5D"}

	Static WM_PAINT := 0x000F
	Static WM_NCHITTEST := 0x84
	Static WM_ERASEBKGND := 0x0014
	Static WM_CTLCOLORSTATIC := 0x0138

	Static updateFlag := -1
	Static procEnd := 0
	Static pToken := 0
	Static hGDIPLUS := 0
	Static WndProcOld := 0


	Static userWorkingDir := ""
	Static downloadedPathNames := []
	Static downloadedUrlNames := []
	Static vImgType := 0
	Static hWndSaved := 0
	Static release := 0
	Static hDCWin := 0
	Static hBitmap := 0
	Static hIcon := 0
	Static vHide := 0
	Static vPosX := 0
	Static vPosY := 0
	Static vMgnX := 0
	Static vMgnY := 0
	Static vImgX := 0
	Static vImgY := 0
	Static inputVImgW := 0
	Static inputVImgH := 0
	Static voldBorder := 0
	Static vImgW := 0
	Static vImgH := 0
	Static oldVImgW := 0
	Static oldVImgH := 0
	Static actualVImgW := 0
	Static actualVImgH := 0
	Static oldPicInScript := 0
	Static picInScript := 0

	Static ImageName := ""
	Static oldImagePath := ""
	Static imageUrl := ""
	Static oldImageUrl := ""
	Static bkgdColour := ""
	Static transCol := 0
	Static noHWndActivate := ""
	Static vCentre := 0
	Static vBorder := 0
	Static vOnTop := 0


	Static mainTextHWnd := 0
	Static mainText := ""
	Static mainTextSize := [0, 0]
	Static mainBkgdColour := ""
	Static mainFontName := ""
	Static mainFontSize := 0
	Static mainFontWeight := 0
	Static mainFontColour := ""
	Static mainFontQuality := 0
	Static mainFontItalic := ""
	Static mainFontStrike := ""
	Static mainFontUnderline := ""
	Static mainMarquee := 0

	Static subTextHWnd := 0
	Static subText := ""
	Static subTextSize := [0, 0]
	Static subBkgdColour := ""
	Static subFontName := ""
	Static subFontSize := 0
	Static subFontWeight := 0
	Static subFontColour := ""
	Static subFontQuality := 0
	Static subFontItalic := ""
	Static subFontStrike := ""
	Static subFontUnderline := ""
	Static subMarquee := 0


	class BoundFuncCallback
	{
	; https://www.autohotkey.com/boards/viewtopic.php?f=76&t=88704&p=390706
		__New(BoundFuncObj, paramCount, options := "")
		{
		This.pInfo := Object( {BoundObj: BoundFuncObj, paramCount: paramCount} )
		This.addr := RegisterCallback(This.__Class . "._Callback", options, paramCount, This.pInfo)
		}
		__Delete()
		{
		ObjRelease(This.pInfo)
		DllCall("GlobalFree", "Ptr", This.addr, "Ptr")
		}
		_Callback(Params*)
		{
		Info := Object(A_EventInfo), Args := []
		Loop % Info.paramCount
		Args.Push( NumGet(Params + A_PtrSize*(A_Index - 2)) )
		Return Info.BoundObj.Call(Args*)
		}
	}

	SplashImg(argList*)
	{
	imagePathOut := ""
	imageUrlOut := ""
	bkgdColourOut := -1
	transColOut := ""
	vHideOut := 0
	noHWndActivateOut := ""
	vCentreOut := 0
	vMovableOut := 0
	vBorderOut := ""
	vOnTopOut := 0
	vPosXOut := ""
	vPosYOut := ""
	vMgnXOut := -1
	vMgnYOut := -1
	vImgWOut := 0
	vImgHOut := 0
	mainTextOut := ""
	mainBkgdColourOut := -1
	mainFontNameOut := ""
	mainFontSizeOut := 0
	mainFontWeightOut := 0
	mainFontColourOut := -1
	mainFontQualityOut := -1
	mainFontItalicOut := 0
	mainFontStrikeOut := 0
	mainFontUnderlineOut := 0
	subTextOut := ""
	subBkgdColourOut := -1
	subFontNameOut := ""
	subFontSizeOut := 0
	subFontWeightOut := 0
	subFontColourOut := -1
	subFontQualityOut := -1
	subFontItalicOut := 0
	subFontStrikeOut := 0
	subFontUnderlineOut := 0

		if (argList["release"])
		{
			This.Destroy()
			return
		}

		if (This.hWndSaved)
		{
			if (argList.HasKey("initSplash"))
			{
				if (argList["initSplash"])
				This.updateFlag := 0
				else
				This.updateFlag := 1
			}
			else
			This.updateFlag := 1
		}

		For Key, Value in argList
		{

		; An alternative: https://www.autohotkey.com/boards/viewtopic.php?f=6&t=9656
			if (Key)
			{
				Switch Key
				{
				Case "imagePath":
				{

					if (This.updateFlag > 0)
					This.imagePath := This.ValidateText(Value)
					else
					imagePathOut := Value

					if ((InStr(This.imagePath, "*")))
					This.picInScript := 1
					else
					This.picInScript := 0
				}
				Case "imageUrl":
				{
					if (This.updateFlag > 0)
					This.imageUrl := This.ValidateText(Value)
					else
					imageUrlOut := Value
				}
				Case "bkgdColour":
				{
					if (Value != -1)
					{
						if (This.updateFlag > 0)
						This.bkgdColour := This.ValidateColour(Value)
						else
						bkgdColourOut := Value
					}
				}
				Case "transCol":
				{
					if (This.transCol)
					{
						if (!Value && This.hWndSaved)
						{
						WinSet, TransColor, Off, % "ahk_id" . This.hWndSaved
							if (This.subTextHWnd)
							WinSet, TransColor, Off, % "ahk_id" . This.subTextHWnd
							if (This.mainTextHWnd)
							WinSet, TransColor, Off, % "ahk_id" . This.mainTextHWnd
						}
					}

					if (This.updateFlag > 0)
					This.transCol := Value
					else
					transColOut := Value
				}
				Case "vHide":
				{
					if (This.updateFlag > 0)
					This.vHide := Value
					else
					vHideOut := Value
				}
				Case "noHWndActivate":
				{
					if (This.updateFlag > 0)
					This.noHWndActivate := (Value)? "NoActivate ": ""
					else
					noHWndActivateOut := Value
				}
				Case "vCentre":
				{
					if (This.updateFlag > 0)
					This.vCentre := Value
					else
					vCentreOut := Value
				}
				Case "vMovable":
				{
					if (This.updateFlag > 0)
					This.vMovable := Value
					else
					vMovableOut := Value
				}
				Case "vBorder":
				{
					if (This.updateFlag > 0)
					This.vBorder := Value
					else
					vBorderOut := Value
				}
				Case "vOnTop":
				{
					if (This.updateFlag > 0)
					This.vOnTop := Value
					else
					vOnTopOut := Value
				}
				Case "vPosX":
				{
				spr := (Value == "")? Value: Floor(Value)
					if (This.updateFlag > 0)
					This.vPosX := spr
					else
					vPosXOut := spr
				}

				Case "vPosY":
				{
				spr := (Value == "")? Value: Floor(Value)
					if (This.updateFlag > 0)
					This.vPosY := spr
					else
					vPosYOut := spr
				}

				Case "vMgnX":
				{
					if (Value >= 0)
					{
						if (This.updateFlag > 0)
						This.vMgnX := (Value == "D")? Value: Floor(Value)
						else
						vMgnXOut := Value
					}
				}
				Case "vMgnY":
				{
					if (Value >= 0)
					{
						if (This.updateFlag > 0)
						This.vMgnY := (Value == "D")? Value: Floor(Value)
						else
						vMgnYOut := Value
					}
				}
				Case "vImgW":
				{
					if Value is number
					{
						if (Value > 1)
						{
						This.oldVImgW := This.vImgW
							if (This.updateFlag > 0)
							This.inputVImgW := Floor(Value)
							else
							vImgWOut := Value
						}
						else
						{
							if (Value > 0)
							{
							This.oldVImgW := This.vImgW
								if (This.updateFlag > 0)
								This.inputVImgW := A_ScreenWidth * Value
								else
								vImgWOut := A_ScreenWidth * Value
							}
							else
							This.inputVImgW := 0
						}
					}
					else
					This.inputVImgW := 0
				}

				Case "vImgH":
				{
					if Value is number
					{
						if (Value > 1)
						{
						This.oldVImgH := This.vImgH
							if (This.updateFlag > 0)
							This.inputVImgH := Floor(Value)
							else
							vImgHOut := Value
						}
						else
						{
							if (Value > 0)
							{
							This.oldVImgH := This.vImgH
								if (This.updateFlag > 0)
								This.inputVImgH := A_ScreenWidth * Value
								else
								vImgHOut := A_ScreenWidth * Value
							}
							else
							This.inputVImgH := 0
						}
					}
					else
					This.inputVImgH := 0
				}



				Case "mainText":
				{
					if (This.updateFlag > 0)
					This.mainText := This.ValidateText(Value)
					else
					mainTextOut := Value
				}
				Case "mainBkgdColour":
				{
					if (Value != -1)
					{
						if (This.updateFlag > 0)
						This.mainBkgdColour := This.ValidateColour(Value, 1)
						else
						mainBkgdColourOut := Value
					}
				}
				Case "mainFontName":
				{
					if (Value)
					{
						if (This.updateFlag > 0)
						This.mainFontName := This.ValidateText(Value)
						else
						mainFontNameOut := Value
					}
				}
				Case "mainFontSize":
				{
					if (200 >= Value >= 0) ; arbitrary limit
					{
						if (This.updateFlag > 0)
						This.mainFontSize := Floor(Value)
						else
						mainFontSizeOut := Value
					}
				}
				Case "mainFontWeight":
				{
					if (1000 >= Value >= 0)
					{
						if (This.updateFlag > 0)
						This.mainFontWeight := Floor(Value)
						else
						mainFontWeightOut := Value
					}
				}
				Case "mainFontColour":
				{
					if (Value != -1)
					{
						if (This.updateFlag > 0)
						This.mainFontColour := This.ValidateColour(Value, 1)
						else
						mainFontColourOut := Value
					}
				}
				Case "mainFontQuality":
				{
					if (Value >= 0 && Value <= 5) ; 0 :=  DEFAULT_QUALITY
					{
						if (This.updateFlag > 0)
						This.mainFontQuality := Floor(Value)
						else
						mainFontQualityOut := Value
					}
				}
				Case "mainFontItalic":
				{
					if (This.updateFlag > 0)
					This.mainFontItalic := (Value)? " Italic": ""
					else
					mainFontItalicOut := Value
				}
				Case "mainFontStrike":
				{
					if (This.updateFlag > 0)
					This.mainFontStrike := (Value)? " Strike": ""
					else
					mainFontStrikeOut := Value
				}
				Case "mainFontUnderline":
				{
					if (This.updateFlag > 0)
					This.mainFontUnderline := (Value)? " Underline": ""
					else
					mainFontUnderlineOut := Value
				}




				Case "subText":
				{
					if (This.updateFlag > 0)
					This.subText := This.ValidateText(Value)
					else
					subTextOut := Value
				}
				Case "subBkgdColour":
				{
					if (Value != -1)
					{
						if (This.updateFlag > 0)
						This.subBkgdColour := This.ValidateColour(Value, 1)
						else
						subBkgdColourOut := Value
					}
				}

				Case "subFontName":
				{
					if (Value)
					{
						if (This.updateFlag > 0)
						This.subFontName := This.ValidateText(Value)
						else
						subFontNameOut := Value
					}
				}
				Case "subFontSize":
				{
					if (200 >= Value >= 0) ; arbitrary limit
					{
						if (This.updateFlag > 0)
						This.subFontSize := Floor(Value)
						else
						subFontSizeOut := Value
					}
				}
				Case "subFontWeight":
				{
					if (1000 >= Value >= 0)
					{
						if (This.updateFlag > 0)
						This.subFontWeight := Floor(Value)
						else
						subFontWeightOut := Value
					}
				}
				Case "subFontColour":
				{
					if (Value != -1)
					{
						if (This.updateFlag > 0)
						This.subFontColour := This.ValidateColour(Value, 1)
						else
						subFontColourOut := Value
					}
				}
				Case "subFontQuality":
				{
					if (Value >= 0 && Value <= 5)
					{
						if (This.updateFlag > 0)
						This.subFontQuality := Floor(Value)
						else
						subFontQualityOut := Value
					}
				}
				Case "subFontItalic":
				{
					if (This.updateFlag > 0)
					This.subFontItalic := (Value)? " Italic": ""
					else
					subFontItalicOut := Value
				}
				Case "subFontStrike":
				{
					if (This.updateFlag > 0)
					This.subFontStrike := (Value)? " Strike": ""
					else
					subFontStrikeOut := Value
				}
				Case "subFontUnderline":
				{
					if (This.updateFlag > 0)
					This.subFontUnderline := (Value)? " Underline": ""
					else
					subFontUnderlineOut := Value
				}


				}
				
			}
		}

	This.SplashImgInit(imagePathOut, imageUrlOut
	, bkgdColourOut, transColOut, vHideOut, noHWndActivateOut
	, vCentreOut, vMovableOut, vBorderOut, vOnTopOut
	, vPosXOut, vPosYOut, vMgnXOut, vMgnYOut, vImgWOut, vImgHOut
	, mainTextOut, mainBkgdColourOut
	, mainFontNameOut, mainFontSizeOut, mainFontWeightOut, mainFontColourOut
	, mainFontQualityOut, mainFontItalicOut, mainFontStrikeOut, mainFontUnderlineOut
	, subTextOut, subBkgdColourOut
	, subFontNameOut, subFontSizeOut, subFontWeightOut, subFontColourOut
	, subFontQualityOut, subFontItalicOut, subFontStrikeOut, subFontUnderlineOut)
	
	}

	SplashImgInit(imagePathIn, imageUrlIn
	, bkgdColourIn, transColIn, vHideIn, noHWndActivateIn
	, vCentreIn, vMovableIn, vBorderIn, vOnTopIn
	, vPosXIn, vPosYIn, vMgnXIn, vMgnYIn, vImgWIn, vImgHIn
	, mainTextIn, mainBkgdColourIn
	, mainFontNameIn, mainFontSizeIn, mainFontWeightIn, mainFontColourIn
	, mainFontQualityIn, mainFontItalicIn, mainFontStrikeIn, mainFontUnderlineIn
	, subTextIn, subBkgdColourIn
	, subFontNameIn, subFontSizeIn, subFontWeightIn, subFontColourIn
	, subFontQualityIn, subFontItalicIn, subFontStrikeIn, subFontUnderlineIn)
	/*
	; Future expansion for vertical text:
	, rightText := "", rightFontNameIn := "", rightFontSizeIn := 0, rightFontWeightIn := 0, rightFontColourIn := -1
	, leftText := "", leftFontNameIn := "", leftFontSizeIn := 0, leftFontWeightIn := 0, leftFontColourIn := -1
	; also consider transparency
	*/
	{
	vWinW := 0, vWinH := 0

	; Determines redraw of Splashy window
	diffPicOrDiffDims := 0
	; Border constants
	WS_DLGFRAME := 0x400000
	WS_CAPTION := 0xC00000
	WS_EX_WINDOWEDGE := 0x100
	WS_EX_STATICEDGE := 0x20000
	WS_EX_CLIENTEDGE := 0x200
	WS_EX_DLGMODALFRAME := 0x1


	This.userWorkingDir := A_WorkingDir
	SetWorkingDir %A_ScriptDir% ; else use full path for 

	This.procEnd := 0

		if (This.updateFlag <= 0)
		{
		;Set defaults

			if (StrLen(imagePathIn))
			This.imagePath := imagePathIn
			else
			{
				if (!This.imagePath && !StrLen(imageUrlIn))
				This.imagePath := A_AhkPath ; default icon. Ist of 5
			}

			if (StrLen(imageUrlIn))
			This.imageUrl := imageUrlIn
			else
			{
				if (!This.imageUrl)
				This.imageUrl := "https://www.autohotkey.com/assets/images/features-why.png"
			}


			if (bkgdColourIn == -1)
			{
				if (This.bkgdColour == "")
				This.bkgdColour := This.GetDefaultGUIColour()
			}
			else
			This.bkgdColour := This.ValidateColour(bkgdColourIn)


		This.transCol := transColIn

			This.vHide := vHideIn

			if (noHWndActivateIn)
			This.noHWndActivate := "NoActivate "
			else
			This.noHWndActivate := ""

		This.vCentre := vCentreIn
		This.vMovable := vMovableIn
		This.vBorder := vBorderIn
		This.vOnTop := vOnTopIn

		This.vPosX := (vPosXIn == "")? vPosXIn: Floor(vPosXIn)
		This.vPosY := (vPosYIn == "")? vPosYIn: Floor(vPosYIn)


			if (vMgnXIn == "D")
			{
			SM_CXEDGE := 45
			sysget, spr, %SM_CXEDGE%
			This.vMgnX := spr
			}
			else
			This.vMgnX := Floor(vMgnXIn)

			if (vMgnYIn == "D")
			{
			SM_CYEDGE := 46
			sysget, spr, %SM_CYEDGE%
			This.vMgnY := spr
			}
			else
			This.vMgnY := Floor(vMgnYIn)

			if (vImgWIn > 0)
			This.inputVImgW := Floor(vImgWIn)
			else
			{
			; negative values ignored
				if (This.hWndSaved)
				This.inputVImgW := 0
				else
				; At startup only
				This.vImgW := A_ScreenWidth/5
			}

			if (vImgHIn > 0)
			This.inputVImgH := Floor(vImgHIn)
			else
			{
				if (This.hWndSaved)
				This.inputVImgH := 0
				else
				This.vImgH := A_ScreenHeight/3
			}







			if (StrLen(mainTextIn))
			This.mainText := This.ValidateText(mainTextIn)
			else
			This.mainText := ""

			if (mainBkgdColourIn == -1)
			{
				if (This.mainBkgdColour == "")
				This.mainBkgdColour := This.GetDefaultGUIColour()
			}
			else
			This.mainBkgdColour := This.ValidateColour(mainBkgdColourIn, 1)

			if (StrLen(mainFontNameIn))
			This.mainFontName := This.ValidateText(mainFontNameIn)
			else
			{
				if (!This.mainFontName)
				This.mainFontName := "Verdana"
			}

			if (mainFontSizeIn)
			This.mainFontSize := Floor(mainFontSizeIn)
			else
			{
				if (!This.mainFontSize)
				This.mainFontSize := 12
			}

			if (mainFontWeightIn)
			This.mainFontWeight := Floor(mainFontWeightIn)
			else
			{
				if (!This.mainFontWeight)
				This.mainFontWeight := 600
			}

			if (mainFontColourIn == -1)
			{
				if (This.mainFontColour == "")
				This.mainFontColour := This.GetDefaultGUIColour(1)
			}
			else
			This.mainFontColour := This.ValidateColour(mainFontColourIn, 1)

			if (mainFontQualityIn >= 0)
			This.mainFontQuality := Floor(mainFontQualityIn)
			else
			{
				; NONANTIALIASED_QUALITY for better performance
				; https://stackoverflow.com/questions/8283631/graphics-drawstring-vs-textrenderer-drawtextwhich-can-deliver-better-quality/23230570#23230570
				if (!This.mainFontQuality)
				This.mainFontQuality := 1
			}

		This.mainFontItalic := (mainFontItalicIn)? " Italic": ""

		This.mainFontStrike := (mainFontStrikeIn)? " Strike": ""

		This.mainFontUnderline := (mainFontUnderlineIn)? " Underline": ""



			if (StrLen(subTextIn))
			This.subText :=  This.ValidateText(subTextIn)
			else
			This.subText := ""

			if (subBkgdColourIn == -1)
			{
				if (This.subBkgdColour == "")
				This.subBkgdColour := This.GetDefaultGUIColour()
			}
			else
			This.subBkgdColour := This.ValidateColour(subBkgdColourIn, 1)


			if (StrLen(subFontNameIn))
			This.subFontName := This.ValidateText(subFontNameIn)
			else
			{
				if (!This.subFontName)
				This.subFontName := "Verdana"
			}

			if (subFontSizeIn)
			This.subFontSize := Floor(subFontSizeIn)
			else
			{
				if (!This.subFontSize)
				This.subFontSize := 10
			}

			if (subFontWeightIn)
			This.subFontWeight := Floor(subFontWeightIn)
			else
			{
				if (!This.subFontWeight)
				This.subFontWeight := 400
			}

			if (subFontColourIn == -1)
			{
				if (This.subFontColour == "")
				This.subFontColour := This.GetDefaultGUIColour(1)
			}
			else
			This.subFontColour := This.ValidateColour(subFontColourIn, 1)

			if (subFontQualityIn >= 0)
			This.subFontQuality := Floor(subFontQualityIn)
			else
			{
				if (!This.subFontQuality)
				This.subFontQuality := 1
			}


		This.subFontItalic := (subFontItalicIn)? " Italic": ""

		This.subFontStrike := (subFontStrikeIn)? " Strike": ""

		This.subFontUnderline := (subFontUnderlineIn)? " Underline": ""

		This.updateFlag := 1 ; in case -1 at start
		}


		if (diffPicOrDiffDims := This.GetPicWH())
		This.DisplayToggle()


	DetectHiddenWindows On
		if (!This.hWndSaved)
		{
			if (This.hGDIPLUS := DllCall("LoadLibrary", "Str", "GdiPlus.dll", "Ptr"))
			{
			VarSetCapacity(SI, 24, 0), Numput(1, SI, 0, "Int")
			DllCall("GdiPlus.dll\GdiplusStartup", "UPtr*", spr, "Ptr", &SI, "Ptr", 0)
			; for return value see status enumeration in  gdiplustypes.h 
			This.pToken := spr
			}
			else
			msgbox, 8208, LoadLibrary, Critical GDIPLUS error!

		;Create Splashy window
		Gui, Splashy: New, +OwnDialogs +ToolWindow -Caption
		This.BindWndProc()
		}

		; Set borders:
		if (This.voldBorder != This.vBorder && (This.voldBorder || This.vBorder)) ; null or zero
		{
		; -0x800000 is not sufficient to remove the standard borders.
		Gui, Splashy: -%WS_CAPTION% -E%WS_EX_WINDOWEDGE% -E%WS_EX_STATICEDGE% -E%WS_EX_CLIENTEDGE% -E%WS_EX_DLGMODALFRAME%
			if (This.vBorder)
			{
				if (InStr(This.vBorder, "W") || InStr(This.vBorder, "S") || InStr(This.vBorder, "C") || InStr(This.vBorder, "D"))
				{
				if (InStr(This.vBorder, "W"))
				Gui, Splashy: +E%WS_EX_WINDOWEDGE%
				if (InStr(This.vBorder, "S"))
				Gui, Splashy: +E%WS_EX_STATICEDGE%
				if (InStr(This.vBorder, "C"))
				Gui, Splashy: +E%WS_EX_CLIENTEDGE%
				if (InStr(This.vBorder, "D"))
				Gui, Splashy: +E%WS_EX_DLGMODALFRAME%
				}
				else
				Gui, % "Splashy: " . ((This.vBorder == "B" || This.vBorder == "b")? "+Border": "+" . WS_DLGFRAME)
			}
		This.voldBorder := This.vBorder
		}

	Gui, Splashy: Color, % This.bkgdColour
	This.vImgX := This.vMgnX, This.vImgY := This.vMgnY
	vWinW := This.vImgW + 2 * This.vMgnX
	vWinH := This.vImgH + 2 * This.vMgnY


		if (StrLen(This.mainText))
		{
		Gui, Splashy: Font, % "norm s" . This.mainFontSize . " w" . This.mainFontWeight . " q" . This.mainFontQuality . This.mainFontItalic . This.mainFontStrike . This.mainFontUnderline, % This.mainFontName

		if (This.mainTextHWnd)
			{
			GuiControl, Splashy: Text, % This.mainTextHWnd, % This.mainText
			GuiControl, Splashy: Font, % This.mainTextHWnd
			This.mainTextSize := This.Text_height(This.mainText, This.mainTextHWnd)
			GuiControl, Splashy: Move, % This.mainTextHWnd, % "X" . This.vMgnX . " Y" . This.vMgnY . " W" . This.vImgW . " H" . This.mainTextSize[2]
			This.vImgY += This.mainTextSize[2]
			;ControlSetText, , %mainText%, % "ahk_id" . This.mainTextHWnd
			; This sends more paint messages to parent
			;ControlMove, , % This.vMgnX, % This.vMgnY, This.vImgW , Text_height(mainText, This.mainTextHWnd), % "ahk_id" . This.mainTextHWnd
			}
			else
			{
			Gui, Splashy: Add, Text, % "Center W" . This.vImgW . " Y" . This.vMgnY . " HWND" . "spr", % This.mainText
			This.mainTextHWnd := spr
			; initial pos can be a bit off 
			ControlGetPos, , , spr, , , % "ahk_id" . This.mainTextHWnd
			spr := This.vImgX + This.vImgW/2 - spr/2
			GuiControl, Splashy: Move, % This.mainTextHWnd, x%spr%
			GuiControl, Splashy: Font, % This.mainTextHWnd
			This.mainTextSize := This.Text_height(This.mainText, This.mainTextHWnd)
			This.vImgY += This.mainTextSize[2]
			}

			if (This.transCol)
			This.mainBkgdColour := This.ValidateColour(This.bkgdColour, 1)
		This.SubClassTextCtl(This.mainTextHWnd)

		vWinH += This.vImgY

		}
		else
		{
			if (This.mainTextHWnd)
			GuiControl, Splashy: Hide, % This.mainTextHWnd
		}

		if (StrLen(This.subText))
		{
		Gui, Splashy: Font, % "norm s" . This.subFontSize . " w" . This.subFontWeight . " q" . This.mainFontQuality . This.subFontItalic . This.subFontStrike . This.subFontUnderline, % This.subFontName


		spr := This.vImgH + This.vImgY + This.vMgnY


			if (This.subTextHWnd)
			{
			GuiControl, Splashy: Text, % This.subTextHWnd, % This.subText

			This.subTextSize := This.Text_height(This.subText, This.subTextHWnd)
			vWinH += This.subTextSize[2]
			
			GuiControl, Splashy: Font, % This.subTextHWnd
			GuiControl, Splashy: Move, % This.subTextHWnd, % "X" . This.vMgnX . " Y" . spr . " W" . This.vImgW . " H" . This.subTextSize[2]
			
			}
			else
			{
			Gui, Splashy: Add, Text, % "xp Center W" . This.vImgW . " Y" . spr . " HWND" . "spr1", % This.subText
			This.subTextHWnd := spr1
			This.subTextSize := This.Text_height(This.subText, This.subTextHWnd)
			ControlGetPos, , , spr1, , , % "ahk_id" . This.subTextHWnd
			spr1 := This.vImgX + This.vImgW/2 - spr1/2
			GuiControl, Splashy: Move, % This.subTextHWnd, % "X" . spr1 . " H" . This.subTextSize[2]
			GuiControl, Splashy: Font, % This.subTextHWnd
			vWinH += This.subTextSize[2]
			}

			if (This.transCol)
			This.subBkgdColour := This.ValidateColour(This.bkgdColour, 1)
		This.SubClassTextCtl(This.subTextHWnd)
		}
		else
		{
			if (This.subTextHWnd)
			GuiControl, Splashy: Hide, % This.subTextHWnd
		}



	Gui, Splashy: Font
	; set hWndSaved
	This.hWnd()



		if (This.vHide)
		WinHide % "ahk_id" This.hWndSaved
		else
		{
		spr := " "
			if (This.vCentre)
			{
				if (vWinW < A_ScreenWidth)
				This.vPosX := (A_ScreenWidth - vWinW)/2
				else
				This.vPosX := 0

				if (vWinH < A_ScreenHeight)
				This.vPosY := (A_ScreenHeight - vWinH)/2
				else
				This.vPosY := 0
			}
			else
			{
				if (This.vPosX == "")
				{
					if (vWinW < A_ScreenWidth)
					This.vPosX := (A_ScreenWidth - vWinW)/2
					else
					This.vPosX := 0
				}
				if (This.vPosY == "")
				{
					if (vWinH < A_ScreenHeight)
					This.vPosY := (A_ScreenHeight - vWinH)/2
					else
					This.vPosY := 0
				}
			}
		spr .= Format(" X{} Y{} W{} H{}", This.vPosX, This.vPosY, vWinW, vWinH)


		Gui, Splashy: -DPIScale
		Gui, Splashy: Show, Hide %spr%
		VarSetCapacity(rect, 16, 0)
		DllCall("GetWindowRect", "Ptr", This.hWndSaved, "Ptr", &rect)
		;WinGetPos, spr, spr1,,, % "ahk_id" . This.hWndSaved; fail

		; Supposed to prevent form visibility without picture while loading. Want another approach?
		Gui, Splashy: Show, % Format("X{} Y{}", -30000, -30000)
		sleep 20

		spr := NumGet(rect, 0, "int")
		spr1 := NumGet(rect, 4, "int")
		Gui, Splashy: +DPIScale
		;WinMove, % "ahk_id" . This.hWndSaved,, %spr%, %spr1% ; fails here whether 30000 or 0, as well as SetWindowPos. SetWindowPlacement?


		Gui, Splashy: Show, % This.noHWndActivate . Format("X{} Y{}", spr, spr1)
		WinSet, AlwaysOnTop, % (This.vOnTop)? 1 : 0, % "ahk_id" . This.hWndSaved
			if (This.transCol && !This.vBorder)
			WinSet, TransColor, % This.bkgdColour, % "ahk_id" . This.hWndSaved
		This.PaintProc(This.hWndSaved)
		}


	This.procEnd := 1

	SetWorkingDir % This.userWorkingDir
	DetectHiddenWindows Off

	}
	;==========================================================================================================
	;==========================================================================================================


	ValidateText(string)
	{
		if (StrLen(string))
		{
			if (StrLen(string) > 20000) ;length?
			string := SubStr(string, 1, 20000)
		}
		else ; "0", or some irregularity in string.
		{
		string =
		}
		return string
	}

	ValidateColour(keyOrVal, toBGR := 0)
	{


		if (This.HTML.HasKey(keyOrVal))
		{
		keyOrVal := This.ToBase(This.HTML[keyOrVal], 16)
		spr1 := StrLen(keyOrVal)
		}
		else
		{
		spr := ""

		spr1 := StrLen(keyOrVal)

		; If "0X" found, remove it. Will be added later. Remove other X's
		
		if (InStr(SubStr(keyOrVal, 1, 2), "0X"))
		keyOrVal := StrReplace(SubStr(keyOrVal, 3, spr1 - 2), "X", "0")
		else
		keyOrVal := StrReplace(SubStr(keyOrVal, 1, spr1), "X", "0")			; filter out numerics 

			if keyOrVal is not xdigit
			{
				; Filter out all but numerics
				loop, Parse, keyOrVal, , %A_Space%%A_Tab% `,
				{
					if A_Loopfield is xdigit
					spr .= A_Loopfield
				}

				if (spr)
				keyOrVal := spr
				else
				keyOrVal := 0
			}

			if (spr1 != 6 && keyOrVal is digit) ;  assume decimal,
			; which may not be desired if they were digits in above loop
			keyOrVal := This.ToBase(keyOrVal, 16)

		spr1 := StrLen(keyOrVal)

			if (spr1 > 8)
			spr1 := 8
			else
			{
				if (spr1 < 3)
				return "0X0"
			}

		}

	; pad zeroes
	spr2 := ""

		loop, % (6 - spr1)
		spr2 := spr2 . "0"

	spr := "0X" . spr2 . keyOrVal


		if (toBGR) ; for the GDI functions (ColorRef)
		spr := This.ReverseColour(spr)
		else
		{
			if (InStr(spr, "0X"))
			spr := SubStr(spr, 3, 6) ; "0X" prefix not required for AHK gui functions
		}

	return spr
	}

	ReverseColour(colour)
	{

		colour := ((colour & 0x0000FF) << 16 ) | (colour & 0x00FF00) | ((colour & 0xFF0000) >> 16)

		if colour is digit
		{
		spr := This.ToBase(colour, 16)
		; possible to return spr here
		; The following just pads the zeroes.
		spr1 := StrLen(spr)

		spr2 := ""

		loop, % (6 - spr1)
		spr2 := spr2 . "0"

		colour := "0X" . spr2 . spr

		}
		return colour
	}

	ToBase(n, b)
	{
	; Hex numbers n must be in quoted "0Xn" format
		Loop
		{
		r := mod(n, b)
		d := floor(n/b)

			if (b == 16)
			r := (r > 9)? chr(0x37 + r): r

		m := r . m
		n := d
			if (n < 1)
			Break
		}
	; returns without "0X"
	Return m
	}

	BinToHex(P, Bytes := 4, Prefix := "")
	{ 
	spr := ""
	Loop % (Bytes)
	   spr .= Format( "{:02X}", *(P + A_Index-1))
	Return ( Prefix . spr )
	}


	GetDefaultGUIColour(font := 0)
	{
		static COLOR_WINDOWTEXT := 8, COLOR_3DFACE := 15 ;(more white than grey these days)

		spr := DllCall("User32.dll\GetSysColor", "Int", (font)? 8: 15, "UInt")
		;BGR +> RGB
		spr := This.ReverseColour(spr)

		return spr
	}
	DownloadFile(URL, fName)
	{
			try
			{
				UrlDownloadToFile, %URL%, %fName%
			}
			catch spr
			{
			msgbox, 8208, FileDownload, Error with the bitmap download!`nSpecifically: %spr%
			}		
		FileGetSize, spr , % A_ScriptDir . "`\" . fName
			if spr < 50 ; some very small image
			{
			msgbox, 8208, FileDownload, File size is incorrect!
			return 0
			}
			sleep 50
			return 1


			return fName

	}

	BindWndProc(release := 0)
	{
	Static WndProcNew := 0
	static SetWindowLong := A_PtrSize == 8 ? "SetWindowLongPtr" : "SetWindowLong"
		if (release)
		{
		;This.clbk.__Delete()
		This.clbk := ""
		WndProcNew := 0
		}
		else
		{
			if (!WndProcNew) ; called once only from the caller- this is extra security
			{
			This.clbk := new This.BoundFuncCallback( ObjBindMethod(This, "WndProc"), 4 )
			WndProcNew := This.clbk.addr
				if (WndProcNew)
				{
					if (!(This.WndProcOld := DllCall(SetWindowLong, "Ptr", This.hWnd(), "Int", GWL_WNDPROC := -4, "Ptr", WndProcNew, "Ptr")))
					msgbox, 8208, WndProc, Bad return!		
				}
				else
				msgbox, 8208, WndProc, No address!
			}
		}
	}

	WndProc(hwnd, uMsg, wParam, lParam)
	{
	Critical 
		Switch uMsg
		{
			case % This.WM_CTLCOLORSTATIC:
			{
			return This.CtlColorStaticProc(wParam, lParam)
			}
			case % This.WM_PAINT:
			{
			This.PaintProc()
			return 0
			}
			case % This.WM_NCHITTEST:
			{
			return This.NcHitTestProc(hWnd, uMsg, wParam, lParam)
			}
			Default:
			return DllCall("CallWindowProc", "Ptr", This.WndProcOld, "Ptr", hWnd, "UInt", uMsg, "Ptr", wParam, "Ptr", lParam)		
		}
		
	}

	NcHitTestProc(hWnd, uMsg, wParam, lParam)
	{
		Static HTCLIENT := 1, HTCAPTION := 2
		; Makes form movable

		if (This.vMovable)
		{

		lResult := DllCall("DefWindowProc", "Ptr", hWnd, "UInt", uMsg, "UPtr", wParam, "Ptr", lParam)

			if (lResult == HTCLIENT)
			lResult := HTCAPTION
		return % lResult
		}
		else
		return % HTCLIENT
	}

	CtlColorStaticProc(wParam, lParam)
	{
	static DC_BRUSH := 0x12

		if (lparam == This.subTextHWnd) ; && This.hDCWin == wParam)
		This.SetColour(wParam, This.subBkgdColour, This.subFontColour)
		else
		{
			if (lParam == This.mainTextHWnd)
			This.SetColour(wParam, This.mainBkgdColour, This.mainFontColour)
		}
	return DllCall("Gdi32.dll\GetStockObject", "UInt", DC_BRUSH, "UPtr")
	}

	SetColour(textDC, bkgdColour, fontColour)
	{
		static NULL_BRUSH := 0x5, TRANSPARENT := 0X1, OPAQUE := 0X2, CLR_INVALID := 0xFFFFFFFF

		DllCall("Gdi32.dll\SetBkMode", "Ptr", textDC, "UInt", (This.transCol)? TRANSPARENT: OPAQUE)
		if (DllCall("Gdi32.dll\SetBkColor", "Ptr", textDC, "UInt", bkgdColour) == CLR_INVALID)
		msgbox, 8208, SetBkColor, Cannot set background colour for text!
		if (DllCall("Gdi32.dll\SetTextColor", "Ptr", textDC, "UInt", fontColour) == CLR_INVALID)
		msgbox, 8208, SetTextColor, Cannot set colour for text!

		DllCall("SetDCBrushColor", "Ptr", textDC, "UInt", bkgdColour)
	}


	PaintProc(hWnd := 0)
	{
	spr1 := 0	
		if (VarSetCapacity(PAINTSTRUCT, 60 + A_PtrSize, 0))
		{
				if (!hWnd)
				{
				hWnd := This.hWnd()
					if (!This.procEnd)
					spr1 := 1
				}
			; DC validated
				if (DllCall("User32.dll\BeginPaint", "Ptr", hWnd, "Ptr", &PAINTSTRUCT, "UPtr"))
				{
					if (!spr1)
					{
					static vDoDrawImg := 1 ;set This to 0 and the image won't be redrawn
					static vDoDrawBgd := 1 ;set This to 0 and the background won't be redrawn
					;return ;uncomment This line and the window will be blank

						if (vDoDrawImg)
						{
						This.PaintDC()
						}
						else
						Sleep, -1

						if (vDoDrawBgd)
						This.DrawBackground()
					}
				}
			DllCall("User32.dll\EndPaint", "Ptr", hWnd, "Ptr", &PAINTSTRUCT, "UPtr")
		}
		else
		msgbox, 8208, PAINSTRUCT, Cannot paint!

	}

	SubClassTextCtl(ctlHWnd, release := 0)
	{
	Static SubProcFunc := 0
		if (release)
		{
		;This.subClbk.__Delete()
		This.subClbk := ""
		SubProcFunc := 0
		}
		else
		{
			if (!ctlHWnd)
			return
			if (!SubProcFunc)
			{
			This.subClbk := new This.BoundFuncCallback( ObjBindMethod(This, "SubClassTextProc"), 6 )
			SubProcFunc := This.subClbk.addr
			}

			if !DllCall("Comctl32.dll\SetWindowSubclass", "Ptr", ctlHWnd, "Ptr", SubProcFunc, "Ptr", ctlHWnd, "Ptr", 0)
			msgbox, 8208, Text Control, SubClassing failed!

		}
	}
	SubClassTextProc(hWnd, uMsg, wParam, lParam, IdSubclass, RefData)
	{
	;THis subclass for marquee code
	; WM_PAINT is required to paint the scrolled text.
	; BeginPaint in WM_PAINT will erase the content already set in the DC of the control.
	;
	;To prevent, temporarily modify AHK's own hbrBackground in its WNDCLASSEX
	; hbrBackground := DllCall(GetStockObject(NULL_BRUSH))
	;
	;Which means we have to create our own class and window for the control anyway,
	; Then use Pens & Brushes & DrawTextEx et al.

	Critical
	static DC_BRUSH := 0x12
	/*



		if (uMsg == This.WM_ERASEBKGND)
		{
		return 1
		}
		if (uMsg == This.WM_PAINT)
		{
		VarSetCapacity(PAINTSTRUCT, 60 + A_PtrSize, 0)
			if (!(hDC := DllCall("User32.dll\BeginPaint", "Ptr", hWnd, "Ptr", &PAINTSTRUCT, "UPtr")))
			return 0
		spr := This.ToBase(hWnd, 16)
		spr1 := InStr(spr, This.mainTextHWnd)
		spr2 := InStr(spr, This.subTextHWnd)


			if (spr1 || spr2)
			{

			if (This.mainMarquee && spr1)
			{
			}
			else
				{
					if (This.mainMarquee && spr1)
					{
					}
					else
					{
						if (spr1)
						This.SetColour(This.mainBkgdColour, hDC)
						else
						This.SetColour(This.subBkgdColour, hDC)
					}
				}
			}

		DllCall("User32.dll\EndPaint", "Ptr", hWnd, "Ptr", &PAINTSTRUCT, "UPtr")
		return 0
		}

;Marquee code in an outside function
            ;RECT rectControls := {wd + xCurrentScroll, yCurrentScroll, xNewSize + xCurrentScroll, yNewSize + yCurrentScroll};
            ;if (!ScrollDC(hdcWinCl, -xDelta, 0, (CONST RECT*) &rectControls, (CONST RECT*) &rectControls, (HRGN)NULL, (RECT*) &rectControls))
                ;ReportErr(L"HORZ_SCROLL: ScrollD Failed!");

*/

	Return DllCall("Comctl32.dll\DefSubclassProc", "Ptr", hWnd, "UInt", uMsg, "Ptr", wParam, "Ptr", lParam)
	}


	DisplayToggle()
	{
	static vToggle := 1
	; This function uses LoadPicture to populate hBitmap and hIcon
	; and sets the image type for the painting routines accordingly
	; Now that the image dimensions are determined from GetPicWH,
	; adjust the images with the extra possible input from vImgW and vImgW.

	vToggle := !vToggle
	; If the image is the same between calls, this routine is never called, 
	; so vToggle will not update.

	This.vImgW := (This.inputVImgW)? This.inputVImgW: This.actualVImgW
	This.vImgH := (This.inputVImgH)? This.inputVImgH: This.actualVImgH

	spr1 := Format("W{} H{}", spr, spr1)

		if (This.imagePath)
		{
			if (This.hWndSaved)
			{
				This.oldImagePath := This.imagePath

				if (This.hBitmap)
				{
					This.DeleteHandles()
					This.oldPicInScript := 0
				}
				else
				{
					if (This.hIcon)
					{
						if (This.picInScript)
						This.oldPicInScript := 1
						else
						This.DeleteHandles()
					}
				}
			}
		SplitPath % This.imagePath,,, spr

			if (StrLen(spr))
			This.vImgType := ((spr == "cur")? 2: (spr == "exe" || spr == "ico")? 1: 0)
			else
			This.vImgType := 0 ; assume image



			if (InStr(This.imagePath, "*"))
			{
			This.vImgType := 1
			return
			}
			else
			{
				if (fileExist(This.imagePath))
				{

				spr := This.imagePath

					if (This.vImgType)
					{
						if (This.imagePath == A_AhkPath)
						{
						This.hIcon := LoadPicture(A_AhkPath, ((vToggle)? "Icon2": "") . spr1, spr)
						return
						}
						else
						{
							if (This.hIcon := LoadPicture(spr, spr1, spr)) ; must use 3rd parm or bitmap handle returned!
							return
						}
					}
					else
					{

						if (This.hBitmap := LoadPicture(spr, spr1))
						return
					}
				}
				else
				{
					if (!fileExist(This.ImageName) && !This.hIcon)
					{
					msgbox, 8208, DisplayToggle, Unknown Error!
					return
					}
				}
			}
		SplitPath % This.imagePath, spr
		This.ImageName := spr
		}
		else
		This.oldImagePath := ""

		; Fail, so download

			if (This.imageUrl && RegExMatch(This.imageUrl, "^(https?://|www\.)[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(/\S*)?$"))
			{
				if (!(This.ImageName))
				{
				SplitPath % This.imageUrl, spr
				This.ImageName := spr
				}
				;  check if file D/L'd previously
				for key, value in % This.downloadedUrlNames
				{
					if (This.imageUrl == value)
					{
						if (fileExist(key))
						{
							Try
							{
								if (key != This.ImageName)
								FileCopy, %key%, % This.ImageName
							Break
							}
							Catch e
							{
							msgbox, 8208, FileCopy, % key . " could not be copied with error: " . e
							}
						}
					}
				}


				if (!fileExist(This.ImageName))
				{
					if (!(This.DownloadFile(This.imageUrl, This.ImageName)))
					return
				}

				if (This.hBitmap := LoadPicture(This.ImageName, spr1))
				{
				This.oldImageUrl := This.imageUrl
				This.vImgType := 0
				spr := This.ImageName

				This.downloadedPathNames.Push(spr) 
				This.downloadedUrlNames(spr) := This.oldImageUrl
				return
				}
				else
				msgbox, 8208, LoadPicture, Format not recognized!

			}
			else
			spr := 1		

		; "Neverfail" default 
		This.hIcon := LoadPicture(A_AhkPath, ((vToggle)? "Icon2 ": "") . spr1, spr)
		This.vImgType := 1
		
	}

	GetPicWH()
	{
	Static ICONINFO := [], vToggle := 1

	vToggle := !vToggle
	/*
	typedef struct tagBITMAP {
	  LONG   bmType;
	  LONG   bmWidth;
	  LONG   bmHeight;
	  LONG   bmWidthBytes;
	  WORD   bmPlanes; // Short
	  WORD   bmBitsPixel; // Short
	  LPVOID bmBits; // FAR ptr to void
	} BITMAP, *PBITMAP, *NPBITMAP, *LPBITMAP; ==> Extra pointer reference
	*/
	This.ImageName := ""
	if (This.inputVImgW || This.inputVImgH)
	spr1 := Format("W{} H{}", This.inputVImgW, This.inputVImgH)
	else
	spr1 := ""

	if (This.imagePath)
	{
		if (This.hWndSaved)
		{
			if (This.oldImagePath == This.imagePath)
			{
			; No need to reload
				if (This.inputVImgW && This.inputVImgH)
				{
					if (This.oldVImgW == This.inputVImgW && This.oldVImgH == This.inputVImgH)
					return 0
				}
				else
				{
					if ((This.picInScript && This.oldPicInScript) || (!This.picInScript && !This.oldPicInScript))
					{
						if (This.inputVImgW)
						{
							if (This.oldVImgW == This.inputVImgW)
							return 0
						}
						else
						{
							if (This.inputVImgH)
							{
								if (This.oldVImgH == This.inputVImgH)
								return 0
							}
							else
							return 0
						}
					}
				}
			}
			This.DeleteHandles()
		}

	SplitPath % This.imagePath,,, spr

		if (StrLen(spr))
		This.vImgType := ((spr == "cur")? 2: (spr == "exe" || spr == "ico")? 1: 0)
		else
		This.vImgType := 0 ; assume image



		if (InStr(This.imagePath, "*"))
		{
		This.PicInScript := {}      
		VarSetCapacity(This.PicInScript, 21748 << !!A_IsUnicode)
		This.PicInScript := "iVBORw0KGgoAAAANSUhEUgAAAPoAAAEACAMAAACtTJvEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAEO5/0G7/0G8/kG8/0K+/0e5/ka4/0a6/0W9/kS8/0W+/0q3/0y2/k62/0m4/0u6/km6/0q8/0m//ki+/024/026/ky6/028/0++/k6+/1O0/1K2/1ay/1W1/lS0/1S2/1K4/1O6/lG6/1C8/1G+/lG+/1W5/lW4/1W6/1S9/lW8/1S+/1i0/1m2/12y/121/163/l22/1i4/1q6/1m8/1q+/lm+/124/1y6/128/12//l6+/2O0/2G3/2O5/mK4/2G7/mG6/2O8/mC8/2G+/2W4/2S6/2W8/mS8/2W+/2q6/2m8/2m+/266/228/26//my+/3K7/3K8/3G+/0bA/kbA/0rA/knA/0vC/0zA/0/D/k3C/07E/k7E/1PB/lHA/1DC/lDC/1LE/lLE/1PH/1bA/lXA/1bD/lbC/1XE/lTE/1XG/lbG/1bI/lXI/1nA/1nC/1jF/lrE/1nG/17B/l3A/13C/lzC/1/E/l3E/13G/l7G/1rI/lnI/13I/lzI/1zK/l3K/2LB/mHA/2HC/2HE/2HH/mHG/2TB/mXA/2XC/mXC/2XE/2TG/mXG/2DI/mLI/2HK/2HM/2PO/2bJ/mXI/2bK/mbK/2XM/mXM/2bO/mXO/2rA/mjA/2jC/2nE/mnE/2nG/2zA/23C/2zE/23G/2nI/mnI/2nK/2nM/mnM/2nO/mnO/23I/23K/m3K/2/N/m3M/2zP/m3O/2rQ/2rS/mzQ/m3Q/2zS/m7S/3HA/3HC/3LE/3HG/nHG/3bA/3XC/3XE/3XG/3HI/3HK/nHK/3DN/nDM/3DP/3XI/3XK/3jA/3jD/3jE/3nG/33D/33F/33G/3jI/3vK/33I/3DQ/oDD/4LH/4bG/4DI/4XI/4nI/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwzn70AAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjIx8SBplQAAOw9JREFUeF7tfY9zG1me17G2Lp50QVY6z6jpWmCCtY19MUdBHEyMuTqOCccNLLDAKJKicfXEyjUapddqJLK+rrYsdTm6Ll+y3pZ8TcdWjXFYG+ti+ab2RrHWt0vYXd/sksBtcRwBjvtfmu/3dUtqyZLdkpXM7B2fxOqW7MT66Pve931/ve/7GfPPLP4/9T81YO8nk8ndh/azU/Gnifqib8TrGxkZ8Y54L3jz9ovd8aeGet6L8MEfr/eiDz6EC2eR/1NC/TGy9jMMDX/g0eeDT+CSz/5mF5yb+nft62cKIE7TPiDNsCyLFx+D7C/Q9vc74jzUH/un7LvPFve9fpqmgTX8DXBwCQB9H4MT4L79I53QN/U9Xbph337GeOj1MhEGKHMcx/O3eZ6D+wAHYx8Ef8qE74/68cVS4eH37SefNXCkA23+dlxMinFRjCN5Dkb9KO31+SbtnzqJvqiPmub+t+z7zxz0aCDAcnwciQNSqZQYTwJ7GP0046W99o+dRB/UmZppRn5gPzmJA/rh2tra4+6f9mAh0TjSkfOiJKVS8IUfAEqeZSM0KPqk/YMn0Dv12/AV+UPrvh33J0HhMDD4pFgmqPL8q+d/7Kc5DkZ5SpbkOiRZEuNx4B5gGLBx7J88gV6pcxo8LHeWedKHEhDhk1/M2C9R/NlW1bmA0zzOw+9MEeoqYY6DHgTP8Syouq4jvkfqeyV4qP2e9aQVSS98/jx8+pKsaoauJ6yXN+WL1s0rwQUaPmsR6EqapqrwF6DBO5AkmPgw30HsXr/9s+3ojXr5KT6ukvtW5L0My3OiJEmqrpeHLlIhQKyI36pIXyc/8irgZXgt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"
		This.PicInScript .= "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"

			if ((This.hIcon := This.b64Decode(This.PicInScript))) ; Reqires "HICON:*" for Gui, Add, Picture
			This.vImgType := 1
			else
			{
			; Then try the fallback
			This.imagePath := ""
			This.vImgType := 0
			}
		}
		else
		{
			if (fileExist(This.imagePath))
			{
			spr := This.imagePath

				if (This.vImgType)
				{
					if (This.imagePath == A_AhkPath)
					{
						if (!(This.hIcon := LoadPicture(A_AhkPath, ((vToggle)? "Icon2": "") . spr1, spr)))
						msgbox, 8208, LoadPicture, Problem loading AHK icon!
					}
					else
					{
						if (!(This.hIcon := LoadPicture(spr, spr1, spr))) ; must use 3rd parm or bitmap handle returned!
						msgbox, 8208, LoadPicture, Problem loading icon!
					}
				}
				else
				{
					if (!(This.hBitmap := LoadPicture(spr, spr1)))
					msgbox, 8208, LoadPicture, Problem loading picture!
				}
			}
			else
			This.imagePath := ""
		}
	}
	else
	This.DeleteHandles()


	if (!(This.hBitmap || This.hIcon))
	{
	; Fail, so download
		if (This.ImageName)
		{
		SplitPath % This.imagePath, spr
		This.ImageName := spr
		}

		if (This.imageUrl && RegExMatch(This.imageUrl, "^(https?://|www\.)[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(/\S*)?$"))
		{
			if (!(This.ImageName))
			{
			SplitPath % This.imageUrl, spr
			This.ImageName := spr
			}
			;  check if file D/L'd previously
			for key, value in % This.downloadedUrlNames
			{
				if (This.imageUrl == value)
				{
					if (fileExist(key))
					{
						Try
						{
							if (key != This.ImageName)
							FileCopy, %key%, % This.ImageName
						Break
						}
						Catch e
						{
						msgbox, 8208, FileCopy, % key . " could not be copied with error: " . e
						}
					}
				}
			}


			if (!fileExist(This.ImageName))
			This.DownloadFile(This.imageUrl, This.ImageName)

			if (This.hBitmap := LoadPicture(This.ImageName, spr1))
			{
			This.vImgType := 0
			spr := This.ImageName

			This.downloadedPathNames.Push(spr) 
			This.downloadedUrlNames(spr) := This.imageUrl
			}
			else
			{
			msgbox, 8208, LoadPicture, Format of bitmap not recognized!
			return 0
			}

		}
		else
		spr := 1		
	; "Neverfail" default 

		if (!This.hBitmap)
		{
			if (This.hIcon := LoadPicture(A_AhkPath, ((vToggle)? "Icon2 ": "") . spr1, spr))
			This.vImgType := 1
			else
			{
			msgbox, 8208, LoadPicture, Format of icon/cursor not recognized!
			return 0
			}
		}
	}

	Switch This.vImgType
	{
		case 0:
		{
		VarSetCapacity(bm, ((A_PtrSize == 8)? 32: 24), 0) ;tagBitmap (24: 20) PLUS pointer ref to pBitmap 
		if (!(DllCall("GetObject", "Ptr", This.hBitmap, "uInt", (A_PtrSize == 8)? 32: 24, "Ptr", &bm)))
		msgbox, 8208, GetObject hBitmap, Object could not be retrieved!

		spr := NumGet(bm, 4, "Int")
		spr1 := NumGet(bm, 8, "Int")
		VarSetCapacity(bm, 0)
		}
		case 1, 2:
		{
			if (InStr(This.imagePath, "*"))
			{
			; Just get header info
			spr3 := subStr(This.PicInScript, 1, 100)
			;https://www.autohotkey.com/boards/viewtopic.php?f=6&t=36455&p=168124#p168124

			; CRYPT_STRING_BASE64 := 0x01
				if !DllCall("Crypt32.dll\CryptStringToBinary", "Ptr", &spr3, "UInt", 0, "UInt", 0x01, "Ptr", 0, "UInt*", DecLen, "Ptr", 0, "Ptr", 0)
				Return False
			VarSetCapacity(spr1, 128), VarSetCapacity(spr1, 0), VarSetCapacity(spr1, DecLen, 0)
				If !DllCall("Crypt32.dll\CryptStringToBinary", "Ptr", &spr3, "UInt", 0, "UInt", 0x01, "Ptr", &spr1, "UInt*", DecLen, "Ptr", 0, "Ptr", 0)
				Return False

			FileAppend , , spr.bin
			tmp := FileOpen("spr.bin", "w")
				if (tmp == 0)
				return False
				if (!tmp.RawWrite(&spr1, Declen))
				return False
			tmp.Close
			tmp := FileOpen("spr.bin", "r")
			VarSetCapacity(spr3, 24)
				if (!tmp.RawRead(spr3, 24))
				return False

			tmp.Close
			FileDelete, spr.bin

			spr := This.BinToHex(&spr3 + 16, 4, "0x")
			spr1 := This.BinToHex(&spr3 + 20, 4, "0x")

			spr := This.ToBase(spr, 10)
			spr1 := This.ToBase(spr1, 10)
			}
			else
			{
			; https://www.autohotkey.com/boards/viewtopic.php?t=36733
			; easier way to get icon dimensions is use default SM_CXICON, SM_CYICON
			VarSetCapacity(bm, (A_PtrSize == 8)? 104: 84, 0) ; ICONINFO Structure
				If (DllCall("GetIconInfo", "Ptr", This.hIcon, "Ptr", &bm))
				{
					ICONINFO.hbmColor := NumGet(bm, (A_PtrSize == 8)? 24: 16, "UPtr")
					ICONINFO.hbmMask := NumGet(bm, (A_PtrSize == 8)? 16: 12, "UPtr")

					if (ICONINFO.hbmColor)
					{
					DllCall("GetObject", "Ptr", ICONINFO.hbmColor, "Int", (A_PtrSize == 8)? 104: 84, "Ptr",&bm)
					spr := NumGet(bm, 4, "UInt")
					spr1 := NumGet(bm, 8, "UInt")
					This.deleteObject(ICONINFO.hbmColor)
					}
					else
					{
						if (ICONINFO.hbmMask) ; Colour plane absent
						{
						DllCall("GetObject", "Ptr", ICONINFO.hbmMask, "Int", (A_PtrSize == 8)? 104: 84, "Ptr", &bm)
						spr := NumGet(bm, 4, "UInt")
						spr1 := NumGet(bm, 8, "UInt")
						This.deleteObject(ICONINFO.hbmMask)
						}

					}
				}
				else
				; The fastest way to convert a hBITMAP to hICON is to add it to a hIML and retrieve it back as a hICON with COMCTL32\ImageList_GetIcon()
				msgbox, 8208, GetIconInfo, Icon info could not be retrieved!
			VarSetCapacity(bm, 0)
			}
		}
	}

	This.actualVImgW := spr
	This.actualVImgH := spr1
	return 1
	}

	PaintDC()
	{
	;===============
	static IMAGE_BITMAP := 0, SRCCOPY = 0x00CC0020
	static hBitmapOld := 0
	;draw bitmap/icon onto GUI & call GetDC every paint

	This.hDCWin := DllCall("user32\GetDC", "Ptr", This.hWndSaved, "Ptr")
		Switch This.vImgType
		{
			case 0:
			{
				if (!(hDCCompat := DllCall("gdi32\CreateCompatibleDC", "Ptr", This.hDCWin, "Ptr")))
				msgbox, 8208, Compat DC, DC could not be created!
				if (hBitmapOld := This.selectObject(hDCCompat, This.hBitmap))
				{
				spr := (This.vImgW)? This.vImgW: This.actualVImgW
				spr1 := (This.vImgH)? This.vImgH: This.actualVImgH

					if (This.oldVImgW || This.oldVImgH)
					{
					if (!DllCall("gdi32\StretchBlt", "Ptr", This.hDCWin, "Int", This.vImgX, "Int", This.vImgY, "Int", spr, "Int", spr1, "Ptr", hDCCompat, "Int", 0, "Int", 0, "Int", This.actualVImgW, "Int", This.actualVImgH, "UInt", SRCCOPY))
					msgbox, 8208, PaintDC, BitBlt Failed!
					}
					else
					{
					if (!DllCall("gdi32\BitBlt", "Ptr", This.hDCWin, "Int", This.vImgX, "Int", This.vImgY, "Int", spr, "Int", spr1, "Ptr", hDCCompat, "Int", 0, "Int", 0, "UInt", SRCCOPY))
					msgbox, 8208, PaintDC, BitBlt Failed!
					}
				This.selectObject(hDCCompat, hBitmapOld)

				}
				if (!(DllCall("gdi32\DeleteDC", "Ptr", hDCCompat)))
				msgbox, 8208, Compat DC, DC could not be deleted!

			}
			case 1, 2: ;IMAGE_ICON := 1, IMAGE_CURSOR := 1
			{
			DllCall("user32\DrawIconEx", "Ptr", This.hDCWin, "Int", This.vImgX, "Int", This.vImgY, "Ptr", This.hIcon, "Int", This.vImgW, "Int", This.vImgH, "UInt",0, "Ptr",0, "UInt",0x3) ;DI_NORMAL := 0x3
				/*
				; DllCall("gdi32\DestroyIcon", "Ptr", This.hIcon) fails for AHK executable
				; AHK LoadImage does not use LR_SHARED
				; Consider above only if creating or copying an icon- whereas the following is ignored
				if (!(DllCall("gdi32\DeleteObject", "Ptr", This.hIcon)))
				msgbox, 8208, Icon Handle, Handle could not be deleted!
				*/
			}
		}
		This.releaseDC(This.hWndSaved, This.hDCWin)
	}

	DrawBackground()
	{
		; for custom see  https://docs.microsoft.com/en-us/windows/win32/gdi/drawing-a-custom-window-background
		DllCall("gdi32\ExcludeClipRect", "Ptr", This.hDCWin, "Int", This.vImgX, "Int", This.vImgY, "Int", This.vImgX+This.vImgW, "Int", This.vImgY+This.vImgH)

		;SelectClipRgn not required
		; one pixel region
		hRgn := DllCall("gdi32\CreateRectRgn", "Int", 0, "Int", 0, "Int", 1, "Int", 1, "Ptr")
		; Updates hRgn to define the clipping region in This.hDCWin: turns out to be everything except the margins.
		DllCall("gdi32\GetClipRgn", "Ptr", This.hDCWin, "Ptr", hRgn)
		hBrush := DllCall("user32\GetSysColorBrush", "Int", 15, "Ptr") ;COLOR_BTNFACE := 15
		DllCall("gdi32\FillRgn", "Ptr", This.hDCWin, "Ptr", hRgn, "Ptr", hBrush)
		This.deleteObject(hRgn)
	}	

	Text_height(Text, hWnd)
	{
	FontSize := 0, hDCScreen := 0, outSize := [0, 0]
	;https://www.autohotkey.com/boards/viewtopic.php?f=76&t=9130&p=50713#p50713

	StrReplace(Text, "`r`n", "`r`n", spr1)
	StrReplace(Text, "`n", "`n", spr2)
	spr1 += spr2 + 1

	spr2 := "" ; get longest of multiline
		loop, Parse, Text, `n, `r
		{
		if (StrLen(A_Loopfield)) > StrLen(spr2)
		spr2 := A_Loopfield
		}

	HFONT := DllCall("User32.dll\SendMessage", "Ptr", hWnd, "Int", 0x31, "Ptr", 0, "Ptr", 0) ; WM_GETFONT := 0x31
	hDCScreen := DllCall("user32\GetDC", "Ptr", 0, "Ptr")
		if (HFONT_OLD := This.selectObject(hDCScreen, HFONT))
		{

		VarSetCapacity(FontSize, 8)
		DllCall("GetTextExtentPoint32", "UPtr", hDCScreen, "Str", spr2, "Int", StrLen(spr2), "UPtr", &FontSize)
		outSize[1] := NumGet(FontSize, 0, "UInt")
		DllCall("GetTextExtentPoint32", "UPtr", hDCScreen, "Str", Text, "Int", StrLen(Text), "UPtr", &FontSize)
		outSize[2] := NumGet(FontSize, 4, "UInt") * spr1

		; clean up

		This.selectObject(hDCScreen, HFONT_OLD)
		; If not created, DeleteObject NOT required for This HFONT

		This.releaseDC(0, hDCScreen)
		return outSize
		}
		else
		{
		This.releaseDC(0, hDCScreen)
		return 0
		}
	}

	B64Decode(B64, nBytes := "", W := "", H := "")
	{
	Bin = {}, BLen := 0, hICON := 0  
	Ptr := A_PtrSize ? "Ptr" : "UInt"
	UPtr := A_PtrSize ? "UPtr" : "UInt"

		if !nBytes
		nBytes := ceil(StrLen(StrReplace( B64, "=", "=", e))/4*3) - e

	VarSetCapacity( Bin, nBytes, 0 ), BLen := StrLen(B64)
		If DllCall( "Crypt32.dll\CryptStringToBinary", "Ptr", &B64, "UInt", BLen, "UInt", 0x1
		, "Ptr", &Bin, "UInt*", nBytes, "Int", 0, "Int", 0 )
		hICON := DllCall( "CreateIconFromResourceEx", "Ptr", &Bin, "UInt", nBytes, "Int", True
		, "UInt","0x30000", "Int", W, "Int", H, "UInt", 0, "UPtr" )
	Return hICON
	}

	vMovable
	{
		set
		{
		This._vMovable := value
		}
		get
		{
		return This._vMovable
		}
	}
	hWnd()
	{
		if (!This.hWndSaved)
		{
		DetectHiddenWindows, On
		Gui, Splashy: +HWNDspr
		This.hWndSaved := spr
		DetectHiddenWindows, Off
		}
	return This.hWndSaved
	}

	selectObject(hDC, hgdiobj)
	{
	static HGDI_ERROR := 0xFFFFFFFF

	hRet := DllCall("Gdi32.dll\SelectObject", "Ptr", hDC, "Ptr", hgdiobj, "Ptr")

		if (!hRet || hRet == HGDI_ERROR)
		{
		msgbox, 8208, GDI Object, % "Selection failed `nError code is: " . ((hRet == HGDI_ERROR)? "HGDI_ERROR: ": "Unknown: ") . "The errorLevel is " ErrorLevel ": " . A_LastError
		return 0
		}
		else
		return hRet
	}
	deleteObject(hDC, hgdiobj)
	{
		if !DllCall("Gdi32.dll\DeleteObject", "Ptr", hObject)
		msgbox, 8208, GDI Object, % "Deletion failed `nError code is: " . "ErrorLevel " ErrorLevel ": " . A_LastError
	}
		releaseDC(hWnd, hDC)
	{
		if !DllCall("ReleaseDC", "UPtr", hWnd, "UPtr", hDC)
		msgbox, 8208, Device Context, % "Release failed `nError code is: " . "ErrorLevel " ErrorLevel ": " . A_LastError
	}

	Destroy()
	{
	SetWorkingDir %A_ScriptDir%
		for key, value in % This.downloadedPathNames
		{
			if (FileExist(value))
			FileDelete, % value
		}

	SetWorkingDir % This.userWorkingDir

	if (not This.vImgType)  ; IMAGE_BITMAP (0) or the ImageType parameter was omitted.
	DllCall("DeleteObject", "ptr", This.hBitmap)
	else if (This.vImgType == 1)  ; IMAGE_ICON
	DllCall("DestroyIcon", "ptr", This.hIcon)
	else if (This.vImgType == 2)  ; IMAGE_CURSOR
	DllCall("DestroyCursor", "ptr", This.hIcon)

	This.downloadedPathNames.SetCapacity(0)
	This.downloadedUrlNames.SetCapacity(0)
	This.hWndSaved := 0
	This.mainTextHWnd := 0
	This.subTextHWnd := 0
	This.updateFlag := 0
	Gui, Splashy: Destroy
	This.BindWndProc(1)
	This.SubClassTextCtl(0, 1)

	if (This.pToken)
	DllCall("GdiPlus.dll\GdiplusShutdown", "Ptr", This.pToken)
	if (This.hGDIPLUS)
	DllCall("FreeLibrary", "Ptr", This.hGDIPLUS)

	;This.Delete("", chr(255))
	This.SetCapacity(0)
	This.base := ""
	}

	DeleteHandles()
	{
		if (This.hBitmap)
		{
		DllCall("DeleteObject", "ptr", This.hBitmap)
		This.hBitmap := 0
		}
		else
		{
			if (This.hIcon)
			{
			DllCall("DestroyIcon", "ptr", This.hIcon)
			This.hIcon := 0
			}
		}
	}
	; ##################################################################################
}
;=====================================================================================


















#SingleInstance, force
#NoEnv  ; Performance and compatibility with future AHK releases.
;#Warn, All, OutputDebug ; Enable warnings for a debugger to display to assist with detecting common errors.
;#Warn UseUnsetLocal, OutputDebug  ; Warn when a local variable is used before it's set; send to OutputDebug
#MaxMem 256
#MaxThreads 3
#Persistent
#Include %A_ScriptDir%


AutoTrim, Off ; traditional assignments off
ListLines Off ;A_ListLines default is on: history of lines most recently executed 
SendMode Input  ; Recommended for new scripts due to superior speed & reliability.
SetWinDelay, 40
; ListVars for debugging
SetBatchLines, 25ms ; too fast? A_BatchLines is 10ms

OnMessage(0x201, "WM_LBUTTONDOWN")
gosub, decode

; set function reference
;SplashyRef := ObjBindMethod(Splashy, "SplashImg")
SplashyRef := Splashy.SplashImg
splashPicWd := 250
splashPicHt := 250

gui, Test: +resize -caption -DPIScale HWNDthisHWnd

fnParms := []
ctlTogs := []
ctlTogsOld := []
	loop, 44
	{
	ctlTogs[A_Index] := 0
	ctlTogsOld[A_Index] := 0
	}

Global xSep := A_ScreenWidth/24
Global ySep := A_ScreenHeight/18

gui, Test: add, pic, section x0 y0, % bg

	loop
	{
		loop
		{
		gui, Test: add, pic, x+0 , % bg
		} Until (A_Index * splashPicWd >= 17 * xSep)

	if (A_Index * splashPicHt >= 12 * ySep)
	Break
	gui, Test: add, pic, section xs , % bg
	}

Gui, Test: Font, % "w700 cBlue s" . ySep/2, Verdana
gui, Test: add, text, % "Center" . " w" . 4 * xSep . " h" . ySep * 2 . " x" . 8 * xSep . " y" . ySep/3, Splashy`nSandbox
Gui, Test: Font

spr := "gclick backgroundtrans" 
r:=c:=0, rows:=11, cols:=4
While r++ < rows {
	while c++ < cols{
	gui, Test: add, pic, % spr "  v" c "_" r  
	. (c=1&&r=1    ? " x"xSep/2 " y"2*ySep " section"
	:  c=1&&r>1 ? " xs yp+"ySep 
	: " xp+"5*xSep " yp"), % BTOFF
	} c:=0
} r:=0, c:=0

gui, Test: font, s12 bold

txt:=[	"initSplash"		, "release"			, "imagePath"		, "imageUrl"
,		"bkgdColour"		, "transCol"		, "vHide"			, "noHWndActivate"
,		"vCentre"			, "vMovable"		, "vBorder"			, "vOnTop"
,		"vPosX"				, "vPosY"			, "vMgnX"			, "vMgnY"
,		""					, ""				, "vImgW"			, "vImgH"
,		"mainText"			, "mainBkgdColour"	, ""				, ""
,		"mainFontName"		, "mainFontSize"	, "mainFontWeight"	, "mainFontColour"
,		"mainFontQuality"	, "mainFontItalic"	, "mainFontStrike"	, "mainFontUnderline"
,		"subText"			, "subBkgdColour"	, ""				, ""
,		"subFontName"		, "subFontSize"		, "subFontWeight"	, "subFontColour"
,		"subFontQuality"	, "subFontItalic"	, "subFontStrike"	, "subFontUnderline"]

r:=c:=i:=0, rows:=11, cols:=4
spr := " 0x201 left cgray -border backgroundtrans"
While r++ < rows {
	while c++ < cols { 
	i++
	gui, Test: add, text, % spr " h"ySep " w"3*xSep " v" "t_" c "_" r  
	. (c=1&&r=1 ? " x"5*xSep/2 " y"2*ySep " section"
	:  c=1&&r>1 ? " xs yp+"ySep
	: " xp+"5*xSep " yp"), % txt[i]
	} c:=0
} r:=0, c:=0
Gui, Test: Font, % "w700 cRed s" . ySep/2, Verdana
gui, Test: add, text, % "gLaunchSplashy vlaunchSplashy Center w" . 4 * xSep . " h" . 3 * ySep/2 . " x" . 4 * xSep . " y" . ySep * 13, Click to Launch
gui, Test: add, text, % "gRepaintSplashy vrepaintSplashy Center w" . 4 * xSep . " h" . 3 * ySep/2 . " x" . 10 * xSep . " y" . ySep * 13, Click to Repaint
Gui, Test: Font

GuiControl, Test: Disable, repaintSplashy
GuiControlGet, spr, Test: Hwnd, t_4_11
GuiControlGet, spr, Test: Pos, %spr%

GuiControl, Test: Hide, 1_5
GuiControl, Test: Hide, 2_5
GuiControl, Test: Hide, 3_6
GuiControl, Test: Hide, 4_6
GuiControl, Test: Hide, 3_9
GuiControl, Test: Hide, 4_9
gui, Test: Margin, 0, 0
gui, Test: color, aqua
gui, Test: show, % "W" . sprx + sprw . " H" . spry + ySep * 2 + sprh
return

LaunchSplashy:
vRepaintSplashy := 0
launchStr := {}


	if (ctlTogs[2])
	{
	GuiControl, Test: Disable, repaintSplashy
	GuiControl, Test:, launchSplashy, Click to Launch

	launchStr[txt[2]] := 1
	; reset all controls
		loop, 44 ; number of SplashyTest control fields
		{
			if (ctlTogs[A_Index] || ctlTogsOld[A_Index])
			{
			ctlTogs[A_Index] := 0
			ctlTogsOld[A_Index] := 0
			c := mod(A_Index, 4)
			r := floor(A_Index/4) + (c? 1: 0)
				if (!c)
				c := 4
			spr := c . "_" . r
			GuiControl, Test:, %spr%, %BTOFF%
			GuiControl, Test: movedraw, %spr%, 0
			spr := "t_" . spr
			GuiControl, Test:, %spr%, % txt[A_Index]
			GuiControl, Test: +cgray, %spr%
			}
		}

	}
	else
	{
	GuiControl, Test: Enable, repaintSplashy
	GuiControl, Test:, launchSplashy, Click to Update
		if (ctlTogs[1])
		{
			loop, 44
			{
				if (A_Index == 1)
				{
				spr := "1_1"
				GuiControl, Test:, %spr%, %BTOFF%
				GuiControl, Test: movedraw, %spr%, 0
				spr := "t_" . spr
				GuiControl, Test:, %spr%, % txt[1]
				GuiControl, Test:+cgray, %spr%
				}
				else
				{
					if (ctlTogsOld[A_Index])
					{
						if (ctlTogs[A_Index] == 2)
						ctlTogs[A_Index] := 1
						else
						{
						c := mod(A_Index, 4)
						r := floor(A_Index/4) + (c? 1: 0)
							if (!c)
							c := 4
						spr := c . "_" . r
						GuiControl, Test:, %spr%, %BTOFF%
						GuiControl, Test: movedraw, %spr%, 0
						spr := "t_" . spr
						GuiControl, Test:, %spr%, % txt[A_Index]
						GuiControl, Test: +cgray, %spr%
						ctlTogsOld[A_Index] := 0
						ctlTogs[A_Index] := 0
						}
					}
					else
					{
						if (ctlTogs[A_Index])
						ctlTogsOld[A_Index] := 1
					}
				}
			}
		ctlTogs[1] := 0
		launchStr[txt[1]] := 1
		}
		else
		{
			loop, 44 ; number of Splashy control variables
			{
				if (ctlTogsold[A_Index] && (ctlTogs[A_Index] == 1))
				{
				c := mod(A_Index, 4)
				r := floor(A_Index/4) + (c? 1: 0)
					if (!c)
					c := 4
				spr := c . "_" . r
				GuiControl, Test:, %spr%, %BTONSAV%
				}
			}
		}

		loop, 44
		{
			if (ctlTogs[A_Index])
			{
				switch A_Index
				{
					case 1:
					Continue
					case 3, 4, 21, 33:
					{
					launchStr[txt[A_Index]] := fnParms[txt[A_Index]]
					ctlTogs[A_Index] := 1
						if (fnParms[txt[A_Index]] == "")
						ctlTogsOld[A_Index] := 0
						else
						ctlTogsOld[A_Index] := 1
					}
					Default:
					{
					launchStr[txt[A_Index]] := fnParms[txt[A_Index]]
					ctlTogs[A_Index] := 1
						if (fnParms[txt[A_Index]])
						ctlTogsOld[A_Index] := 1
						else
						ctlTogsOld[A_Index] := 0
					}
				}
			}
		}
	}

%SplashyRef%(Splashy, launchStr*)

return
RepaintSplashy:
Gui Test: +OwnDialogs
vRepaintSplashy := 1
	if (!(Splashy.vHide))
	{
	; Possible use for compilations or Splashy in separate script
	WinGet, spr, ID, A
	WinGetClass, vWinClass, % "ahk_id " spr
		if (vWinClass != "AutoHotkeyGUI")
		return
	; This probably posts a WM_PAINT- will we get there first?
		if (!(Splashy.vOnTop))
		{
		WinSet, AlwaysOnTop, 1, % "ahk_id" . Splashy.hWndSaved
		WinSet, AlwaysOnTop, 0, % "ahk_id" . Splashy.hWndSaved
		}
	Splashy.PaintProc()
	}
return

Testguiclose:
DetectHiddenWindows, On
#if winactive("ahk_class #32770") and (winactive("Please enter") || winactive("Colour") || winactive("Open an Image"))
esc::
WinGet, spr, Id, A
WinClose, ahk_ID %spr%
WinActivate ahk_id %thisHWnd%
DetectHiddenWindows, Off
return
#ifWinActive
#if winActive("ahk_class AutoHotkeyGUI") and (winactive("AHK Fonts") || winactive("Image Source"))
esc::
gui, FontDlg: destroy
gui, ImageSourceDlg: destroy
WinActivate ahk_id %thisHWnd%
WinSet, Enable, , ahk_id %thisHWnd%
DetectHiddenWindows, Off
return
#ifWinActive
esc::
exit()
return


click:
Gui Test: +OwnDialogs

out := A_Guicontrol

%out% := !%out% ? 1 : 0
c := Substr(out, 1, 1)
r := Substr(out, 3, 2)
i := c + 4 * (r - 1)
	switch i
	{
	case 3, 13, 14, 21, 25, 33, 37:
	{
		if (%out%)
		{
		spr := InputProc(thisHWnd, i, txt[i], 1)
			if (spr == "**Errorlevel**")
			%out% := 0
			else
			{
			fnParms[txt[i]] := spr
			ctlTogs[i] := 2
			}
		}
		else
		{
		GuiControlGet, spr, Test:, % "t_" A_Guicontrol
			if (spr == "Removed")
			{
			GuiControl, Test:, % "t_" A_Guicontrol, % txt[i]
			fnParms[txt[i]] := ""
			ctlTogs[i] := 2
			}
			else
			{
			fnParms.delete(txt[i])
			GuiControl, Test:, % "t_" A_Guicontrol, Removed
			ctlTogs[i] := 0
			%out% := 1
			}
		}		
	}
	case 2, 4, 26, 27, 38, 39:
	{
		if (%out%)
		{
			spr := InputProc(thisHWnd, i, txt[i])
			if (spr == "**Errorlevel**" || !spr)
			%out% := 0
			else
			fnParms[txt[i]] := spr
		ctlTogs[i] := 2
		}
		else
		{
		GuiControlGet, spr, Test:, % "t_" A_Guicontrol
			if (spr == "Removed")
			{
			GuiControl, Test:, % "t_" A_Guicontrol, % txt[i]
			fnParms[txt[i]] := 0
			ctlTogs[i] := 2
			}
			else
			{
			fnParms.delete(txt[i])
			GuiControl, Test:, % "t_" A_Guicontrol, Removed
			ctlTogs[i] := 0
			%out% := 1
			}
		}
	}

	Default:
	{
		if (%out%)
		{
		spr := InputProc(thisHWnd, i, txt[i], 1)
			if (spr == "**Errorlevel**" || spr == "")
			{
			%out% := 0
			ctlTogs[i] := 0
			}
			else
			{
			fnParms[txt[i]] := spr
			ctlTogs[i] := 2
			}
		}
		else
		{
		GuiControlGet, spr, Test:, % "t_" A_Guicontrol
			if (spr == "Removed")
			{
			GuiControl, Test:, % "t_" A_Guicontrol, % txt[i]
			fnParms[txt[i]] := 0
			ctlTogs[i] := 2
			}
			else
			{
			fnParms.delete(txt[i])
			GuiControl, Test:, % "t_" A_Guicontrol, Removed
			ctlTogs[i] := 0
			%out% := 1
			}
		}
	}
	}

if (!ctlTogs[i] && %out%)
GuiControl, Test:, %A_Guicontrol%, %BTONSAV%
else
GuiControl, Test:, %A_Guicontrol%, % %out% ? BTON : BTOFF

GuiControl, Test:, % (%out%) ? "+clime" : "+cgray", % "t_" A_Guicontrol
GuiControl, Test: MoveDraw, % "t_" A_Guicontrol, 0
return



; https://www.autohotkey.com/boards/viewtopic.php?f=6&t=36636
; HICON may not be square, but AHK "tiles" them as if they were.
Decode:
bg := "iVBORw0KGgoAAAANSUhEUgAAAPoAAAEACAMAAACtTJvEAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMAUExURQAAAEO5/0G7/0G8/kG8/0K+/0e5/ka4/0a6/0W9/kS8/0W+/0q3/0y2/k62/0m4/0u6/km6/0q8/0m//ki+/024/026/ky6/028/0++/k6+/1O0/1K2/1ay/1W1/lS0/1S2/1K4/1O6/lG6/1C8/1G+/lG+/1W5/lW4/1W6/1S9/lW8/1S+/1i0/1m2/12y/121/163/l22/1i4/1q6/1m8/1q+/lm+/124/1y6/128/12//l6+/2O0/2G3/2O5/mK4/2G7/mG6/2O8/mC8/2G+/2W4/2S6/2W8/mS8/2W+/2q6/2m8/2m+/266/228/26//my+/3K7/3K8/3G+/0bA/kbA/0rA/knA/0vC/0zA/0/D/k3C/07E/k7E/1PB/lHA/1DC/lDC/1LE/lLE/1PH/1bA/lXA/1bD/lbC/1XE/lTE/1XG/lbG/1bI/lXI/1nA/1nC/1jF/lrE/1nG/17B/l3A/13C/lzC/1/E/l3E/13G/l7G/1rI/lnI/13I/lzI/1zK/l3K/2LB/mHA/2HC/2HE/2HH/mHG/2TB/mXA/2XC/mXC/2XE/2TG/mXG/2DI/mLI/2HK/2HM/2PO/2bJ/mXI/2bK/mbK/2XM/mXM/2bO/mXO/2rA/mjA/2jC/2nE/mnE/2nG/2zA/23C/2zE/23G/2nI/mnI/2nK/2nM/mnM/2nO/mnO/23I/23K/m3K/2/N/m3M/2zP/m3O/2rQ/2rS/mzQ/m3Q/2zS/m7S/3HA/3HC/3LE/3HG/nHG/3bA/3XC/3XE/3XG/3HI/3HK/nHK/3DN/nDM/3DP/3XI/3XK/3jA/3jD/3jE/3nG/33D/33F/33G/3jI/3vK/33I/3DQ/oDD/4LH/4bG/4DI/4XI/4nI/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwzn70AAAEAdFJOU////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wBT9wclAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjIx8SBplQAAOw9JREFUeF7tfY9zG1me17G2Lp50QVY6z6jpWmCCtY19MUdBHEyMuTqOCccNLLDAKJKicfXEyjUapddqJLK+rrYsdTm6Ll+y3pZ8TcdWjXFYG+ti+ab2RrHWt0vYXd/sksBtcRwBjvtfmu/3dUtqyZLdkpXM7B2fxOqW7MT66Pve931/ve/7GfPPLP4/9T81YO8nk8ndh/azU/Gnifqib8TrGxkZ8Y54L3jz9ovd8aeGet6L8MEfr/eiDz6EC2eR/1NC/TGy9jMMDX/g0eeDT+CSz/5mF5yb+nft62cKIE7TPiDNsCyLFx+D7C/Q9vc74jzUH/un7LvPFve9fpqmgTX8DXBwCQB9H4MT4L79I53QN/U9Xbph337GeOj1MhEGKHMcx/O3eZ6D+wAHYx8Ef8qE74/68cVS4eH37SefNXCkA23+dlxMinFRjCN5Dkb9KO31+SbtnzqJvqiPmub+t+z7zxz0aCDAcnwciQNSqZQYTwJ7GP0046W99o+dRB/UmZppRn5gPzmJA/rh2tra4+6f9mAh0TjSkfOiJKVS8IUfAEqeZSM0KPqk/YMn0Dv12/AV+UPrvh33J0HhMDD4pFgmqPL8q+d/7Kc5DkZ5SpbkOiRZEuNx4B5gGLBx7J88gV6pcxo8LHeWedKHEhDhk1/M2C9R/NlW1bmA0zzOw+9MEeoqYY6DHgTP8Syouq4jvkfqeyV4qP2e9aQVSS98/jx8+pKsaoauJ6yXN+WL1s0rwQUaPmsR6EqapqrwF6DBO5AkmPgw30HsXr/9s+3ojXr5KT6ukvtW5L0My3OiJEmqrpeHLlIhQKyI36pIXyc/8irgZXgt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"
bg .= "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"

BTOFF :="HICON:*" Splashy.b64Decode("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")
BTON :="HICON:*" Splashy.b64Decode("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")
BTONSAV :="HICON:*" Splashy.b64Decode("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")

bg:="HICON:*" Splashy.b64Decode(bg)
return



WM_LBUTTONDOWN()
{
Global
WinGet, spr, ID, A
	if (spr == thisHWnd)
	{
		if (vRepaintSplashy)
		{
		WinSet, AlwaysOnTop, 1, % "ahk_id" . thisHWnd
		WinSet, AlwaysOnTop, 0, % "ahk_id" . thisHWnd
		vRepaintSplashy := 0
		return
		}
	}
	else
	return

	if (WinExist(, Splashy Sandbox))
	{
	MouseGetPos, xpos, ypos 

		(A_Gui) && (xpos<3*xSep || ypos<3*ySep) && move()

		(A_Gui) && (xpos<xSep/3 || ypos<ySep/2) && exit()
	}
}
move()
{ 
	PostMessage, 0xA1, 2 ; WM_NCLBUTTONDOWN
}
exit()
{
	Global
	%SplashyRef%(Splashy, {release: 1}*)
	exitapp	
}

ProcFonts(thisHWnd)
{
	;https://autohotkey.com/board/topic/72109-ahk-fonts/
	; gui variables in function must be global
	Global GuiFontDlg_fontType, fontSizeUD, inputText, outputText
	static thisFont, recFontList, fontList, recFontCount, fontCount, acceptDlg := 0, recFontTog := 0
	recFontList =
	(
	Aharoni|Andalus|Angsana New|AngsanaUPC|Arial|Arial Black|Batang|Comic Sans MS|Cordia New|CordiaUPC|Courier|Courier New|David|DFKai-SB|DilleniaUPC|Estrangelo Edessa|EucrosiaUPC|Fixedsys|Franklin Gothic Medium|FrankRuehl|FreesiaUPC|Gautami|Georgia|Gulim|Impact|IrisUPC|JasmineUPC|KaiTi|Kartika|KodchiangUPC|Latha|Levenim MT|LilyUPC|Lucida Console|Lucida Sans|Lucida Sans Unicode|Mangal|Microsoft Sans Serif|Miriam|Miriam Fixed|Modern|MS Gothic|MS Mincho|MS Sans Serif|MS Serif|Mv Boli|Narkisim|Palatino Linotype|PMingLiU|Raavi|Rod|Roman|Script|Shruti|SimHei|Simplified Arabic|Simplified Arabic Fixed|SimSun|Small Fonts|Sylfaen|System|Tahoma|Terminal|Times New Roman|Traditional Arabic|Trebuchet MS|Tunga|Verdana|Vrinda
	)
	fontList =
	(
	Abadi MT Condensed Light|Aharoni|Andalus|Angsana New|AngsanaUPC|Arial|Arial Alternative Regular|Arial Alternative Symbol|Arial Black|Arial Bold|Arial Bold Italic|Arial Italic|Arial Nova|Book Antiqua|Batang|Browallia New|BrowalliaUPC|Calibri|Calibri Light|Cambria|Cambria Math|Candara|Calisto MT|Century Gothic|Century Gothic Bold|Century Gothic Bold Italic|Century Gothic Italic|Comic Sans MS|Comic Sans MS Bold|Consolas|Constantia|Copperplate Gothic Bold|Copperplate Gothic Light|Corbel|Cordia New|CordiaUPC|Courier|Courier New|Courier New Bold|Courier New Bold Italic|Courier New Italic|DaunPenh|David|DFKai-SB|DilleniaUPC|Estrangelo Edessa|EucrosiaUPC|Fixedsys|Franklin Gothic Medium|Franklin Gothic Medium Italic|FrankRuehl|FreesiaUPC|Gabriola|Gadugi|Gautami|Georgia|Georgia Bold|Georgia Bold Italic|Georgia Italic|Georgia Italic Impact|Georgia Pro|Gill Sans Nova|Gulim|HoloLens MDL2 Assets|Impact|IrisUPC|Iskoola Pota|JasmineUPC|KaiTi|Kalinga|Kartika|Khmer UI|KodchiangUPC|Kokila|Lao UI|Latha|Levenim MT|LilyUPC|Lucida Console|Lucida Handwriting Italic|Lucida Sans|Lucida Sans Italic|Lucida Sans Unicode|Mangal|Marlett|Matisse ITC|Microsoft Himalaya|Microsoft New Tai Lue|Microsoft PhagsPa|Microsoft Sans Serif|Microsoft Tai Le|Microsoft Uighur|Microsoft Yi Baiti|Miriam|Miriam Fixed|Modern|Modern MS Sans Serif|Mongolian Baiti|MoolBoran|MS Gothic|MS Mincho|MS Sans Serif|MS Serif|Mv Boli|Myanmar Text|Narkisim|Neue Haas Grotesk Text Pro|News Gothic MT|News Gothic MT Bold|News Gothic MT Italic|OCR A Extended|Palatino Linotype|Palatino Linotype Bold|Palatino Linotype Bold Italic|Palatino Linotype Italic|Plantagenet Cherokee|PMingLiU|Raavi|Rockwell Nova|Rod|Roman|Sanskrit Text|Script|Segoe MDL2 Assets|Segoe Print|Segoe Script|Segoe UI|Segoe UI Emoji|Segoe UI Historic|Segoe UI Light|Segoe UI Semibold|Segoe UI Semilight|Segoe UI Symbol|Shruti|SimHei|Simplified Arabic|Simplified Arabic Fixed|SimSun|Sitka Banner|Sitka Display|Sitka Heading|Sitka Small|Sitka Subheading|Sitka Text|Small Fonts|Smallfonts|Sylfaen|Symbol|System|Tahoma|Tahoma Bold|Tempus Sans ITC|Terminal|Times New Roman|Times New Roman Bold|Times New Roman Bold Italic|Times New Roman Italic|Traditional Arabic|Trebuchet|Trebuchet Bold|Trebuchet Bold Italic|Trebuchet Italic|Trebuchet MS|Trebuchet MS Bold|Trebuchet MS Bold Italic|Trebuchet MS Italic|Tunga|UD Digi Kyokasho N-B|Utsaah|Vani|Verdana|Verdana Bold|Verdana Bold Italic|Verdana Italic|Verdana Pro|Vijaya|Vrinda|Webdings|Westminster|Wingdings|WST_Czech|WST_Engl|WST_Fren|WST_Germ|WST_Ital|WST_Span|WST_Swed|Yu Gothic
	)
		if (!fontCount)
		{
			loop, parse, fontList, |
			fontCount := a_index
			loop, parse, recFontList, |
			recFontCount := a_index
		}

	gui, FontDlg: +owner%thisHWnd% +resize -MaximizeBox -MinimizeBox HWNDhWndFontDlg
	gui, FontDlg: add, ddl, % "section gGuiFontDlgSelectFont vGuiFontDlg_fontType w" . xSep*5, % fontList
	gui, FontDlg: add, Checkbox, ys gGuiFontDlgRecommended, AHK_Recommended
	; illegal character when evaluating "AHK`nRecommended" or "AHK Recommended"
	gui, FontDlg: add, edit, ys w%xSep%
	gui, FontDlg: add, updown, gGuiFontDlgFontSizeUD vfontSizeUD, 15
	gui, FontDlg: add, button, ys gGuiFontDlgAccept, Accept
	gui, FontDlg: add, edit, % "xm center gGuiFontDlginputText vinputText w" . xSep*8, The quick brown fox jumps over the lazy dog.
	gui, FontDlg: font, s15
	gui, FontDlg: add, text, % "0x1000 center voutputText w" . xSep*10 . "h" . ySep, The quick brown fox jumps over the lazy dog.

	WinSet, Disable, , ahk_id %thisHWnd%
	gui, FontDlg: show,, AHK Fonts
	guicontrol, FontDlg: chooseString, GuiFontDlg_fontType, Verdana
	gosub GuiFontDlgSelectFont
	WinWaitActive, ahk_id %thisHWnd%

		if (acceptDlg)
		return thisFont
		else
		return 0

	FontDlgGuiClose:
	acceptDlg := 0
	gui, FontDlg: Destroy
	; problem with WinWaitClose next invocation when instead of destroyed, FontDlg is hidden
	WinActivate ahk_id %thisHWnd%
	WinSet, Enable, , ahk_id %thisHWnd%

	return 0

	GuiFontDlgAccept:
	acceptDlg := 1
	GuiControlGet thisFont, FontDlg:, GuiFontDlg_fontType
	gui, FontDlg: Destroy
	WinActivate ahk_id %thisHWnd%
	WinSet, Enable, , ahk_id %thisHWnd%
	return thisFont

	FontDlgGuiSize:

	if (a_eventinfo != 0)
	return
	wingetpos, winX, winY, winW, winH, A

	guicontrol, FontDlg: movedraw, OutputText, % "W" . winW-xSep . "H" . winH-ySep
	return

	GuiFontDlgFontSizeUD:
	gui, FontDlg: submit, nohide
	gui, FontDlg: font, s%fontSizeUD%
	guicontrol, FontDlg: font, outputText
	return

	GuiFontDlginputText:
	gui, FontDlg: submit, nohide
	guicontrol, FontDlg:, outputText, % inputText
	return

	GuiFontDlgSelectFont:
	gui, FontDlg: submit, nohide
		loop, parse, fontList, |
		{
		if (a_loopfield != GuiFontDlg_fontType)
		continue
		thisFont := a_loopfield
		gui, FontDlg: font, s%fontSizeUD%, %thisFont%
		guicontrol, FontDlg: font, OutputText
		guicontrol, FontDlg: movedraw, OutputText

		break
		}
	return

	GuiFontDlgRecommended:
	gui, FontDlg: submit, nohide
	recFontTog := A_GuiControl
	%recFontTog% := !%recFontTog% ? 1 : 0
	gui, FontDlg: font, s15
	guicontrol, FontDlg:, fontSizeUD,  15
		if (%recFontTog%)
		{
		guicontrol, FontDlg:, GuiFontDlg_fontType, % "|" recFontList
		guicontrol, FontDlg: chooseString, GuiFontDlg_fontType, Verdana
		}
		else
		{
		guicontrol, FontDlg:, GuiFontDlg_fontType, % "|" fontList
		guicontrol, FontDlg: chooseString, GuiFontDlg_fontType, Verdana
		}
	gosub GuiFontDlgSelectFont
	return
}
ImageSourceProc(thisHWnd)
{
	;https://autohotkey.com/board/topic/72109-ahk-fonts/
	; gui variables in function must be global
	Global GuiImageSourceDlgInternalImage, GuiImageSourceDlgImageRet, outputText
	static imgRet, acceptDlg := 0, recFontTog := 0

	gui, ImageSourceDlg: +owner%thisHWnd% +resize -MaximizeBox -MinimizeBox HWNDhWndImageSourceDlg
	gui, ImageSourceDlg: add, button, section gGuiImageSourceDlgInternalImage vGuiImageSourceDlgInternalImage, Embedded Image
	gui, ImageSourceDlg: add, button, ys gGuiImageSourceDlgImagePath, ImagePath
	gui, ImageSourceDlg: add, button, ys gGuiImageSourceDlgAccept, Accept
	gui, ImageSourceDlg: add, edit, ys vGuiImageSourceDlgImageRet vGuiImageSourceDlgImageRet w%xSep%

	WinSet, Disable, , ahk_id %thisHWnd%
	gui, ImageSourceDlg: show,, Image Source


	WinWaitActive, ahk_id %thisHWnd%

		if (acceptDlg)
		return imgRet
		else
		return 0

	ImageSourceDlgGuiClose:
	acceptDlg := 0
	gui, ImageSourceDlg: Destroy
	; problem with WinWaitClose next invocation when instead of destroyed, ImageSourceDlg is hidden
	WinActivate ahk_id %thisHWnd%
	WinSet, Enable, , ahk_id %thisHWnd%

	return 0

	GuiImageSourceDlgAccept:
	acceptDlg := 1
	GuiControlGet imgRet, ImageSourceDlg:, GuiImageSourceDlgImageRet
	gui, ImageSourceDlg: Destroy
	WinActivate ahk_id %thisHWnd%
	WinSet, Enable, , ahk_id %thisHWnd%
	return imgRet

	GuiImageSourceDlgInternalImage:
	gui, ImageSourceDlg: submit, nohide
	GuiControl, ImageSourceDlg:, GuiImageSourceDlgImageRet, *
	return

	GuiImageSourceDlgImagePath:
	gui, ImageSourceDlg: submit, nohide
		FileSelectFile, imgRet, , %A_ScriptDir%, Open an Image
		if (!ErrorLevel)
		GuiControl, ImageSourceDlg:, GuiImageSourceDlgImageRet, %imgRet%
	return
}

InputProc(thisHWnd, i, textIn, allowZero := 0)
{
Static Colors := [0x00FF00, 0xFF0000, 0xFF00FF]
	switch i
	{
		case 1, 2, 6, 7, 8, 9, 10, 12, 30, 31, 32, 42, 43, 44:
		return 1
		case 5, 22, 28, 34, 40:
		{
		spr := ChooseColor(0x80FF, thisHWnd, , , Colors*)
			if (spr == "")
			return
			else
			{
				GuiControl, Test:, % "t_" A_Guicontrol, %spr%
				return spr
			}
		}
		case 25, 37:
		{
			if (spr := ProcFonts(thisHWnd))
			{
			GuiControl, Test:, % "t_" A_Guicontrol, %spr%
			return spr
			}
			else
			return "**Errorlevel**"
		}
		case 3:
		{
			if (!(textIn := ImageSourceProc(thisHWnd)))
			return "**Errorlevel**"
		}
		case 11:
		{
		InputBox, textIn, Please enter %textIn%,If zero`, No border`, else any combo of extended styles `n`"w`" (WS_EX_WINDOWEDGE)`, `"s`" (WS_EX_STATICEDGE)`,`n`"c`"` (WS_EX_CLIENTEDGE)`, `"d`" (WS_EX_DLGMODALFRAME)`nor for standard styles a `"b`" for a thin border`, else`,`nany other value not mentioned`, WS_DLGFRAME.
			if (textIn == "" || Errorlevel)
			return "**Errorlevel**"
		}
		case 4:
		{
		InputBox, textIn, Please enter %textIn%
			if (textIn == "" || Errorlevel)
			return "**Errorlevel**"
		}
		case 13, 14:
		{
		InputBox, textIn, Please enter %textIn%,Left`, top`, screen co-ordinates for Splashy.`n`nIgnored if vCentre is set`, if vCentre is not set`,`na null value `(`"`"`) applied to either value`nwill centre Splashy on the appropriate axis.
			if (Errorlevel)
			return "**Errorlevel**"
		}
		case 15, 16:
		{
		InputBox, textIn, Please enter %textIn%, Horizontal and vertical margins. "D" for defaults.
			if (textIn == "" || Errorlevel)
			return "**Errorlevel**"
		}
		case 19, 20:
		{
		InputBox, textIn, Please enter %textIn%, Width and height for Splashy.`n`nIf zero or negative`, image dimensions assumed`, else`,`nif less than one`, proportionate of screen width/height.
			if (textIn == "" || Errorlevel)
			return "**Errorlevel**"
		}
		case 21, 33:
		{
		InputBox, textIn, Please enter %textIn%
			if (Errorlevel)
			return "**Errorlevel**"
		}
		case 26, 38:
		{
		InputBox, textIn, Please enter %textIn%.,The font size is a positive integer`, usually under 200.
			if (textIn == "" || Errorlevel)
			return "**Errorlevel**"
		}
		case 27, 39:
		{
		InputBox, textIn, Please enter %textIn%.,The font weight is an integer between 1 and 1000.`nFor example`, 400 is normal and 700 is bold.
			if (textIn == "" || Errorlevel)
			return "**Errorlevel**"
		}
		case 29, 41:
		{
		InputBox, textIn, Please enter %textIn%.,FontQuality is either 0`, 1`, 2`, 3`, 4 or 5. Refer docs for details.
			if (textIn == "" || Errorlevel)
			return "**Errorlevel**"
		}
		Default:
		{
		InputBox, textIn, Please enter %textIn%
			if (Errorlevel)
			{
			return ""
			}
		}
	}

	; AutoTrim On by default
	spr := StrReplace(textIn, A_Space, "")
		if (spr == "")
		{
		GuiControl, Test:, % "t_" A_Guicontrol
		return spr
		}

		Loop
		{
		spr := StrReplace(textIn, "`r`n`r`n", "`r`n", ct)
			if (!ct)	; No more replacements needed.
			break
		}

		if (allowZero)
		{
			if (spr != "")
			GuiControl, Test:, % "t_" A_Guicontrol, %spr%
		return spr
		}
		else
		{
			if (spr)
			{
			GuiControl, Test:, % "t_" A_Guicontrol, %spr%
			return spr
			}
		}
		return 0

}


/*!
	Function: rbrtryn's ChooseColor([pRGB, hOwner, DlgX, DlgY, Palette])
	https://autohotkey.com/board/topic/91229-windows-color-picker-plus/
		Displays a standard Windows dialog for choosing colors.

	Parameters:
		pRGB - The initial color to display in the dialog in RGB format.
		The default setting is Black.
		hOwner - The Window ID of the dialog's owner, if it has one. Defaults to
		0, i.e. no owner. If specified DlgX and DlgY are ignored.
		DlgX, DlgY - The X and Y coordinates of the upper left corner of the 
		dialog. Both default to 0.
		Palette - An array of up to 16 RGB color values. These become the 
		initial custom colors in the dialog.

	Remarks:
		The custom colors in the dialog are remembered between calls.

		If the user selects OK, the Palette array (if it exists) will be loaded 
		with the custom colors from the dialog. 

	Returns:
		If the user selects OK, the selected color is returned in RGB format 
		and ErrorLevel is set to 0. Otherwise, the original pRGB value is 
		returned and ErrorLevel is set to 1.
*/
ChooseColor(pRGB := 0, hOwner := 0, DlgX := 0, DlgY := 0, Palette*)
{
	static CustColors    ; Custom colors are remembered between calls
	static SizeOfCustColors := VarSetCapacity(CustColors, 64, 0)
	static StructSize := VarSetCapacity(ChooseColor, 9 * A_PtrSize, 0)

	CustData := (DlgX << 16) | DlgY    ; Store X in high word, Y in the low word

	;___Load user's custom colors
		for Index, Value in Palette
		NumPut(BGR2RGB(Value), CustColors, (Index - 1) * 4, "UInt")

	;___Set up a ChooseColor structure as described in the MSDN
	NumPut(StructSize, ChooseColor, 0, "UInt")
	NumPut(hOwner, ChooseColor, A_PtrSize, "UPtr")
	NumPut(BGR2RGB(pRGB), ChooseColor, 3 * A_PtrSize, "UInt")
	NumPut(&CustColors, ChooseColor, 4 * A_PtrSize, "UPtr")
	NumPut(0x113, ChooseColor, 5 * A_PtrSize, "UInt")
	NumPut(CustData, ChooseColor, 6 * A_PtrSize, "UInt")
	NumPut(RegisterCallback("ColorWindowProc"), ChooseColor, 7 * A_PtrSize, "UPtr")

	;___Call the function
	ErrorLevel := ! DllCall("comdlg32\ChooseColor", "UPtr", &ChooseColor, "UInt")

	;___Save the changes made to the custom colors
    if ErrorLevel
	return
	else
	{
		Loop 16
		Palette[A_Index] := BGR2RGB(NumGet(CustColors, (A_Index - 1) * 4, "UInt"))
	
	return BGR2RGB(NumGet(ChooseColor, 3 * A_PtrSize, "UINT"))
	}
}

/*!
    Function: ColorWindowProc(hwnd, msg, wParam, lParam)
        Callback function used to modify the Color dialog before it is displayed

    Parameters:
        hwnd - Handle to the Color dialog window.
        msg - The message sent to the window.
        wParam - The handle to the control that has the keyboard focus.
        lParam - A pointer to the ChooseColor structure associated with the 
                 Color dialog.

    Remarks:
        This is intended to be a private function, called only by ChooseColor. 
        In response to a WM_INITDIALOG message, this function can be used to 
        modify the Color dialog before it is displayed. Currently it just moves 
        the window to a new X, Y location.

    Returns:
        If the hook procedure returns zero, the default dialog box procedure 
        also processes the message. Otherwise, the default dialog box procedure 
        ignores the message.
*/
ColorWindowProc(hwnd, msg, wParam, lParam)
{
	static WM_INITDIALOG := 0x0110

		if (msg <> WM_INITDIALOG)
		return 0

	hOwner := NumGet(lParam+0, A_PtrSize, "UPtr")
		if (hOwner)
		return 0

	DetectSetting := A_DetectHiddenWindows
	DetectHiddenWindows On
	CustData := NumGet(lParam+0, 6 * A_PtrSize, "UInt")
	DlgX := CustData >> 16, DlgY := CustData & 0xFFFF
	WinMove ahk_id %hwnd%, , %DlgX%, %DlgY%

	DetectHiddenWindows %DetectSetting%
	return 0
}

/*!
    Function: BGR2RGB(Color)
        Converts a BGR color value to a RGB one or vice versa.

    Parameters:
        Color - The BGR or RGB value to convert

    Returns:
        The converted value.
*/
BGR2RGB(Color)
{
	return  (Color & 0xFF000000) 
	| ((Color & 0xFF0000) >> 16) 
	|  (Color & 0x00FF00) 
	| ((Color & 0x0000FF) << 16)
}


GuiGetSize(thisHWnd, ByRef W, ByRef H)
{
	VarSetCapacity(rect, 16, 0)
	;DllCall("GetWindowRect", "Ptr", thisHWnd, "Ptr", &rect)
	DllCall("GetClientRect", "Ptr", thisHWnd, "Ptr", &rect)
	tmp := NumGet(rect, 4, "int")
	H := NumGet(rect, 12, "int")
	H := H - tmp
	tmp := NumGet(rect, 0, "int")
	W := NumGet(rect, 8, "int")
	W := W - tmp
}