import {FC} from 'react'
import styled from '@emotion/styled'

import BookmarkableProgramIcon from './bookmarkable-program-icon'


interface ProgramMainHeaderProps {
    iconImgURL: string
    isBookmarked: boolean
    title: string
    subtitle: string
    onToggleBookmarked: () => void
}


const Header = styled.div`
    margin: 60px 0;
    text-align: center;

    > * {
        margin: 8px 0;
    }
`

const Title = styled.h2`
    text-align: center;
`

const Subtitle = styled.h6`
    text-align: center;
`


const ProgramMainHeader: FC<ProgramMainHeaderProps> = props => (
    <Header>
        <BookmarkableProgramIcon
            imgURL={props.iconImgURL}
            isBookmarked={props.isBookmarked}
            onToggleBookmarked={props.onToggleBookmarked}
        />
        <Title>{props.title}</Title>
        <Subtitle>{props.subtitle}</Subtitle>
    </Header>
)


export default ProgramMainHeader