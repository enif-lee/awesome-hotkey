import {FC} from 'react'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'

import SimpleKeycap from '../keycap/simple-keycap'

import KeycapType from '../../models/keycap-type'


interface KeycapListProps {
    keycaps: KeycapType[]
}


const Wrapper = styled.div`
    position: relative;
    overflow: hidden;
    left: -4px;
    line-height: 20px;

    .keycap-wrapper {
        float: left;
        padding: 4px;
        font-size: 12px;

        &:not(:last-child):after {
            content: ' + ';
            float: left;
            margin-left: 8px;
            font-size: 14px;
            font-weight: bold;
        }
    }
`


const KeycapList: FC<KeycapListProps> = observer(props => (
    <Wrapper>
        {props.keycaps.map((keycap, index) => (
            <div className="keycap-wrapper" key={index}>
                <SimpleKeycap keycap={keycap} />
            </div>
        ))}
    </Wrapper>
))


export default KeycapList