import {FC, useContext} from 'react';
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'
import {Link, Route, Switch, useParams, useRouteMatch} from 'react-router-dom'
import {Grid, Row, Col} from 'rsuite'

import CategoryGrid from '../../components/program/category-grid'
import Keyboard from '../../components/keyboard/keyboard'
import ProgramMainHeader from '../../components/program/program-main-header'
import SimpleSearchBar from '../../components/search/simple-search-bar'

import ProgramSearchPage from './program-search-page'

import ProgramSearchStore from '../../stores/program-search'


const Wrapper = styled.div`
    .row {
        margin-bottom: 40px;
    }
`

const RowTitle = styled.h5`
    text-align: left;
`

const Dimmed = styled.div`
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
    background-color: lightgray;
`


const ProgramMainPage: FC = observer(() => {
    const store = useContext(ProgramSearchStore)

    const match = useRouteMatch()
    const {programCode} = useParams<{programCode: string}>()

    return <Wrapper>
        <Switch>
            <Route path={match.url} exact>
                <ProgramMainHeader
                    iconImgURL={store.iconImgURL}
                    isBookmarked={store.isBookmarked}
                    title={store.title}
                    subtitle={store.subtitle}
                    onToggleBookmarked={store.toggleBookmarked}
                />

                <Grid fluid>
                    <Row className="row">
                        <Col xs={6}>
                            <RowTitle>검색어로 찾기</RowTitle>
                        </Col>
                        <Col xs={18}>
                            <Link to={`${match.url}/search/text`}>
                                <SimpleSearchBar placeholder="검색하실 기능 또는 단축키를 입력하세요 :)" />
                            </Link>
                        </Col>
                    </Row>

                    <Row className="row">
                        <Col xs={6}>
                            <RowTitle>키보드로 찾기</RowTitle>
                        </Col>
                        <Col xs={18}>
                            <Link to={`${match.url}/search/keyboard`}>
                                <Keyboard activedKeycaps={store.activedKeycaps} />
                            </Link>
                        </Col>
                    </Row>

                    <Row className="row">
                        <Col xs={6}>
                            <RowTitle>분류별로 찾기</RowTitle>
                        </Col>
                        <Col xs={18}>
                            <Link to={`${match.url}/search/category`}>
                                <CategoryGrid
                                    categories={store.categories}
                                    selectedCategory={store.selectedCategory}
                                />
                            </Link>
                        </Col>
                    </Row>
                </Grid>
            </Route>

            <Route path={`${match.url}/search`}><ProgramSearchPage /></Route>
        </Switch>
    </Wrapper>
})


export default ProgramMainPage
