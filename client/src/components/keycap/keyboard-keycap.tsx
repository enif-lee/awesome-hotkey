import {FC} from 'react'
import classNames from 'classnames/bind'
import styled from '@emotion/styled'
import _ from 'lodash'
import {observer} from 'mobx-react-lite'

import KeycapType from '../../models/keycap-type'

import {OsType} from '../../stores/setting-store'


interface KeyboardKeycapProps {
    keycap: KeycapType
    os: OsType
    isActived: boolean
    align: string
    onSelectKeycap?: (keycap: KeycapType) => void
}


const Wrapper = styled.div`
    --yellow: #FEFF3E;
    --pink: #CD00FF;

    position: relative;
    margin: 2px;
    padding: 1px;
    background-color: #2B2D2F; // TODO: color

    .border {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to right bottom, var(--yellow), var(--pink));
        filter: blur(1px);
        opacity: 0;
        transition: all 0.3s ease;
    }

    .background {
        position: relative;
        width: 100%;
        height: 100%;
        background-color: #2B2D2F; // TODO: color
        color: #FFFFFF; // TODO: color
        font-size: 10px;
        word-break: break-all;
        overflow: hidden;
    }

    &:hover {
        cursor: pointer;

        .border {
            opacity: 0.5;
        }
    }

    &.--empty {
        visibility: hidden;

        * {
            display: none;
        }
    }

    &.--active {
        .border {
            opacity: 1;
        }
    }
`


const KeyboardKeycap: FC<KeyboardKeycapProps> = observer(props => (
    <Wrapper
        className={classNames({
            '--empty': isEmptyType(props.keycap),
            '--active': props.isActived
        })}
        style={Object.assign(floatCSS(props.align), sizeCSS(props.keycap, props.os), borderRadiusCSS(props.keycap))}
        onClick={() => props.onSelectKeycap && props.onSelectKeycap(props.keycap)}>
        <div
            className="border"
            style={borderRadiusCSS(props.keycap)}
        />
        <div
            className="background"
            style={borderRadiusCSS(props.keycap)}>
            {props.keycap}
        </div>
    </Wrapper>
))


function floatCSS(align: string): object {
    return { float: align }
}

function sizeCSS(keycap: string, os: OsType): object {
    function object(width: number, height: number): object {
        return {
            width: String(width) + 'px',
            height: String(height) + 'px',
            lineHeight: String(height - 2) + 'px'
        }
    }

    switch(keycap) {
        case KeycapType.PrtSc:
        case KeycapType.ScrollLock:
        case KeycapType.PauseBreak:
        case KeycapType.Insert:
        case KeycapType.Home:
        case KeycapType.PgUp:
        case KeycapType.Del:
        case KeycapType.End:
        case KeycapType.PgDn:
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
            return object(27, 16)

        case KeycapType.Backspace:
        case KeycapType.Tab:
            return object(42, 25)

        case KeycapType.CapsLock:
        case KeycapType.Enter:
            return object(49, 25)

        case KeycapType.Shift:
            return object(64, 25)

        case KeycapType.Ctrl:
        case KeycapType.Alt:
        case KeycapType.Fn:
        case KeycapType.Windows:
        case KeycapType.Chinese:
        case KeycapType.KoreanEnglish:
        case KeycapType.Menu:
            return object(26, 30)

        case KeycapType.Command:
            return object(34, 30)

        case KeycapType.Space:
            switch(os) {
                case OsType.Osx:
                    return object(148, 30)

                case OsType.Windows:
                    return object(104, 30)
            }

        case KeycapType.Left:
        case KeycapType.Up:
        case KeycapType.Down:
        case KeycapType.Right:
        case KeycapType.EmptyDirection:
            return object(25, 15)

        case KeycapType.EmptyTop:
            return object(32, 16)

        case KeycapType.EmptyFn:
            return object(7, 16)

        default:
            return object(26, 25)
    }
}

function borderRadiusCSS(keycap: KeycapType): object {
    const unit: string = '4px'

    switch(keycap) {
    case KeycapType.Left:
        return { borderRadius: `${unit} 0 0 ${unit}` }
        
    case KeycapType.Up:
        return { borderRadius: `${unit} ${unit} 0 0` }
        
    case KeycapType.Down:
        return { borderRadius: `0 0 ${unit} ${unit}` }
        
    case KeycapType.Right:
        return { borderRadius: `0 ${unit} ${unit} 0` }

    default:
        return { borderRadius: unit }
    }
}

function isEmptyType(keycap: KeycapType): boolean {
    switch(keycap) {
    case KeycapType.Empty:
    case KeycapType.EmptyTop:
    case KeycapType.EmptyFn:
    case KeycapType.EmptyDirection:
        return true

    default:
        return false
    }
}


export default KeyboardKeycap