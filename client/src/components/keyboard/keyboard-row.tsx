import {FC} from 'react'
import styled from '@emotion/styled'

import KeyboardKeycap from '../keycap/keyboard-keycap'

import KeycapType from '../../models/keycap-type'


interface KeyboardRowProps {
    keycaps: KeycapType[]
    activedKeycaps: KeycapType[]
}


const Wrapper = styled.div`
    position: relative;
    overflow: hidden;
`


const KeyboardRow: FC<KeyboardRowProps> = props => (
    <Wrapper>
        {props.keycaps.map((keycap, index) => (
            <KeyboardKeycap
                keycap={keycap}
                isActived={props.activedKeycaps.includes(keycap)}
                key={index}
            />
        ))}
    </Wrapper>
)


export default KeyboardRow