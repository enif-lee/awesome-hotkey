import {FC} from 'react'
import {css} from '@emotion/css'
import styled from '@emotion/styled'

import HotkeyRow from './hotkey-row'

import HotkeyModel from '../../models/hotkey-model'


interface HotkeyTableProps {
    hotkeys: HotkeyModel[]
    onSelectHotkey?: (index: number) => void
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


const HotkeyTable: FC<HotkeyTableProps> = props => (
    <Wrapper>
        <thead>
            <tr>
                <th className={css`width: 66.66%`}>Command</th>
                <th className={css`width: 33.33%`}>Shortcut</th>
            </tr>
        </thead>

        <tbody>
            {props.hotkeys.map((hotkey, index) => (
                <HotkeyRow
                    description={hotkey.description}
                    keycaps={hotkey.keycaps}
                    onSelectHotkey={() => props.onSelectHotkey && props.onSelectHotkey(index)}
                    key={index}
                />
            ))}
        </tbody>
    </Wrapper>
)


export default HotkeyTable