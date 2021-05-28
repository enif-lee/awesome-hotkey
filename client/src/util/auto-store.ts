import {autorun, set, toJS} from 'mobx'

export function autoSave(_this: any, name: string) {
    console.debug(name, "autoSave 시작!")
    const storedJson = localStorage.getItem(name)
    if (storedJson) {
        set(_this, JSON.parse(storedJson))
    }
    autorun(() => {
        const value = toJS(_this)
        localStorage.setItem(name, JSON.stringify(value))
    })
}