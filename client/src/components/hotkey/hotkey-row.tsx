import {FC} from 'react'
import styled from '@emotion/styled'

import KeycapList from '../keycap/keycap-list'

import KeycapType from '../../models/keycap-type'


interface HotkeyRowProps {
    description: string
    keycaps: KeycapType[]
    onSelectHotkey?: () => void
}


const Wrapper = styled.tr`
`


const HotkeyRow: FC<HotkeyRowProps> = props => (
    <Wrapper onClick={props.onSelectHotkey}>
        <td>
            {props.description}
        </td>
        <td>
            <KeycapList keycaps={props.keycaps} />
        </td>
    </Wrapper>
)


export default HotkeyRow