import {makeAutoObservable} from "mobx";
import {autoSave} from "../util/auto-store";

export class BookmarkStore {
    programs: string[]

    constructor() {
        makeAutoObservable(this)
        this.programs = []
        autoSave(this, 'bookmarks')
    }

    public isBookmarked(program: string): boolean {
        return this.programs.includes(program);
    }

    toJson(): any {
        return {
            programs: this.programs
        }
    }
}