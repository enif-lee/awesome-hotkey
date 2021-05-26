import {FC} from 'react'
import styled from '@emotion/styled'
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
    text-align: left;
`

const Title = styled.div`
    margin-top: -8px;
    font-size: 40px;
    font-weight: bold;
`

const Subtitle = styled.div`
    margin-top: -4px;
    margin-bottom: 16px;
    font-size: 16px;
`


const ProgramSearchHeader: FC<ProgramSearchHeaderProps> = props => (
    <Wrapper>
        <Grid fluid>
            <Row>
                <Col xs={8}>
                    <BookmarkableProgramIcon
                        imgURL={props.iconImgURL}
                        isBookmarked={props.isBookmarked}
                        onToggleBookmarked={props.onToggleBookmarked}
                    />
                </Col>

                <Col xs={16}>
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
)


export default ProgramSearchHeader
