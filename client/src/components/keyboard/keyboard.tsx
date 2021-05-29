import {FC} from 'react'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'

import KeyboardDirectionPad from './keyboard-direction-pad'
import KeyboardKeycap from '../keycap/keyboard-keycap'

import {OsType} from '../../stores/setting-store'

import KeycapType from '../../models/keycap-type'


interface KeyboardProps {
    activedKeycaps: KeycapType[]
    os: OsType
    onSelectKeycap?: (keycap: KeycapType) => void
}


const Wrapper = styled.div`
`

const Row = styled.div`
    position: relative;
    overflow: hidden;
`


const Keyboard: FC<KeyboardProps> = observer(props => {
    const keycapRows: KeycapType[][] = [
        topKeycaps(props.os),
        [KeycapType.Esc, KeycapType.EmptyFn, KeycapType.F1, KeycapType.F2, KeycapType.F3, KeycapType.F4, KeycapType.EmptyFn, KeycapType.F5, KeycapType.F6, KeycapType.F7, KeycapType.F8, KeycapType.EmptyFn, KeycapType.F9, KeycapType.F10, KeycapType.F11, KeycapType.F12],
        [KeycapType.Grave, KeycapType._1, KeycapType._2, KeycapType._3, KeycapType._4, KeycapType._5, KeycapType._6, KeycapType._7, KeycapType._8, KeycapType._9, KeycapType._0, KeycapType.Hyphen, KeycapType.EqualSign, KeycapType.Backspace],
        [KeycapType.Tab, KeycapType.Q, KeycapType.W, KeycapType.E, KeycapType.R, KeycapType.T, KeycapType.Y, KeycapType.U, KeycapType.I, KeycapType.O, KeycapType.P, KeycapType.LeftBracket, KeycapType.RightBracket, KeycapType.BackSlash],
        [KeycapType.CapsLock, KeycapType.A, KeycapType.S, KeycapType.D, KeycapType.F, KeycapType.G, KeycapType.H, KeycapType.J, KeycapType.K, KeycapType.L, KeycapType.SemiColon, KeycapType.QuotationMark, KeycapType.Enter],
        [KeycapType.Shift, KeycapType.Z, KeycapType.X, KeycapType.C, KeycapType.V, KeycapType.B, KeycapType.N, KeycapType.M, KeycapType.Comma, KeycapType.Period, KeycapType.Slash, KeycapType.Shift],
        bottomKeycaps(props.os)
    ]

    return <Wrapper>
        {keycapRows.map((keycaps, rowIndex) => (
            <Row key={rowIndex}>
                {keycaps.map((keycap, keycapIndex) => (
                    <KeyboardKeycap
                        keycap={keycap}
                        os={props.os}
                        isActived={props.activedKeycaps.includes(keycap)}
                        align={rowIndex == 0 ? 'right' : 'left'}
                        onSelectKeycap={props.onSelectKeycap}
                        key={keycapIndex}
                    />
                ))}
            </Row>
        ))}

        <KeyboardDirectionPad
            activedKeycaps={props.activedKeycaps}
            os={props.os}
            onSelectKeycap={props.onSelectKeycap}
        />
    </Wrapper>
})

export const KeyboardContainer = styled.div`
  float: right;
  margin-top: 8px;
`


function topKeycaps(os: OsType): KeycapType[] {
    switch(os) {
        case OsType.Osx:
            return []

        case OsType.Windows:
            return [KeycapType.PgDn, KeycapType.End, KeycapType.Del, KeycapType.PgUp, KeycapType.Home, KeycapType.Insert, KeycapType.EmptyTop, KeycapType.PauseBreak, KeycapType.ScrollLock, KeycapType.PrtSc]
    }
}

function bottomKeycaps(os: OsType): KeycapType[] {
    switch(os) {
        case OsType.Osx:
            return [KeycapType.Ctrl, KeycapType.Alt, KeycapType.Option, KeycapType.Command, KeycapType.Space, KeycapType.Command, KeycapType.Option]

        case OsType.Windows:
            return [KeycapType.Ctrl, KeycapType.Windows, KeycapType.Alt, KeycapType.Chinese, KeycapType.Space, KeycapType.KoreanEnglish, KeycapType.Alt, KeycapType.Menu, KeycapType.Ctrl]
    }
}


export default Keyboard