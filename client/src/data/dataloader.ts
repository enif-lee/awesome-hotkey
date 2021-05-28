import staticData from './program-hotkeys.json'

export type ProgramCategoryCode = string
export type ProgramCode = string

export interface ProgramCategory {
    code: ProgramCategoryCode;
    name: string;
}

export interface Program {
    code: ProgramCode;
    name: string;
    description: string;
    version?: any;
    image?: any;
    category: string[];
}

export interface Description {
    en: string;
    ko: string;
}

export interface Key {
    windows: string[];
    osx: string[];
}

export interface Hotkey {
    programCode: ProgramCode;
    category: ProgramCategoryCode[];
    description: Description;
    key: Key;
}

export interface StaticData {
    programCategories: ProgramCategory[];
    programs: Program[];
    hotkeys: Hotkey[];
}

export function getStaticData(): StaticData {
    return staticData as any;
}