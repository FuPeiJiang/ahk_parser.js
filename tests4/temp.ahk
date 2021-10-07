DllCall("gdiplus\GdipDrawString"					, Ptr, pGraphics					, Ptr, A_IsUnicode ? &sString : &wString					, Ptr, A_IsUnicode ? &sString : &wString)

DllCall("gdiplus\GdipDrawString"
					, Ptr, pGraphics
					, Ptr, A_IsUnicode ? &sString : &wString
					, Ptr, A_IsUnicode ? &sString : &wString)

DllCall("gdiplus\GdipDrawString"
					, Ptr, pGraphics
					, Ptr, A_IsUnicode ? &sString : &wString
					, Ptr, A_IsUnicode ? &sString : &wString
          ,ptr)