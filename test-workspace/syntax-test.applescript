-- Test file for syntax highlighting
tell application "Finder"
    -- Line comment test
    (* Block comment test *)
    
    set testVar to true
    
    if testVar then
        display dialog "Hello World!"
    end if
    
    repeat 3 times
        log "Testing..."
    end repeat
end tell 