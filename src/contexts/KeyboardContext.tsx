import React, { createContext, useContext, useReducer } from 'react'

import KeycapType from '../utils/KeycapType'


function keyboardReducer(state, action) {
    console.log(state, action)
}

const initialKeyboardState = {
    keycaps: Object.values(KeycapType),
    activeKeycaps: [KeycapType.LCtrl, KeycapType.Z]
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