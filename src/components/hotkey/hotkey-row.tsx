import {FC} from 'react'
import classNames from 'classnames/bind'
import styled from '@emotion/styled'

import KeycapList from '../keyboard/keycap-list'


interface HotkeyRowProps {
    description: string
    keycaps: string[]
    isActive: boolean
    onSelect: () => void
}


const Row = styled.tr`
    transition: background-color 0.3s ease;

    &:hover {
        cursor: pointer;
        background-color: #FFFFFF11; // TODO: color
    }

    &.--active {
        background-color: #FFFFFF22; // TODO: color
    }
`


const HotkeyRow: FC<HotkeyRowProps> = props => (
    <Row
        className={classNames({'--active': props.isActive})}
        onClick={() => props.onSelect()}>
        <td>
            {props.description}
        </td>
        <td>
            <KeycapList keycaps={props.keycaps} />
        </td>
    </Row>
)


export default HotkeyRow