import {FC} from 'react'
import styled from '@emotion/styled'


const Wrapper = styled.div`
    padding: 12px;
    background-color: #2B2D2F;
    color: #FFFFFF;
    font-size: 10px;
`

const KeyboardGuide: FC = () => (
    <Wrapper>
        단축키를 키보드에 입력해<br />
        관련 Hot key를 찾아보세요!
    </Wrapper>
)


export default KeyboardGuide