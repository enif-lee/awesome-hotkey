import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import HotkeyList from '../components/HotkeyList/HotkeyList'
import Keyboard from '../components/Keyboard/Keyboard'

import { selectHotkey } from '../reducers/keyboard'


function KeyboardContainer() {

    // MARK: - State

    const { keycaps, hotkeys, activedHotkeyIndex } = useSelector(state => ({
        keycaps: state.keyboard.keycaps,
        hotkeys: state.keyboard.hotkeys,
        activedHotkeyIndex: state.keyboard.activedHotkeyIndex
    }))

    const activedKeycaps = (index) => {
        if(index < hotkeys.length) {
            return []
        }

        return hotkeys[index]
    }


    // MARK: - Action


    console.log('hi')
    console.log(keycaps, activedHotkeyIndex)

    const dispatch = useDispatch()

    const onSelectHotkey = (index) => dispatch(selectHotkey(index))

    return (
        <div>
            <Keyboard
                keycaps={keycaps}
                activedKeycaps={activedKeycaps(activedHotkeyIndex)}
            />
            <HotkeyList
                hotkeys={hotkeys}
                activedHotkeyIndex={activedHotkeyIndex}
                onSelectHotkey={onSelectHotkey}
            />
        </div>
    )
}


export default Keyboard