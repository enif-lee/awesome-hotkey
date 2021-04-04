import React from 'react'

/** @jsx jsx */
import { jsx } from '@emotion/react'

import KeyboardKeycap from './KeyboardKeycap'


const RowElement = (props) => (
    <div
        css={{
            'position': 'relative',
            'overflow': 'hidden'
        }}
        {...props}
    />
)


function KeyboardRow({ keycaps }) {
    return (
        <RowElement>
            {keycaps.map((keycap, index) => (
                <KeyboardKeycap keycap={keycap} key={index} />
            ))}
        </RowElement>
    )
}


export default KeyboardRow