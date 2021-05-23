import {FC} from 'react'
import styled from '@emotion/styled'
import {Link, useParams, useRouteMatch} from 'react-router-dom'
import {Grid, Row, Col} from 'rsuite'

import BookmarkableProgramIcon from './bookmarkable-program-icon'
import ProgramSearchTabbar from './program-search-tabbar'

import TabModel from '../../models/tab-model'


interface ProgramSearchHeaderProps {
    iconImgURL: string
    isBookmarked: boolean
    title: string
    subtitle: string
    tabs: TabModel[]
    selectedTabKey: string
    onToggleBookmarked: () => void
}


const Wrapper = styled.div`
    padding: 20px 0;
`

const Title = styled.div`
    text-align: left;
    font-size: 40px;
    font-weight: bold;
`

const Subtitle = styled.div`
    margin-top: -8px;
    margin-bottom: 16px;
    text-align: left;
    font-size: 16px;
`


const ProgramSearchHeader: FC<ProgramSearchHeaderProps> = props => {
    return <Wrapper>
        <Grid fluid>
            <Row>
                <Col xs={8}>
                    <BookmarkableProgramIcon
                        imgURL={props.iconImgURL}
                        isBookmarked={props.isBookmarked}
                        onToggleBookmarked={props.onToggleBookmarked}
                    />
                </Col>

                <Col xs={16} lg={14}>
                    <Title>{props.title}</Title>
                    <Subtitle>{props.subtitle}</Subtitle>
                    <ProgramSearchTabbar
                        tabs={props.tabs}
                        selectedTabKey={props.selectedTabKey}
                    />
                </Col>
            </Row>
        </Grid>
    </Wrapper>
}


export default ProgramSearchHeader
