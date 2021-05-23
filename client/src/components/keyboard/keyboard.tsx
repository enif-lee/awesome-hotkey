import {FC, useContext} from 'react'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'

import KeyboardRow from './keyboard-row'

import KeycapType from '../../models/keycap-type'


interface KeyboardProps {
    activedKeycaps: KeycapType[]
}


const Wrapper = styled.div`
    display: inline-block;
    // background-color: #F6F6F9;
    // box-shadow: 0 1px 4px #ECECEF;
`


const Keyboard: FC<KeyboardProps> = observer(props => {
    const keycaps: KeycapType[] = Object.values(KeycapType)
    const separatedColumnsCountPerRows: number = [13, 14, 14, 13, 12, 7]
    let renderedColumn: number = 0

    return <Wrapper>
        {separatedColumnsCountPerRows.map((columnsCount, index) => (
            <KeyboardRow
                keycaps={keycaps.slice(renderedColumn, renderedColumn += columnsCount)}
                activedKeycaps={props.activedKeycaps}
                key={index}
            />
        ))}
    </Wrapper>
})


export default Keyboard