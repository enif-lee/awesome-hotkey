import {FC} from 'react'
import styled from '@emotion/styled'
import _ from 'lodash'

import Search from '../../assets/images/search.png'


interface SimpleSearchBarProps {
    placeholder: string
    onInputText: (text: string) => void
}


const Wrapper = styled.div`
    position: relative;
    height: 40px;
    padding: 0 16px 0 56px;
    background-color: #00000033; // TODO: color
    box-shadow: 0 0 0 1px #3F4045; // TODO: color
    border-radius: 20px;
`

const Img = styled.div`
    position: absolute;
    top: 50%;
    left: 20px;
    width: 24px;
    height: 24px;
    margin-top: -12px;
    background: url(${Search}) no-repeat;
    background-size: contain;
`

const Input = styled.input`
    width: 100%;
    height: 100%;
    background: none;
    border: none;
    font-size: 16px;

    &:focus {
        outline: none;
    }
`


const SimpleSearchBar: FC<SimpleSearchBarProps> = props => {
    const delayedInputText = _.debounce(q => props.onInputText(q), 300)

    return <Wrapper>
        <Img />
        <Input
            placeholder={props.placeholder}
            onChange={e => delayedInputText(e.target.value)}
        />
    </Wrapper>
}


export default SimpleSearchBar