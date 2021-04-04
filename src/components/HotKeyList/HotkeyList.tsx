import React from 'react'

/** @jsx jsx */
import { jsx } from '@emotion/react'

import HotkeyItem from './HotkeyItem'

import { useHotkeyListState } from '../../contexts/HotkeyListContext'


const ListElement = (props) => (
    <ul
        css={{
            width: '720px',
            margin: '16px auto',
            padding: '0',
            textAlign: 'left',
            listStyle: 'none'
        }}
        {...props}
    />
)


function HotkeyList() {
    const state = useHotkeyListState()

    return (
        <ListElement>
            {state.hotkeys.map((hotkey, index) => (
                <HotkeyItem
                    index={index}
                    hotkey={hotkey}
                    isActive={index == state.activedHotkeyIndex}
                    key={index}
                />
            ))}
        </ListElement>
    )
}


export default HotkeyList