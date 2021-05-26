import {FC} from 'react'
import styled from '@emotion/styled'

import BookmarkableProgramIcon from './bookmarkable-program-icon'


interface ProgramMainHeaderProps {
    iconImgURL: string
    isBookmarked: boolean
    title: string
    subtitle: string
    onToggleBookmarked?: () => void
}


const Wrapper = styled.div`
    padding: 20px 0;
    text-align: center;

    > * {
        margin: 8px 0;
    }
`

const Title = styled.div`
    font-size: 40px;
    font-weight: bold;
`

const Subtitle = styled.div`
    font-size: 16px;
`


const ProgramMainHeader: FC<ProgramMainHeaderProps> = props => (
    <Wrapper>
        <BookmarkableProgramIcon
            imgURL={props.iconImgURL}
            isBookmarked={props.isBookmarked}
            onToggleBookmarked={props.onToggleBookmarked}
        />
        <Title>{props.title}</Title>
        <Subtitle>{props.subtitle}</Subtitle>
    </Wrapper>
)


export default ProgramMainHeader