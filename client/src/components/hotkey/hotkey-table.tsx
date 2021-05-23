import {FC, useContext} from 'react'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'

import HotkeyRow from './hotkey-row'

import KeyboardStore from '../../stores/keyboard'


const Wrapper = styled.table`
    width: 100%;
    text-align: left;
    font-size: 18px;

    th, td {
        padding: 8px 24px;
        border-bottom: 1px solid #FFFFFF; // TODO: color
    }
`


const HotkeyTable: FC = observer(() => {
    const store = useContext(KeyboardStore)

    return <Wrapper>
        <tr>
            <th width="70%">Command</th>
            <th width="30%">Shortcut</th>
        </tr>

        {store.hotkeys.map((hotkey, index) => (
            <HotkeyRow
                description={hotkey.description}
                keycaps={hotkey.keycaps}
                isActive={index == store.activedHotkeyIndex}
                onSelect={() => store.selectHotkey(index)}
                key={index}
            />
        ))}
    </Wrapper>
})


export default HotkeyTable