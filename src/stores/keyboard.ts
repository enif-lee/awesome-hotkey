import {createContext} from 'react'
import {makeAutoObservable} from 'mobx'

import KeycapType from '../utils/keycap-type'
import HotkeyModel from '../utils/hotkey-model'


class Keyboard {

    keycaps: KeycapType[] = Object.values(KeycapType)
    activedKeycaps: KeycapType[] = []


    constructor() {
        makeAutoObservable(this)
    }


    selectKeycap = (keycap: KeycapType) => {
        this.activedKeycaps.push(keycap)
    }


    // TODO: - temp. 로직 분리 필요

    hotkeys: HotkeyModel[] = [
        {
            description: '실행 취소',
            keycaps: [KeycapType.LCtrl, KeycapType.Z]
        },
        {
            description: '실행 취소취소',
            keycaps: [KeycapType.LCtrl, KeycapType.LShift, KeycapType.Z]
        },
        {
            description: '잘라내기',
            keycaps: [KeycapType.LCtrl, KeycapType.X]
        }
    ]
    
    activedHotkeyIndex: number = -1

    selectHotkey = (index: number) => {
        this.activedKeycaps = this.hotkeys[index].keycaps
        this.activedHotkeyIndex = index
    }

}

 
export default createContext(new Keyboard())