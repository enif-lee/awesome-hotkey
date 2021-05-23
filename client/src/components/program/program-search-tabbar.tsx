import {FC} from 'react'
import classNames from 'classnames/bind'
import styled from '@emotion/styled'
import {Link, useRouteMatch} from 'react-router-dom'
import {Row, Col} from 'rsuite'

import TabModel from '../../models/tab-model'


interface ProgramSearchHeaderProps {
    tabs: TabModel[]
    selectedTabKey: string
}


const Tab = styled.div`
    display: inline-block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-radius: 16px;
    background-color: #2B2D2F; // TODO: color
    box-shadow: inset 0 0 0 2px #3F4045; // TODO: color
    color: #606060; // TODO: color
    text-align: center;
    font-size: 16px;
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
    const match = useRouteMatch()

    return <Row gutter={16}>
        {props.tabs.map((tab, index) => (
            <Col xs={24 / props.tabs.length} key={index}>
                <Link to={[match.url, tab.key].join('/')}>
                    <Tab className={classNames({'--active': tab.key == props.selectedTabKey})}>
                        {tab.title}
                    </Tab>
                </Link>
            </Col>
        ))}
    </Row>
}


export default ProgramSearchTabbar
