import {FC, useContext} from 'react'
import classNames from 'classnames/bind'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'

import KeycapType from '../../utils/keycap-type'
import KeyboardStore from '../../stores/keyboard'


interface KeyboardKeycapProps {
    keycap: string
    activeKeycaps: string[]
    onSelectKeycap: (string) => void
}


const Wrapper = styled.div`
    float: left;
    margin: 4px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 1px 2px #ECECEF; // TODO: color
    color: black;
    font-size: 12px;
    font-weight: regular;
    word-break: break-all;
    transition: all 0.2s ease-out;

    &:hover {
        cursor: pointer;
        text-decoration: none;
    }

    &.--active {
        box-shadow: 0 0 4px #396EFF;
        color: #396EFF; // TODO:
        font-weight: bold;
    }
`


const KeyboardKeycap: FC<KeyboardKeycapProps> = observer(props => {
    const store = useContext(KeyboardStore)

    return (
        <Wrapper
            className={classNames({'--active': store.activedKeycaps.includes(props.keycap)})}
            style={cssFromKeycapType(props.keycap)}
            onClick={() => store.selectKeycap(props.keycap)}>
            {props.keycap}
        </Wrapper>
    )
})


const cssFromKeycapType = (keycap: string) => {
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
        case KeycapType.LCommand:
        case KeycapType.RCommand:
        case KeycapType.RAlt:
        case KeycapType.RCtrl:
            return rectCSS(60, 48)

        case KeycapType.Space:
            return rectCSS(240, 48)

        default:
            return rectCSS(48, 40)
    }
}

const rectCSS = (width: number, height: number) => (
    {
        width: String(width) + 'px',
        height: String(height) + 'px',
        lineHeight: String(height) + 'px'
    }
)


export default KeyboardKeycap