import {autorun, makeAutoObservable} from "mobx";
import {autoSave} from "./auto-store";

class Timer {
    _secondsPassed = 0

    constructor() {
        makeAutoObservable(this)
        autoSave(this, "sometimg")
        autorun(() => {
            console.log(this._secondsPassed + "tlqkf")
        })
    }

    set secs(num: number) {
        this._secondsPassed = num
    }

    increaseTimer() {
        this._secondsPassed += 1
    }
}

export const timer = new Timer()
setInterval(() => timer.secs = timer._secondsPassed + 1, 1000)
