import KeycapType from '../utils/KeycapType'


// MARK: - Action

const namespace = 'keyboard/'

const SELECT_HOTKEY = namespace + 'SELECT_HOTKEY'


// MARK: - Mutation

export const selectHotkey = (index) => {
    console.log(index)

    return {
        type: SELECT_HOTKEY,
        index: index
    }
}


// MARK: - State

const initialState = {
    keycaps: Object.values(KeycapType),
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


export default function keyboard(state = initialState, action) {
    console.log(state, action)

    switch (action.type) {
        case SELECT_HOTKEY:
            return {
                ...state,
                activedHotkeyIndex: action.index
            }

        default:
            return state
    }
}