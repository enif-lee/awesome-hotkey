import React, { useReducer } from 'react'

import KeyboardRow from './KeyboardRow'

import { useKeyboardState, useKeyboardDispatch } from '../../contexts/KeyboardContext'


function Keyboard() {
    const state = useKeyboardState()
    const dispatch = useKeyboardDispatch()

    const separatedColumnsCountPerRows = [13, 14, 12, 10, 12, 5]
    var column = 0

    return (
        <div>
            { separatedColumnsCountPerRows.map((columnsCount, index) => (
                <KeyboardRow
                    key={ index }
                    keycaps={ state.keycaps.slice(column, column += columnsCount) }
                />
            )) }
        </div>
    )
}


export default Keyboard