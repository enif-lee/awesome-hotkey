import {FC} from 'react'
import classNames from 'classnames/bind'
import styled from '@emotion/styled'

import BookmarkedOn from '../../assets/images/bookmarked-on.png'
import BookmarkedOff from '../../assets/images/bookmarked-off.png'


interface BookmarkableProgramIconProps {
    imgURL: string
    isBookmarked: boolean
    onToggleBookmarked: () => void
}


const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 120px;
  height: 120px;
`

const ProgramImg = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: lightgray;
  border-radius: 24px;
`

const BookmarkBtn = styled.a`
  position: absolute;
  right: -16px;
  bottom: -16px;
  width: 50px;
  height: 50px;
  background-image: url(${BookmarkedOff});
  background-size: contain;
  border-radius: 50%;
  transition: transform 0.3s ease-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1.3);
    transition: transform 0.2s ease;
  }

  &.--active {
    background-image: url(${BookmarkedOn});
  }
`


const BookmarkableProgramIcon: FC<BookmarkableProgramIconProps> = props => {
    return <Wrapper>
        <ProgramImg src={props.imgURL} />
        <BookmarkBtn
            className={classNames({'--active': props.isBookmarked})}
            onClick={() => props.onToggleBookmarked()}
        />
    </Wrapper>
}


export default BookmarkableProgramIcon
