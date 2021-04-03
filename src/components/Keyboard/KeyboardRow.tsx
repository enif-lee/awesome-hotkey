import React from 'react'

/** @jsx jsx */
import { jsx } from '@emotion/react'

import KeyboardKeycap from './KeyboardKeycap'


const Row = (props) => (
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
        <Row>
            {keycaps.map((keycap, index) => (
                <KeyboardKeycap keycap={keycap} key={index} />
            ))}
        </Row>
    )
}


export default KeyboardRow