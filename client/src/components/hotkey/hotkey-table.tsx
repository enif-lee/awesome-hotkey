import {FC, useContext} from 'react'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'

import HotkeyRow from './hotkey-row'

import HotkeyModel from '../../models/hotkey-model'


interface HotkeyTableProps {
    hotkeys: HotkeyModel[]
    selectedHotkeyIndex: number
    onSelectHotkey?: (number) => void
}


const Wrapper = styled.table`
    width: 100%;
    text-align: left;
    font-size: 16px;

    th, td {
        padding: 8px 20px;
        border-bottom: 1px solid #FFFFFF; // TODO: color
    }
`


const HotkeyTable: FC<HotkeyTableProps> = observer(props => (
    <Wrapper>
        <thead>
            <tr>
                <th width="66.66%">Command</th>
                <th width="33.33%">Shortcut</th>
            </tr>
        </thead>

        <tbody>
            {props.hotkeys.map((hotkey, index) => (
                <HotkeyRow
                    description={hotkey.description}
                    keycaps={hotkey.keycaps}
                    isActived={index == props.selectedHotkeyIndex}
                    onSelectHotkey={() => props.onSelectHotkey(index)}
                    key={index}
                />
            ))}
        </tbody>
    </Wrapper>
))


export default HotkeyTable