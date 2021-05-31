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

import {useProgramSearchStore} from '../../stores/program-search-store'


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


const SearchTypeDescriptionMap: Record<string, string> = {
    "text": "검색어로 찾기",
    "keyboard": "키보드로 찾기",
    "category": "분류별로 찾기",
};


const ProgramSearchPage: FC = observer(() => {
    const store = useProgramSearchStore()
    const {type} = useParams<{ programCode: string, type: string }>()

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
                    autoFocus={true}
                    onInputText={store.searchText}
                />}
                {type == "keyboard" && <KeyboardContainer>
                    <Keyboard
                        activedKeycaps={store.activedKeycaps}
                        os={store.settingStore.os}
                        isKeyUpEnabled={true}
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
    </Wrapper>
})

export default ProgramSearchPage
