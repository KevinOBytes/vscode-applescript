-- Test basic syntax
tell application "Finder"
    -- Test comment highlighting
    display dialog "Hello World" (* block comment *)
    
    set testVar to true
    
    if testVar then
        beep
    end if
    
    repeat 3 times
        log "Testing..."
    end repeat
end tell 