import {makeAutoObservable} from "mobx";
import {autoSave} from "../util/auto-store";
import {getProgramDetail, ProgramCode} from "../data/dataloader";


export interface SearchHistory {
    code: ProgramCode
    name: string
    time: Date
}

export class RecentSearchStore {

    searchHistory: SearchHistory[] = []

    constructor() {
        makeAutoObservable(this)
        autoSave(this, "recent-search")
    }

    markHistory(code: ProgramCode) {
        const detail = getProgramDetail(code);

        const history = this.searchHistory.find(value => value.code == code);
        if (history) {
            history.time = new Date()
        } else {
            this.searchHistory.push({
                time: new Date(),
                code: code,
                name: detail.name
            })
        }
    }
}


export const recentSearchStore = new RecentSearchStore();
