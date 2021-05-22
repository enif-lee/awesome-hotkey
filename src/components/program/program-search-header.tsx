import {FC} from 'react'
import styled from '@emotion/styled'
import {Grid, Row, Col} from 'rsuite'

import BookmarkableProgramIcon from './bookmarkable-program-icon'
import ProgramSearchTabbar from './program-search-tabbar'


interface ProgramSearchHeaderProps {
    iconImgURL: string
    isBookmarked: boolean
    title: string
    subtitle: string
    tabIndex: number
    onToggleBookmarked: () => void
    onSelectTab: (number) => void
}


const Wrapper = styled.div`
    margin: 60px 0;
`

const Title = styled.h2`
    text-align: left;
`

const Subtitle = styled.h4`
    text-align: left;
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
                        tabIndex={props.tabIndex}
                        onSelectTab={props.onSelectTab}
                    />
                </Col>
            </Row>
        </Grid>
    </Wrapper>
}


export default ProgramSearchHeader
