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

export function getPrograms(): Program[] {
    return getStaticData().programs;
}

export function getProgramsByCategory(category: string): Program[] {
    return getStaticData().programs.filter(program => program.category.includes(category));
}

export function getProgramsByCategories(categories: string[]): Program[] {
    return categories.map(key => getProgramsByCategory(key)).flat();
}

export function isSupportProgram(code: ProgramCode): boolean {
    return getStaticData().programs.some(program => program.code == code);
}

export function getProgramDetail(code: ProgramCode): Program {
    const detail = getStaticData().programs.find(program => program.code == code);
    if (!detail)
        throw new Error("찾을 수 없는 프로그램 코드입니다.")
    return detail;
}


export function getProgramHotkeyCategories(code: ProgramCode): string[] {
    const categories = getProgramHotkeys(code).map(hotkey => hotkey.category).flat();
    return [...new Set(categories)]
}

export function getProgramHotkeys(code: ProgramCode): Hotkey[] {
    return getStaticData().hotkeys.filter(hotkey => hotkey.programCode == code)
}
