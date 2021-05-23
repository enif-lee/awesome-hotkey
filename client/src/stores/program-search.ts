import {createContext} from 'react'
import {makeAutoObservable} from 'mobx'


class ProgramSearch {

    isBookmarked: boolean = false
    tabIndex: number = 0


    constructor() {
        makeAutoObservable(this)
    }


    toggleBookmarked = () => {
        this.isBookmarked = !this.isBookmarked
    }

    selectTab = (index: number) => {
        this.tabIndex = index
    }


    iconImgURL = () => {
        return 'https://picsum.photos/200' // TODO:
    }

}


export default createContext(new ProgramSearch())