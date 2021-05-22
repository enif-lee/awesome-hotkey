import {FC, useContext} from 'react'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'

import SimpleKeycap from '../keycap/simple-keycap'


interface KeycapListProps {
    keycaps: string[]
}


const Wrapper = styled.div`
    position: relative;
    overflow: hidden;
    left: -4px;
    line-height: 24px;
    background-color: #1E1F21; // TODO: color
    color: #FFFFFF;

    .keycap-wrapper {
        float: left;
        padding: 4px;
        font-size: 12px;

        &:not(:last-child):after {
            content: ' + ';
            float: left;
            margin-left: 8px;
            font-size: 14px;
        }
    }
`


const KeycapList: FC<KeycapListProps> = observer(props => {
    return (
        <Wrapper>
            {props.keycaps.map((keycap, index) => (
                <div className="keycap-wrapper">
                    <SimpleKeycap keycap={keycap} key={index} />
                </div>
            ))}
        </Wrapper>
    )
    
})


export default KeycapList