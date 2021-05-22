import {FC} from 'react'
import styled from '@emotion/styled'


interface SimpleKeycapProps {
    keycap: string
}


const Wrapper = styled.div`
    float: left;
    padding: 0 8px;
    box-shadow: 0 0 0 1px #C4C4C4; // TODO: color
    border-radius: 4px;
`


const SimpleKeycap: FC<SimpleKeycapProps> = props => {
    return <Wrapper>
        {props.keycap}
    </Wrapper>
}


export default SimpleKeycap