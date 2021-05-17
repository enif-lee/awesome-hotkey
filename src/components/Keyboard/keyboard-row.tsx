import {FC} from 'react'
import styled from '@emotion/styled'

import KeyboardKeycap from './keyboard-keycap'


interface KeyboardRowProps {
    keycaps: string[]
}


const Wrapper = styled.div`
    position: relative;
    overflow: hidden;
`


const KeyboardRow: FC<KeyboardRowProps> = props => (
    <Wrapper>
        {props.keycaps.map((keycap, index) => (
            <KeyboardKeycap keycap={keycap} key={index} />
        ))}
    </Wrapper>
)


export default KeyboardRow