import {FC, useContext} from 'react'
import styled from '@emotion/styled'
import {observer} from 'mobx-react-lite'

import {Grid, Row, Col} from 'rsuite'

import HotkeyTable from '../../../components/hotkey/hotkey-table'
import Keyboard from '../../../components/keyboard/keyboard'
import KeycapList from '../../../components/keyboard/keycap-list'
import ProgramSearchHeader from '../../../components/program/program-search-header'

import KeyboardStore from '../../../stores/keyboard'
import ProgramSearchStore from '../../../stores/program-search'


interface KeySearchByKeyboardPageProps {
    title: string
    subtitle: string
}


const Wrapper = styled.div`
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


const KeySearchByKeyboardPage: FC<KeySearchByKeyboardPageProps> = observer(props => {
    const store = useContext(ProgramSearchStore)
    const keyboardStore = useContext(KeyboardStore)

    return <Wrapper>
        <Row>
            <ProgramSearchHeader
                iconImgURL={store.iconImgURL()}
                isBookmarked={store.isBookmarked}
                title={props.title}
                subtitle={props.subtitle}
                tabIndex={store.tabIndex}
                onToggleBookmarked={store.toggleBookmarked}
                onSelectTab={store.selectTab}
            />
        </Row>
        <Row className="flex-row">
            <Col xs={8}>
                <div className="height-filled">
                    <h4>키보드로 찾기</h4>

                    <div className="bottom-fixed">
                        <KeycapList keycaps={keyboardStore.activedKeycaps} />
                    </div>
                </div>
            </Col>
            <Col xs={16}>
                <Keyboard />
            </Col>
        </Row>
        <Row>
            <HotkeyTable />
        </Row>
    </Wrapper>
})


export default KeySearchByKeyboardPage
