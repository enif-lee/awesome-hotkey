import {FC} from 'react'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'
import {Col, Row} from 'rsuite'
import {useParams} from 'react-router-dom'

import CategoryGrid from '../../components/program/category-grid'
import HotkeyTable from '../../components/hotkey/hotkey-table'
import Keyboard from '../../components/keyboard/keyboard'
import KeyboardGuide from '../../components/keyboard/keyboard-guide'
import KeycapList from '../../components/keycap/keycap-list'
import ProgramSearchHeader from '../../components/program/program-search-header'
import SimpleSearchBar from '../../components/search/simple-search-bar'
import TipWidget from '../../components/tip-widget'

import {useProgramSearchStore} from '../../stores/program-search-store'


const Wrapper = styled.div`
`

const Container = styled.div`
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

  .fade-enter {
      opacity: 0;
      
      &.fade-enter-active {
          opacity: 1;
      }
    }
}
`

const RowTitle = styled.div`
  line-height: 40px;
  font-size: 20px;
`

const KeyboardContainer = styled.div`
  float: right;
  margin-top: 8px;
`

const TipWidgetContainer = styled.div`
  position: fixed;
  top: 30%;
  left: 50%;
  margin-left: 400px;
`


const animationStyles = {
    entering: { opacity: 0 },
    entered: { opacity: 1 }
}


const SearchTypeDescriptionMap: Record<string, string> = {
    "text": "검색어로 찾기",
    "keyboard": "키보드로 찾기",
    "category": "분류별로 찾기",
};

const ProgramSearchPage: FC = observer(() => {
    const store = useProgramSearchStore()
    const {type} = useParams<{ programCode: string, type: string }>()

    return <Wrapper>
        <Container>
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
                    selectedTabKey={type}
                    onToggleBookmarked={store.toggleBookmarked}
                />
            </Row>

            <Row gutter={0} className="flex-row">
                <Col xs={6}>
                    <div className="height-filled">
                        <RowTitle>
                            {SearchTypeDescriptionMap[type]}
                        </RowTitle>
                        
                        {type == 'keyboard' && <div className="bottom-fixed">
                            {store.hasActivedKeycaps && <KeycapList keycaps={store.activedKeycaps} />}
                            {!store.hasActivedKeycaps && <KeyboardGuide />}
                        </div>}
                    </div>
                </Col>
                <Col xs={18}>
                    {type == "text" && <SimpleSearchBar
                        placeholder="검색하실 기능 또는 단축키를 입력하세요 :)"
                        onInputText={store.searchText}
                    />}
                    {type == "keyboard" && <KeyboardContainer>
                        <Keyboard
                            activedKeycaps={store.activedKeycaps}
                            os={store.settingStore.os}
                            onSelectKeycap={store.toggleKeycap}
                        />
                    </KeyboardContainer>}
                    {type == "category" && <CategoryGrid
                        categories={store.categories}
                        selectedCategory={store.selectedCategory}
                        onSelectCategory={store.selectCategory}
                    />}
                </Col>
            </Row>

            <Row>
                <HotkeyTable
                    hotkeys={store.filteredHotkeys(type)}
                />
            </Row>
        </Container>

        <TipWidgetContainer>
            <TipWidget
                imgURL="https://picsum.photos/200/300"
                description="test"
            />
        </TipWidgetContainer>
    </Wrapper>
})

export default ProgramSearchPage
