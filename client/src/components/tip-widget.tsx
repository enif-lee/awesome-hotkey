import {FC} from 'react'
import styled from '@emotion/styled'


interface TipWidgetProps {
    id: number
    imgURL: string
    title: string
}


const Wrapper = styled.div`
    width: 200px;
    padding: 20px;
    border-radius: 10px;
    background-color: #2B2D2F; // TODO: color
    border: 1px solid #3F4045; // TODO: color
    box-shadow: 10px 10px 25px rgba(0, 0, 0, 0.25);
    color: #FFFFFF; // TODO: color
    overflow: hidden;

    > *:not(:last-child) {
        margin-bottom: 24px;
    }
`

const Header = styled.div`
    font-size: 16px;
    font-weight: bold;
    text-align: left;
`

const Img = styled.div`
    width: 100%;
    padding-top: 100%;
    border-radius: 8px;
    background-size: cover;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
`

const Title = styled.div`
    font-size: 12px;
    text-align: left;
`

const Btn = styled.a`
    float: right;
    font-size: 12px;
    font-weight: lighter;
    color: #FFFFFF; // TODO: color
    transition: all 0.2s ease;
`


const TipWidget: FC<TipWidgetProps> = props => (
    <Wrapper>
        <Header>관련 단축키 팁</Header>
        <Img style={{backgroundImage: `url(${props.imgURL})`}} />
        <Title>{props.title}</Title>
        <Btn href={`/tool-tips/${props.id}`}>바로가기 &gt;</Btn>
    </Wrapper>
)


export default TipWidget
