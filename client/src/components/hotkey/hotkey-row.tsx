import {FC} from 'react'
import classNames from 'classnames/bind'
import styled from '@emotion/styled'

import KeycapList from '../keyboard/keycap-list'

import KeycapType from '../../models/keycap-type'


interface HotkeyRowProps {
    description: string
    keycaps: KeycapType[]
    onSelectHotkey?: () => void
}


const Wrapper = styled.tr`
    transition: background-color 0.3s ease;

    &:hover {
        cursor: pointer;
        background-color: #FFFFFF11; // TODO: color
    }
`


const HotkeyRow: FC<HotkeyRowProps> = props => (
    <Wrapper onClick={() => props.onSelectHotkey()}>
        <td>
            {props.description}
        </td>
        <td>
            <KeycapList keycaps={props.keycaps} />
        </td>
    </Wrapper>
)


export default HotkeyRow