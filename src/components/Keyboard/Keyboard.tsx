import React from 'react'

/** @jsx jsx */
import { jsx } from '@emotion/react'

import KeyboardRow from './KeyboardRow'

import { useKeyboardState } from '../../contexts/KeyboardContext'


const KeyboardElement = (props) => (
    <div
        css={{
            display: 'inline-block',
            margin: '24px',
            padding: '8px 16px',
            backgroundColor: '#F6F6F9',
            boxShadow: '0 1px 4px #ECECEF'
        }}
        {...props}
    />
)


function Keyboard() {
    const state = useKeyboardState()

    const separatedColumnsCountPerRows = [13, 14, 14, 13, 12, 7]
    let renderedColumn = 0

    return (
        <KeyboardElement>
            {separatedColumnsCountPerRows.map((columnsCount, index) => (
                <KeyboardRow
                    keycaps={state.keycaps.slice(renderedColumn, renderedColumn += columnsCount)}
                    key={index}
                />
            ))}
        </KeyboardElement>
    )
}


export default Keyboard