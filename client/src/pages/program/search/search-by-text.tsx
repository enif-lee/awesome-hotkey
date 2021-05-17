import {FC, useContext} from 'react'
import {observer} from 'mobx-react-lite'

import ProgramSearchHeader from '../../../components/program/program-search-header'
import ProgramSearchStore from '../../../stores/program-search'


interface KeySearchByTextPageProps {
    title: string
    subtitle: string
}


const KeySearchByTextPage: FC<KeySearchByTextPageProps> = observer(props => {
    const store = useContext(ProgramSearchStore)

    return (
        <ProgramSearchHeader
            iconImgURL={store.iconImgURL()}
            isBookmarked={store.isBookmarked}
            title={props.title}
            subtitle={props.subtitle}
            tabIndex={store.tabIndex}
            onToggleBookmarked={store.toggleBookmarked}
            onSelectTab={store.selectTab}
        />
    )
})


export default KeySearchByTextPage