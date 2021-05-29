import {FC} from 'react';
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'
import {Link, Route, Switch, useHistory, useParams, useRouteMatch} from 'react-router-dom'
import {Col, Grid, Row} from 'rsuite'

import CategoryGrid from '../../components/program/category-grid'
import Keyboard from '../../components/keyboard/keyboard'
import ProgramMainHeader from '../../components/program/program-main-header'
import SimpleSearchBar from '../../components/search/simple-search-bar'

import ProgramSearchPage from './program-search-page'
import {ProgramSearchStore, ProgramSearchStoreContext, useProgramSearchStore} from "../../stores/program-search-store";
import {isSupportProgram} from "../../data/dataloader";


const Wrapper = styled.div`
  width: 620px;
  margin: 0 auto;

  .row {
    margin: 48px 0;
  }
`

const RowTitle = styled.div`
  line-height: 40px;
  text-align: left;
  font-size: 16px;
`


export const ProgramMainPageContextWrapper: FC = () => {
    const {programCode} = useParams<{ programCode: string }>()
    const history = useHistory();
    if (!isSupportProgram(programCode)) {
        history.push("/not-found")
        return <></>
    }
    return <>
        <ProgramSearchStoreContext.Provider value={new ProgramSearchStore(programCode)}>
            <ProgramMainPage/>
        </ProgramSearchStoreContext.Provider>
    </>
}


const ProgramMainPage: FC = observer(() => {
    const store = useProgramSearchStore();
    const match = useRouteMatch()
    return <Wrapper>
        <Switch>
            <Route path={match.url} exact>
                <Grid fluid>
                    <Row className="row">
                        <ProgramMainHeader
                            iconImgURL={store.iconImgURL}
                            isBookmarked={store.isBookmarked}
                            title={store.title}
                            subtitle={store.subtitle}
                            onToggleBookmarked={store.toggleBookmarked}
                        />
                    </Row>

                    <Row className="row">
                        <Col xs={6}>
                            <RowTitle>검색어로 찾기</RowTitle>
                        </Col>
                        <Col xs={18}>
                            <Link to={`${match.url}/search/text`}>
                                <SimpleSearchBar
                                    placeholder="검색하실 기능 또는 단축키를 입력하세요 :)"
                                    onInputText={store.searchText}
                                />
                            </Link>
                        </Col>
                    </Row>

                    <Row className="row">
                        <Col xs={6}>
                            <RowTitle>키보드로 찾기</RowTitle>
                        </Col>
                        <Col xs={18}>
                            <Link to={`${match.url}/search/keyboard`}>
                                <Keyboard activedKeycaps={store.activedKeycaps}/>
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
                                    onSelectCategory={store.selectCategory}
                                />
                            </Link>
                        </Col>
                    </Row>
                </Grid>
            </Route>

            <Route path={`/programs/:programCode/search/:type`}>
                <ProgramSearchPage/>
            </Route>
        </Switch>
    </Wrapper>
})
