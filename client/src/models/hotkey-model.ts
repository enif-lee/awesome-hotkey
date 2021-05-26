import KeycapType from '../models/keycap-type'


interface HotkeyModel {
    description: string
    keycaps: KeycapType[]
    categories: string[]
}


export default HotkeyModel