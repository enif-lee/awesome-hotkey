import {FC} from 'react'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'

import KeyboardRow from './keyboard-row'

import KeycapType from '../../models/keycap-type'


interface KeyboardProps {
    activedKeycaps: KeycapType[]
}


const Wrapper = styled.div`
`


const Keyboard: FC<KeyboardProps> = observer(props => {
    const keycaps: KeycapType[] = Object.values(KeycapType)
    const separatedColumnsCountPerRows: number[] = [9, 13, 14, 14, 13, 12, 7]
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