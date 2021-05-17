import {FC, useContext} from 'react'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'

import KeyboardRow from './keyboard-row'
import KeyboardStore from '../../stores/keyboard'


const Wrapper = styled.div`
    display: inline-block;
    margin: 24px;
    padding: 8px 16px;
    background-color: #F6F6F9;
    box-shadow: 0 1px 4px #ECECEF;
`


const Keyboard: FC = observer(() => {
    const store = useContext(KeyboardStore)

    const separatedColumnsCountPerRows = [13, 14, 14, 13, 12, 7]
    let renderedColumn = 0

    return (
        <Wrapper>
            {separatedColumnsCountPerRows.map((columnsCount, index) => (
                <KeyboardRow
                    keycaps={store.keycaps.slice(renderedColumn, renderedColumn += columnsCount)}
                    key={index}
                />
            ))}
        </Wrapper>
    )
})


export default Keyboard