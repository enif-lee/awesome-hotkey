import {FC} from 'react'
import classNames from 'classnames/bind'
import styled from '@emotion/styled'
import {Row, Col} from 'rsuite'


interface ProgramSearchHeaderProps {
    tabIndex: number
    onSelectTab: (number) => void
}


const Tab = styled.a`
    display: inline-block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-radius: 16px;
    background-color: #2B2D2F; // TODO: color
    box-shadow: inset 0 0 0 2px #3F4045; // TODO: color
    color: #606060; // TODO: color
    font-size: 18px;
    text-align: center;
    transition: all 0.2s ease;

    &:hover {
        cursor: pointer;
        color: #FFFFFF; // TODO: color
        text-decoration: none;
    }

    &.--active {
        background-color: #3F4045; // TODO: color
        box-shadow: inset 0 0 0 2px #2B2D2F; // TODO: color
        color: #FFFFFF; // TODO: color
    }
`


const ProgramSearchTabbar: FC<ProgramSearchHeaderProps> = props => {
    const btnTitles: string[] = ['키워드 검색', '키보드 검색', '기능별 검색']

    return <Row gutter={16}>
        {btnTitles.map((title, index) => {
            return <Col xs={24 / btnTitles.length} key={index}>
                <Tab
                    className={classNames({'--active': index == props.tabIndex})}
                    onClick={() => props.onSelectTab(index)}>
                    {title}
                </Tab>
            </Col>
        })}
    </Row>
}


export default ProgramSearchTabbar
