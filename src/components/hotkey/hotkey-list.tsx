import {FC, useContext} from 'react'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'

import HotkeyItem from './hotkey-item'

import KeyboardStore from '../../stores/keyboard'


const Wrapper = styled.ul`
    width: 720px;
    margin: 16px auto;
    padding: 0;
    text-align: left;
    list-style: none;
`


const HotkeyList: FC = observer(() => {
    const store = useContext(KeyboardStore)

    return (
        <Wrapper>
            {store.hotkeys.map((hotkey, index) => (
                <a onClick={() => store.selectHotkey(index)} key={index}>
                    <HotkeyItem
                        description={hotkey.description}
                        keycaps={hotkey.keycaps}
                        isActive={index == store.activedHotkeyIndex}
                    />
                </a>
            ))}
        </Wrapper>
    )
})


export default HotkeyList