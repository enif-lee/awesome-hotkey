import React, { createContext, useContext, useReducer } from 'react'

import KeycapType from '../utils/KeycapType'


const initialKeyboardState = {
    keycaps: Object.values(KeycapType),
    activedKeycaps: []
}

const KeyboardStateContext = createContext()
const KeyboardDispatchContext = createContext()


function keyboardReducer(state, action) {
    console.log(state, action)

    switch (action.type) {
        case KeyboardDispatchType.ActivateHotkey:
            return {
                ...state,
                activedKeycaps: [...state.activedKeycaps, ...action.keycaps]
            }

        default:
            return state
    }
}


export enum KeyboardDispatchType {
    ActivateHotkey = 'ACTIVATE_HOTKEY'
}

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