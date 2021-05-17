import {FC} from 'react'
import classNames from 'classnames/bind'
import styled from '@emotion/styled'


interface HotkeyItemProps {
    description: string
    keycaps: string[]
    isActive: boolean
}


const Wrapper = styled.li`
    height: 40px;
    line-height: 40px;
    padding: 0 16px;
    background-color: white;
    border-bottom: 1px solid #ECECEF;
    transition: all 0.2s ease-out;
    
    &:hover {
        cursor: pointer;
        text-decoration: none;
    }

    &.--active {
        background-color: #396EFF11;
    }
`

const ItemTitle = styled.span`
    float: left;
    color: black;
    font-size: 14px;
`

const ItemValue = styled.b`
    float: right;
    color: black;
    font-size: 12px;
    transition: all 0.2s ease-out;

    &.--active {
        color: #396EFF;
    }
`


const HotkeyItem: FC<HotkeyItemProps> = props => (
    <Wrapper className={classNames({'--active': props.isActive})}>
        <ItemTitle>
            {props.description}
        </ItemTitle>
        <ItemValue className={classNames({'--active': props.isActive})}>
            {props.keycaps.join(' + ')}
        </ItemValue>
    </Wrapper>
)


export default HotkeyItem