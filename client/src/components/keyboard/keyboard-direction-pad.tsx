import {FC} from 'react'
import {css} from '@emotion/css'
import styled from '@emotion/styled'

import KeyboardKeycap from '../keycap/keyboard-keycap'
import KeycapType from '../../models/keycap-type'
import {OsType} from '../../stores/setting-store'


interface KeyboardDirectionPadProps {
    activedKeycaps: KeycapType[]
    os: OsType
    onSelectKeycap?: (keycap: KeycapType) => void
}


const Wrapper = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
`

const Row = styled.div`
    overflow: hidden;
`


const KeyboardDirectionPad: FC<KeyboardDirectionPadProps> = props => {
    const upperKeycaps: KeycapType[] = [KeycapType.EmptyDirection, KeycapType.Up, KeycapType.EmptyDirection]
    const lowerKeycaps: KeycapType[] = [KeycapType.Left, KeycapType.Down, KeycapType.Right]

    const createKeycap = (keycap: KeycapType, index: number) => (
        <KeyboardKeycap
            keycap={keycap}
            os={props.os}
            isActived={props.activedKeycaps.includes(keycap)}
            align='left'
            onSelectKeycap={props.onSelectKeycap}
            key={index}
        />
    )

    return <Wrapper>
        <Row className={css`transform: translateY(3px);`}>
            {upperKeycaps.map(createKeycap)}
        </Row>
        <Row>
            {lowerKeycaps.map(createKeycap)}
        </Row>
    </Wrapper>
}


export default KeyboardDirectionPad