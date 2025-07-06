-- Create a large file to test performance
property longList : {}

repeat 1000 times
    tell application "Finder"
        -- Add complex nested structures
        if true then
            try
                set longList to longList & "test"
            on error
                log "Error"
            end try
        end if
    end tell
end repeat
