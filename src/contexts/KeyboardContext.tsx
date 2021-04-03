import React, { createContext, useContext, useReducer } from 'react'


function keyboardReducer(state, action) {
    console.log(state, action)
}

const initialKeyboardState = {
    keycaps: [
        'ESC', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12',
        '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+', 'Backspace',
        'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', // TODO: \
        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', // TODO: '
        'L Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'R Shift',
        'L Ctrl', 'L Alt', 'Space', 'R Alt', 'R Ctrl'
    ]
}

const KeyboardStateContext = createContext()
const KeyboardDispatchContext = createContext()


export function KeyboardProvider({ children }) {
    const [state, dispatch] = useReducer(keyboardReducer, initialKeyboardState)

    return (
        <KeyboardStateContext.Provider value={state}>
            <KeyboardDispatchContext.Provider value={dispatch}>
                {children}
            </KeyboardDispatchContext.Provider>
        </KeyboardStateContext.Provider>
    )
}

export function useKeyboardState() {
    return useContext(KeyboardStateContext)
}

export function useKeyboardDispatch() {
    return useContext(KeyboardDispatchContext)
}