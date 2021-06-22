else DllCall("SetThreadDpiAwarenessContext", "ptr", -3, "ptr")  ; old (no change needed)
try DllCall("SetThreadDpiAwarenessContext", "ptr", -3, "ptr")  ; old (no change needed)
finally DllCall("SetThreadDpiAwarenessContext", "ptr", -3, "ptr")  ; old (no change needed)