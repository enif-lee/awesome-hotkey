import {FC, useContext} from 'react';
import styled from '@emotion/styled';
import {observer} from 'mobx-react-lite';
import {Link, Route, Switch, useParams, useRouteMatch} from 'react-router-dom';
import {Grid, Row, Col} from 'rsuite';

import KeySearchByCategoryPage from './search/search-by-category';
import KeySearchByKeyboardPage from './search/search-by-keyboard';
import KeySearchByTextPage from './search/search-by-text';

import ProgramMainHeader from '../../components/program/program-main-header'
import CategoryGrid from '../../components/program/category-grid'
import Keyboard from '../../components/keyboard/keyboard'

import ProgramSearchStore from '../../stores/program-search'


const RowTitle = styled.h5`
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

    return <>
        <Switch>
            <Route path={match.url} exact>
                <ProgramMainHeader
                    iconImgURL={store.iconImgURL()}
                    isBookmarked={store.isBookmarked}
                    title={programCode}
                    subtitle={programCode}
                    onToggleBookmarked={store.toggleBookmarked}
                />

                <Grid fluid>
                    <Row>
                        <Col xs={2}></Col>
                        <Col xs={18}>
                            <Row>
                                <Col xs={6}>
                                    <RowTitle>검색어로 찾기</RowTitle>
                                </Col>
                                <Col xs={18}>
                                    <Link to={`${match.url}/search/category`}>
                                        <Dimmed />
                                    </Link>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={6}>
                                    <RowTitle>키보드로 찾기</RowTitle>
                                </Col>
                                <Col xs={18}>
                                    <Link to={`${match.url}/search/keyboard`}>
                                        <Dimmed />
                                    </Link>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={6}>
                                    <RowTitle>분류별로 찾기</RowTitle>
                                </Col>
                                <Col xs={18}>
                                    <CategoryGrid
                                        categories={['File', 'Edit', 'View', 'Object', 'All']}
                                        selectedCategory={'All'}
                                    />
                                    <Link to={`${match.url}/search/text`}>ㄱ</Link>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </Route>

            <Route path={`${match.url}/search/category`}><KeySearchByCategoryPage/></Route>

            <Route path={`${match.url}/search/keyboard`}>
                <KeySearchByKeyboardPage
                    title={programCode}
                    subtitle={programCode}
                />
            </Route>

            <Route path={`${match.url}/search/text`}>
                <KeySearchByTextPage
                    title={programCode}
                    subtitle={programCode}
                />
            </Route>
        </Switch>
    </>
})


export default ProgramMainPage
