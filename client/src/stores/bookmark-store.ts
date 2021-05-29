import {makeAutoObservable} from "mobx";
import {autoSave} from "../util/auto-store";
import {ProgramCode} from "../data/dataloader";

export class BookmarkStore {
    programs: ProgramCode[] = []

    constructor() {
        makeAutoObservable(this)
        autoSave(this, 'bookmarks')
    }

    public isBookmarked(program: string): boolean {
        return this.programs.includes(program);
    }

    public toggleBookmark(code: ProgramCode) {
        if (this.programs.includes(code)) {
            this.programs = this.programs.filter(programCode => programCode != code)
        } else {
            this.programs = [code, ...this.programs]
        }
    }

    toJson(): any {
        return {
            programs: this.programs
        }
    }
}

export const bookmarkStore = new BookmarkStore();

