import {makeAutoObservable} from 'mobx'
import KeycapType, {KeyKeycapMap} from '../models/keycap-type'
import HotkeyModel from '../models/hotkey-model'
import {bookmarkStore, BookmarkStore} from "./bookmark-store";
import {
    getProgramDetail,
    getProgramHotkeyCategories,
    getProgramHotkeys,
    Program,
    ProgramCode
} from "../data/dataloader";
import {createContext, useContext} from "react";
import {SettingStore, settingStore} from "./settingStore";

const CategoryAll: string = 'All'


export class ProgramSearchStore {
    programCode: string = ''
    private _searchingText: string = ''
    private _selectedCategory: string = ''
    private _selectedHotkeyIndex: number = -1
    bookmarkStore: BookmarkStore;
    settingStore: SettingStore;
    private _detail: Program;

    constructor(code: ProgramCode) {
        makeAutoObservable(this, {
            bookmarkStore: false,
            settingStore: false
        })
        this.programCode = code;
        this.bookmarkStore = bookmarkStore;
        this.settingStore = settingStore;
        this._detail = getProgramDetail(code)
    }

    // MARK: - Get
    public get title(): string {
        return this._detail.name;
    }

    public get subtitle(): string {
        return this._detail.description;
    }

    public get iconImgURL(): string {
        return "/image/" + this._detail.image;
    }

    public get isBookmarked(): boolean {
        return this.bookmarkStore.isBookmarked(this.programCode)
    }

    public get categories(): string[] {
        return [
            ...getProgramHotkeyCategories(this.programCode),
            CategoryAll
        ]
    }

    public get hotkeys(): HotkeyModel[] {
        return getProgramHotkeys(this.programCode)
            .map<HotkeyModel>(key => ({
                description: key.description.ko,
                keycaps: (key.key[this.settingStore.os] || []).map(value => KeyKeycapMap[value] || KeycapType.Empty),
                categories: key.category
            }));
    }

    public get activedKeycaps(): KeycapType[] {
        if (this._selectedHotkeyIndex < 0) {
            return []
        }

        return this.hotkeys[this._selectedHotkeyIndex].keycaps
    }

    public get selectedCategory(): string {
        if (this._selectedCategory === '') {
            return CategoryAll
        }

        return this._selectedCategory
    }

    public filteredHotkeys(tab: string): HotkeyModel[] {
        switch (tab) {
            case 'text':
                return this.hotkeys
                    .filter((hotkey) => (hotkey.description || '').includes(this._searchingText))

            case 'keyboard':
                return this.hotkeys

            case 'category':
                return this.hotkeys
                    .filter((hotkey) => this._selectedCategory === '' || hotkey.categories.includes(this._selectedCategory))

            default:
                return []
        }
    }


    // MARK: - Set
    public toggleBookmarked = () => {
        return this.bookmarkStore.toggleBookmark(this.programCode)
    }

    public searchText = (text: string) => {
        this._searchingText = text
    }

    public selectCategory = (category: string) => {
        if (category === CategoryAll) {
            this._selectedCategory = ''
            return
        }
        this._selectedCategory = category
    }

    public selectHotkey = (index: number) => {
        this._selectedHotkeyIndex = index
    }

}

export const ProgramSearchStoreContext = createContext<ProgramSearchStore>(new ProgramSearchStore("adobe.photoshop"))

export function useProgramSearchStore() {
    return useContext(ProgramSearchStoreContext)
}
