import {FC, useContext} from 'react'
import classNames from 'classnames/bind'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'

import KeycapType from '../../models/keycap-type'


interface KeyboardKeycapProps {
    keycap: KeycapType
    isActived: boolean
}


const Wrapper = styled.div`
    --yellow: #FEFF3E;
    --pink: #CD00FF;

    position: relative;
    float: left;
    margin: 4px;
    padding: 1px;
    background-color: #2B2D2F; // TODO: color
    border-radius: 8px;

    .border {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 8px;
        background: linear-gradient(to right bottom, var(--yellow), var(--pink));
        filter: blur(2px);
        opacity: 0;
        transition: all 0.3s ease-in-out;
    }

    .background {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 8px;
        background-color: #2B2D2F; // TODO: color
        color: #FFFFFF; // TODO: color
        font-size: 12px;
        font-weight: bold;
        word-break: break-all;
    }

    &.--active .border {
        opacity: 1;
    }
`

const Empty = styled.div`
    position: relative;
    float: left;
    margin: 4px;
`


const KeyboardKeycap: FC<KeyboardKeycapProps> = observer(props => {
    if (props.keycap == KeycapType.Empty) {
        return <Empty style={cssFromKeycapType(props.keycap)} />

    } else {
        return <Wrapper
            className={classNames({'--active': props.isActived})}
            style={cssFromKeycapType(props.keycap)}>
            <div className="border"></div>
            <div className="background">
                {props.keycap}
            </div>
        </Wrapper>
    }
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

        case KeycapType.Empty:
            return rectCSS(16, 16)

        default:
            return rectCSS(48, 40)
    }
}

const rectCSS = (width: number, height: number) => (
    {
        width: String(width) + 'px',
        height: String(height) + 'px',
        lineHeight: String(height - 2) + 'px'
    }
)


export default KeyboardKeycap