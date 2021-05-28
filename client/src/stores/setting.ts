import {makeAutoObservable} from "mobx";
import {autoSave} from "../util/auto-store";


export enum OsType {
    Osx = "osx",
    Windows = "windows"
}

export class SettingStore {
    _fontSize: number = 16;
    _os: OsType = window.navigator.platform.includes("Win") ? OsType.Windows : OsType.Osx;

    get fontSize() {
        return this._fontSize
    }

    set fontSize(size: number) {
        this._fontSize = size
    }

    constructor() {
        makeAutoObservable(this)
        // this._fontSize = 16;
        // this._os = window.navigator.platform.includes("Win") ? OsType.Windows : OsType.Osx;
        autoSave(this, 'setting')
    }

    get os(): OsType {
        return this._os;
    }

    set os(value: OsType) {
        this._os = value;
    }

    setFontSize(size: number) {
        console.debug(size)
        this._fontSize = size
    }
}

export const setting = new SettingStore();
