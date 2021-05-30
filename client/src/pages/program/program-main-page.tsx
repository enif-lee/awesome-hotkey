import {FC, useEffect} from 'react';
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'
import {Link, Route, Switch, useHistory, useParams, useRouteMatch} from 'react-router-dom'
import {Col, Grid, Row} from 'rsuite'

import CategoryGrid from '../../components/program/category-grid'
import Keyboard from '../../components/keyboard/keyboard'
import ProgramMainHeader from '../../components/program/program-main-header'
import SimpleSearchBar from '../../components/search/simple-search-bar'
import TipWidget from '../../components/tip-widget'

import ProgramSearchPage from './program-search-page'
import {ProgramSearchStore, ProgramSearchStoreContext, useProgramSearchStore} from "../../stores/program-search-store";
import {isSupportProgram} from "../../data/dataloader";
import {recentSearchStore} from "../../stores/recent-search-store";


const Wrapper = styled.div`
`

const Container = styled.div`
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

const KeyboardContainer = styled.div`
  float: right;
  margin-top: 8px;
`

const TipWidgetContainer = styled.div`
  position: fixed;
  top: 25%;
  left: 50%;
  margin-left: 360px;
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
    const history = useHistory()
    useEffect(() => {
        recentSearchStore.markHistory(store.programCode)
    }, [])

    return <Wrapper>
        <Container>
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
                                        autoFocus={false}
                                    />
                                </Link>
                            </Col>
                        </Row>

                        <Row className="row">
                            <Col xs={6}>
                                <RowTitle>키보드로 찾기</RowTitle>
                            </Col>
                            <Col xs={18}>
                                <KeyboardContainer>
                                    <Keyboard
                                        activedKeycaps={store.activedKeycaps}
                                        os={store.settingStore.os}
                                        onSelectKeycap={keycap => {
                                            store.toggleKeycap(keycap)
                                            history.push(`${match.url}/search/keyboard`)
                                        }}
                                    />
                                </KeyboardContainer>
                            </Col>
                        </Row>

                        <Row className="row">
                            <Col xs={6}>
                                <RowTitle>분류별로 찾기</RowTitle>
                            </Col>
                            <Col xs={18}>
                                <CategoryGrid
                                    categories={store.categories}
                                    selectedCategory={store.selectedCategory}
                                    onSelectCategory={category => {
                                        store.selectCategory(category)
                                        history.push(`${match.url}/search/category`)
                                    }}
                                />
                            </Col>
                        </Row>
                    </Grid>
                </Route>

                <Route path={`/programs/:programCode/search/:type`}>
                    <ProgramSearchPage/>
                </Route>
            </Switch>
        </Container>
        
        {store.tooltip && <TipWidgetContainer>
            <TipWidget
                id={store.tooltip.id}
                imgURL={store.tooltip.image}
                title={store.tooltip.title}
            />
        </TipWidgetContainer>}
    </Wrapper>
})
