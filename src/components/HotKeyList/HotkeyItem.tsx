import React from 'react'

/** @jsx jsx */
import { css, jsx } from '@emotion/react'

import { HotkeyListDispatchType, useHotkeyListDispatch } from '../../contexts/HotkeyListContext'


const ItemElement = (props) => (
    <li
        css={{
            height: '40px',
            lineHeight: '40px',
            padding: '0 16px',
            backgroundColor: props.isActive ? '#396EFF11' : 'white',
            borderBottom: '1px solid #ECECEF',
            cursor: 'pointer',
            overflow: 'hidden',
            transition: 'all 0.2s ease-out'
        }}
        {...props}
    />
)

const ItemTitleElement = (props) => (
    <span
        css={{
            float: 'left',
            fontSize: '14px'
        }}
        {...props}
    />
)

const ItemValueElement = (props) => (
    <b
        css={{
            float: 'right',
            color: props.isActive ? '#396EFF' : 'black',
            fontSize: '12px',
            transition: 'all 0.2s ease-out'
        }}
        {...props}
    />
)


function HotkeyItem({ index, hotkey, isActive }) {
    const dispatch = useHotkeyListDispatch()

    const onSelect = () => {
        dispatch({
            type: HotkeyListDispatchType.SelectHotkey,
            index: index,
            keycaps: hotkey.keycaps
        })
    }

    return (
        <ItemElement
            isActive={isActive}
            onClick={onSelect}
            >
            <ItemTitleElement>
                {hotkey.description}
            </ItemTitleElement>
            <ItemValueElement isActive={isActive}>
                {hotkey.keycaps.join(' + ')}
            </ItemValueElement>
        </ItemElement>
    )
}


export default HotkeyItem