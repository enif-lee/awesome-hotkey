import {createContext} from 'react'
import {makeAutoObservable} from 'mobx'

import KeycapType from '../models/keycap-type'
import HotkeyModel from '../models/hotkey-model'


const CategoryAll: string = 'All'


class ProgramSearch {

    private _isBookmarked: boolean = false
    private _searchingText: string = ''
    private _selectedCategory: string = ''
    private _selectedHotkeyIndex: number = -1


    constructor() {
        makeAutoObservable(this)
    }


    // MARK: - Get

    public get title(): string {
        return 'Photoshop'
    }

    public get subtitle(): string {
        return 'CC 2020'
    }

    public get iconImgURL(): string {
        return 'https://picsum.photos/200'
    }

    public get isBookmarked(): boolean {
        return this._isBookmarked
    }

    public get categories(): string[] {
        return [
            ...this.hotkeys
                .flatMap((hotkey) => hotkey.categories)
                .filter((v, i, a) => a.indexOf(v) === i), // unique
            CategoryAll
        ]
    }

    public get hotkeys(): HotkeyModel[] {
        return [
            {
                description: '실행 취소',
                keycaps: [KeycapType.LCtrl, KeycapType.Z],
                categories: ['Test']
            },
            {
                description: '잘라내기',
                keycaps: [KeycapType.LCtrl, KeycapType.X],
                categories: ['Test', 'Text', 'Edit']
            },
            {
                description: '복사 붙여넣기',
                keycaps: [KeycapType.LCtrl, KeycapType.C, KeycapType.V],
                categories: ['Test', 'Text', 'Edit']
            },
            {
                description: '새 시크릿 창 열기',
                keycaps: [KeycapType.LCtrl, KeycapType.LShift, KeycapType.N],
                categories: ['Test', 'Tab']
            }
        ]
    }

    public get activedKeycaps(): KeycapType[] {
        if(this._selectedHotkeyIndex < 0) {
            return []
        }

        return this.hotkeys[this._selectedHotkeyIndex].keycaps
    }

    public get selectedCategory(): string {
        if(this._selectedCategory === '') {
            return CategoryAll
        }

        return this._selectedCategory
    }
    
    public filteredHotkeys = (tab: string) => {
        switch(tab) {
            case 'text':
                return this.hotkeys
                    .filter((hotkey) => hotkey.description.includes(this._searchingText))

            case 'keyboard':
                return this.hotkeys

            case 'category':
                return this.hotkeys
                    .filter((hotkey) => this._selectedCategory === '' || hotkey.categories.includes(this._selectedCategory))
        }
    }


    // MARK: - Set

    public toggleBookmarked = () => {
        this._isBookmarked = !this._isBookmarked
    }

    public searchText = (text: string) => {
        this._searchingText = text
    }

    public selectCategory = (category: string) => {
        if(category === CategoryAll) {
            this._selectedCategory = ''
            return
        }

        this._selectedCategory = category
    }

    public selectHotkey = (index: number) => {
        this._selectedHotkeyIndex = index
    }

}


export default createContext(new ProgramSearch())