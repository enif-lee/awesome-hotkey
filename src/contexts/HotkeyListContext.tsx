import React, { createContext, useContext, useReducer } from 'react'

import { useKeyboardDispatch } from './KeyboardContext'
import KeycapType from '../utils/KeycapType'


const initialHotkeyListState = {
    hotkeys: [
        {
            description: '실행 취소',
            keycaps: [KeycapType.LCtrl, KeycapType.Z]
        },
        {
            description: '실행 취소취소',
            keycaps: [KeycapType.LCtrl, KeycapType.LShift, KeycapType.Z]
        },
        {
            description: '잘라내기',
            keycaps: [KeycapType.LCtrl, KeycapType.X]
        }
    ],
    activedHotkeyIndex: -1
}

const HotkeyListStateContext = createContext()
const HotkeyListDispatchContext = createContext()


function hotkeyListReducer(state, action) {
    console.log(state, action)

    switch (action.type) {
        case HotkeyListDispatchType.SelectHotkey:
            return {
                ...state,
                activedHotkeyIndex: action.index
            }

        default:
            return state
    }
}


export enum HotkeyListDispatchType {
    SelectHotkey = 'SELECT_HOTKEY'
}

export function HotkeyListProvider({ children }) {
    const [state, dispatch] = useReducer(hotkeyListReducer, initialHotkeyListState)

    return (
        <HotkeyListStateContext.Provider value={state}>
            <HotkeyListDispatchContext.Provider value={dispatch}>
                {children}
            </HotkeyListDispatchContext.Provider>
        </HotkeyListStateContext.Provider>
    )
}

export function useHotkeyListState() {
    return useContext(HotkeyListStateContext)
}

export function useHotkeyListDispatch() {
    return useContext(HotkeyListDispatchContext)
}