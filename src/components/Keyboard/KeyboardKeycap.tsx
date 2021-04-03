import React from 'react'

/** @jsx jsx */
import { jsx } from '@emotion/react'


const Keycap = (props) => (
    <div
        css={{
            float: 'left',
            width: '60px',
            height: '40px',
            margin: '10px',
            backgroundColor: 'lightgray',
        }}
        { ...props }
    />
)


function KeyboardKeycap({ keycap }) {
    return (
        <Keycap>
            { keycap }
        </Keycap>
    )
}


export default KeyboardKeycap