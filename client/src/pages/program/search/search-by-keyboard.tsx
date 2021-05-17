import {FC, useContext} from 'react'
import {observer} from 'mobx-react-lite'

import HotkeyList from '../../../components/hotkey/hotkey-list'
import Keyboard from '../../../components/keyboard/keyboard'
import ProgramSearchHeader from '../../../components/program/program-search-header'

import ProgramSearchStore from '../../../stores/program-search'


interface KeySearchByKeyboardPageProps {
    title: string
    subtitle: string
}


const KeySearchByKeyboardPage: FC<KeySearchByKeyboardPageProps> = observer(props => {
    const store = useContext(ProgramSearchStore)

    return (
        <div>
            <ProgramSearchHeader
                iconImgURL={store.iconImgURL()}
                isBookmarked={store.isBookmarked}
                title={props.title}
                subtitle={props.subtitle}
                tabIndex={store.tabIndex}
                onToggleBookmarked={store.toggleBookmarked}
                onSelectTab={store.selectTab}
            />
            <Keyboard />
            <HotkeyList />
        </div>
    )
})


export default KeySearchByKeyboardPage
