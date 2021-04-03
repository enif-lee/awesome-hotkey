import React from 'react'

/** @jsx jsx */
import { css, cx, jsx } from '@emotion/react'

import { useKeyboardState, useKeyboardDispatch } from '../../contexts/KeyboardContext'
import KeycapType from '../../utils/KeycapType'


const KeycapElement = (props) => (
    <div
        css={{
            float: 'left',
            margin: '4px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: props.isActive ? '0 0 4px #396EFF' : 'none',
            color: props.isActive ? '#396EFF' : 'black',
            fontSize: '12px',
            wordBreak: 'break-all'
        }}
        {...props}
    />
)


const cssFromKeycapType = (keycap) => {
    switch (keycap) {
        case KeycapType.Esc:
        case KeycapType.F1:
        case KeycapType.F2:
        case KeycapType.F3:
        case KeycapType.F4:
        case KeycapType.F5:
        case KeycapType.F6:
        case KeycapType.F7:
        case KeycapType.F8:
        case KeycapType.F9:
        case KeycapType.F10:
        case KeycapType.F11:
        case KeycapType.F12:
            return rectCSS(48, 24)

        case KeycapType.Backspace:
        case KeycapType.Tab:
            return rectCSS(80, 40)

        case KeycapType.CapsLock:
        case KeycapType.Enter:
            return rectCSS(92, 40)

        case KeycapType.LShift:
        case KeycapType.RShift:
            return rectCSS(120, 40)

        case KeycapType.LCtrl:
        case KeycapType.LAlt:
        case KeycapType.RAlt:
        case KeycapType.RCtrl:
            return rectCSS(60, 48)

        case KeycapType.Space:
            return rectCSS(240, 48)

        default:
            return rectCSS(48, 40)
    }
}

const rectCSS = (width, height) => (
    {
        width: String(width) + 'px',
        height: String(height) + 'px',
        lineHeight: String(height) + 'px'
    }
)


function KeyboardKeycap({ keycap }) {
    const state = useKeyboardState()

    return (
        <KeycapElement
            isActive={state.activeKeycaps.includes(keycap)}
            style={cssFromKeycapType(keycap)}>
            {keycap}
        </KeycapElement>
    )
}


export default KeyboardKeycap