import {FC, useContext} from 'react'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'
import {Row, Col} from 'rsuite'
import {Route, Switch, useRouteMatch, useParams} from 'react-router-dom'

import CategoryGrid from '../../components/program/category-grid'
import HotkeyTable from '../../components/hotkey/hotkey-table'
import Keyboard from '../../components/keyboard/keyboard'
import KeycapList from '../../components/keyboard/keycap-list'
import ProgramSearchHeader from '../../components/program/program-search-header'
import SimpleSearchBar from '../../components/search/simple-search-bar'

import ProgramSearchStore from '../../stores/program-search'


const Wrapper = styled.div`
    width: 620px;
    margin: 0 auto;

    > div {
        margin: 48px 0;
    }

    .flex-row {
        display: flex;

        .height-filled {
            position: relative;
            height: 100%;
            text-align: left;

            .bottom-fixed {
                position: absolute;
                bottom: 0;

                > div {
                    display: inline-block;
                }
            }
        }
    }
`

const RowTitle = styled.div`
    line-height: 40px;
    font-size: 20px;
`

const KeyboardWrapper = styled.div`
    float: right;
    margin-top: 8px;
`


const ProgramSearchPage: FC = observer(() => {
    const store = useContext(ProgramSearchStore)

    const match = useRouteMatch()
    const {programCode} = useParams<{programCode: string}>()

    store.setProgramCode(programCode)

    return <Wrapper>
        <Row>
            <ProgramSearchHeader
                iconImgURL={store.iconImgURL}
                isBookmarked={store.isBookmarked}
                title={store.title}
                subtitle={store.subtitle}
                tabs={[
                    {key: 'text', title: '키워드 검색'},
                    {key: 'keyboard', title: '키보드 검색'},
                    {key: 'category', title: '기능별 검색'}
                ]}
                selectedTabKey={tabKeyFromLocation()}
                onToggleBookmarked={store.toggleBookmarked}
            />
        </Row>

        <Row gutter={0} className="flex-row">
            <Col xs={6}>
                <div className="height-filled">
                    <RowTitle>
                        {rowTitleFromTabKey()}
                    </RowTitle>
                    
                    <Switch>
                        <Route path={`${match.url}/keyboard`}>
                            <div className="bottom-fixed">
                                <KeycapList keycaps={store.activedKeycaps} />
                            </div>
                        </Route>
                    </Switch>
                </div>
            </Col>
            <Col xs={18}>
                <Switch>
                    <Route path={`${match.url}/text`}>
                        <SimpleSearchBar
                            placeholder="검색하실 기능 또는 단축키를 입력하세요 :)"
                            onInputText={store.searchText}
                        />
                    </Route>

                    <Route path={`${match.url}/keyboard`}>
                        <KeyboardWrapper>
                            <Keyboard activedKeycaps={store.activedKeycaps} />
                        </KeyboardWrapper>
                    </Route>

                    <Route path={`${match.url}/category`}>
                        <CategoryGrid
                            categories={store.categories}
                            selectedCategory={store.selectedCategory}
                            onSelectCategory={store.selectCategory}
                        />
                    </Route>
                </Switch>
            </Col>
        </Row>

        <Row>
            <HotkeyTable
                hotkeys={store.filteredHotkeys(tabKeyFromLocation())}
                onSelectHotkey={store.selectHotkey}
            />
        </Row>
    </Wrapper>
})


function tabKeyFromLocation(): string {
    const components: string[] = location.pathname.split('/')
    
    return components[components.length - 1]
}

function rowTitleFromTabKey(): string {
    switch(tabKeyFromLocation()) {
        case 'text':
            return '검색어로 찾기'

        case 'keyboard':
            return '키보드로 찾기'

        case 'category':
            return '분류별로 찾기'

        default:
            return ''
    }
}


export default ProgramSearchPage