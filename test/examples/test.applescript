-- Comprehensive AppleScript Test File
-- This file tests various AppleScript language features

-- Property declaration
property testProperty : "Hello World"

-- Basic tell block with Finder
tell application "Finder"
    -- Test comment highlighting and dialog
    display dialog "Testing AppleScript Extension" (* block comment test *)
    
    -- Variable assignment  
    set testVar to true
    set numberVar to 42
    set stringVar to "Test string with \"quotes\""
    
    -- Conditional statements
    if testVar then
        beep 1
        log "Variable is true"
    else
        log "Variable is false"
    end if
    
    -- Loop structures
    repeat 3 times
        log "Loop iteration"
    end repeat
    
    repeat with i from 1 to 5
        log "Counter: " & i
    end repeat
    
    -- Error handling
    try
        set missingItem to missing value
        log missingItem as string
    on error errorMessage
        log "Caught error: " & errorMessage
    end try
end tell

-- Handler (function) definition
on testHandler(inputText)
    return "Processed: " & inputText
end testHandler

-- Test various AppleScript features
tell application "System Events"
    -- File operations
    set desktopPath to path to desktop
    log "Desktop path: " & desktopPath as string
    
    -- List operations
    set testList to {1, 2, 3, "four", "five"}
    set listLength to length of testList
    log "List has " & listLength & " items"
end tell

-- Shell command execution
set shellResult to do shell script "date"
log "Current date: " & shellResult

-- Call our handler
set handlerResult to testHandler("Hello from handler")
log handlerResult
