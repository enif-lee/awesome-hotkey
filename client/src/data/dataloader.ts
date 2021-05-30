import staticData from '../../../tools/data/result.json'

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


export type ToolTipId = number

export interface ToolTip {
    id: ToolTipId;
    programCode: string | undefined;
    programIcons: string[]
    title: string;
    description: string;
    image: string;
    coverImage: string;
    article: Paragraph[][];
}

export interface Paragraph {
    type: string;
    title: string;
    description: string;
    image?: string;
    source?: string;
}


const toolTips: ToolTip[] = [
    {
        id: 1,
        image: "/image/tool-tip/1.png",
        programCode: '',
        programIcons: [],
        coverImage: "/image/tool-tip/content-1/cover.jpg",
        title: "액션(actions)을 이용해서\n자주 사용하는 과정을 단축키로 만들기",
        description: "액션은 여러 기능을 이용하여 작업하는 행동과정을 기록,저장 하여 다시 그 작업과정을 반복할 수 있게 도와주는 기능입니다. 이때 저장된 과정을 단축키로 지정하는 것이 가능하여 단순 반복작업 등에 큰 효율을 높힐 수 있으며 기존에 단축키를 제공하지 않는 기능들도 단축키로 적용하여 사용할 수 있게 됩니다.",
        article: [
            [
                {
                    type: "left",
                    title: "1. 이미지 불러오기",
                    description: "액션을 등록 하여 사용하기 전에 최초 1회 작업이 필요하기때문에 액션 효과를 적용할 이미지를 준비해 불러옵니다.",
                    image: "/image/tool-tip/content-1/hk_tip_1_action_1.jpg"
                },
            ],
            [
                {
                    type: "right",
                    title: "2. 액션창 활성화",
                    description: "액션창이 활성화 되어있지 않다면 ‘창(Window)-액션(Action)’을 선택하여 액션창을 활성화 합니다.",
                    image: "/image/tool-tip/content-1/hk_tip_1_action_2.jpg"
                },
            ],
            [
                {
                    type: "left",
                    title: "3. 새 액션 만들기",
                    description: "활성화 된 액션창에서 플러스 버튼을 클릭하여 새로운 액션을 등록합니다.",
                    image: "/image/tool-tip/content-1/hk_tip_1_action_3.jpg"
                },
                {
                    type: "left",
                    title: "",
                    description: "액션의 이름을 등록하고, 기능 키를 통해 단축키를 선택합니다. 액션 단축키는 F2~F12까지의 Function키 11종에 동시에 누룰 수 있는 Shift, Control(Command) 설정이 가능하여 총 44종의 단축키를 지정할 수 있습니다.",
                    image: "/image/tool-tip/content-1/hk_tip_1_action_4.jpg"
                },
            ],
            [
                {
                    type: "right",
                    title: "4. 등록할 효과 작업",
                    description: "기록하여 작업반복하고자 하는 작업을 진행합니다.\n" +
                        "예시 이미지의 경우, 모델들이 더욱 돋보이도록 어두운 부분은 더 어둡게 하고 밝은 부분은 더 밝게하여 강조하는 효과를 적용했습니다.",
                    image: "/image/tool-tip/content-1/hk_tip_1_action_5.jpg"
                },
            ],
            [
                {
                    type: "left",
                    title: "5. 완료버튼을 통해 기록 정지",
                    description: "기록하고자 하는 작업이 완료되었다면, 실행기록 정지 버튼을 클릭하여 액션 등록 모드를 종료합니다.",
                    image: "/image/tool-tip/content-1/hk_tip_1_action_6.jpg"
                },
            ],
            [
                {
                    type: "right",
                    title: "6. 다른 이미지에 적용해보기",
                    description: "등록된 액션이 잘 적용되었는지 확인해봅니다.",
                    image: "/image/tool-tip/content-1/hk_tip_1_action_7.jpg"
                },
                {
                    type: "right",
                    title: "",
                    description: "예시 이미지의 경우, 모델이 더욱 돋보일 수 있도록 등록했던 효과를 적용이 잘 된것을 확인할 수 있습니다. 이때 액션 등록 시 미리 설정해둔 Function을 이용한 단축키를 사용하여 적용하면 여러장의 이미지에 액션효과를 빠르게 입힐 수 있습니다.",
                    image: "/image/tool-tip/content-1/hk_tip_1_action_8.jpg"
                },
            ],
        ]
    },
    {
        id: 2,
        image: "/image/tool-tip/2.png",
        programIcons: [],
        programCode: '',
        coverImage: "/image/tool-tip/content-2/cover.jpg",
        title: "맥(Mac) 유저를 위한 사용자 지정\n단축키 지정하는 방법",
        description: "맥에서는 기본 설정되어있는 단축키 외에서 사용자가 원하는 다양한 단축키를 직접 지정해 만들 수 있는 기능이 있습니다. 이 기능을 이용하면 기존 단축키가 없던 프로그램에도 적용하여 편리하게 작업 할 수 있어 업무효율이 높아지도록 도움을 줍니다.",
        article: [
            [
                {
                    type: "left",
                    title: "1. 설정하고자 하는 프로그램 열기",
                    description: "핫키 등록 시 프로그램 정보를 기입해야하기 때문에 개인 지정 단축키를 설정하고자 하는 프로그램을 열어 준비합니다.",
                    image: "/image/tool-tip/content-2/hk_tip_2_mac_1.jpg"
                },
            ],
            [
                {
                    type: "right",
                    title: "2. Mac 기본 환경설정 열기",
                    description: "Mac프로그램 자체에 단축키를 등록하는 것 이므로 맥 운영체제의 환결설정을 연 뒤 키보드 - 단축키 - 앱단축키 순으로 진입합니다.",
                    image: "/image/tool-tip/content-2/hk_tip_2_mac_2.jpg"
                },
            ],
            [
                {
                    type: "left",
                    title: "3. 앱 단축키 탭에서 추가(+) 버튼 클릭",
                    description: "앱단축키 탭에 접근하였다면 추가(+)하기 버튼을 클릭하여 새로운 단축키를 생성합니다.",
                    image: "/image/tool-tip/content-2/hk_tip_2_mac_3.jpg"
                },
            ],
            [
                {
                    type: "right",
                    title: "4. 단축키 정보 기입하기",
                    description: "응용프로그램 탭에서 등록하고자 하는 프로그램을 선택합니다." +
                        "\n\n1번에서 실행시켜두었던 창을 통해 상세 메뉴 이름을 확인합니다. 만약 등록하고자 하는 단축키가 [설정-도형-직사각형]이라면 메뉴 제목에 ‘직사각형'을 정확히 기입합니다." +
                        "\n\n등록할 키보드 단축키를 입력합니다.",
                    image: "/image/tool-tip/content-2/hk_tip_2_mac_4.jpg"
                },
                {
                    type: "right",
                    title: "",
                    description: "",
                    image: "/image/tool-tip/content-2/hk_tip_2_mac_5.jpg"
                },
            ],
            [
                {
                    type: "left",
                    title: "5. 결과 확인하기",
                    description: "단축키 설정이 잘 되었는지 응용프로그램 창에서 등록한 단축키를 눌러 확인해봅니다.\n\n" +
                        "해당 방법을 이용하면, 기존에 핫키 등록이 되어있지 않았던 기능들도 편리하게 빠른 작업이 가능하여 업무 효율이 높아질 수 있습니다.",
                    image: "/image/tool-tip/content-2/hk_tip_2_mac_6.jpg"
                },
                {
                    type: "left",
                    title: "",
                    description: "",
                    image: "/image/tool-tip/content-2/hk_tip_2_mac_7.jpg"
                }
            ],
            [
                {
                    type: "youtube",
                    title: "원본 교육 영상",
                    description: "위 컨텐츠는 아래 원본 영상을 시청한 뒤 어썸핫키제작진의 설명추가로 제작된 컨텐츠 입니다. 원본은 아래 영상을 확인해주세요.",
                    source: "https://www.youtube.com/embed/lpg9y8KHmV0"
                }
            ]
        ]
    },
    {
        id: 3,
        image: "/image/tool-tip/3.png",
        programCode: '',
        programIcons: [],
        coverImage: "/image/tool-tip/content-3/cover.jpg",
        title: "윈도우(Windows) PC 유저를 위한 \n사용빈도가 높은 프로그램을 단축키 설정으로 빠르게 실행하는 방법",
        description: "수시로 사용하는 프로그램을 여러번의 클릭 필요없이 직접 설정해둔 단축키 한번으로 실행시킬 수 있도록 할 수 있습니다. \n프로그램의 실행 뿐만 아니라 웹사이트로의 연결도 ‘바로가기'기능을 통해 가능합니다. \n이 작업은 자주 사용하는 프로그램의 빠른 실행을 도와 업무 효율을 높힙니다.",
        article: [
            [
                {
                    type: "left",
                    title: "1. 프로그램의 속성창 띄우기",
                    description: "오른쪽 버튼을 클릭해 단축키를 등록하여 빠른 실행을 하고자 하는 프로그램의 속상 창을 띄웁니다.",
                    image: "/image/tool-tip/content-3/hk_tip_3_win_1.jpg"
                },
            ],
            [
                {
                    type: "right",
                    title: "2. 바로가기 키에 핫키 등록",
                    description: "원하는 프로그램의 속성창이 열리면 [바로 가기 키(K)]탭을 확인합니다. 기본 설정으로 ‘없음'으로 등록되어있으며 이 곳을 클릭하여 등록하고자 하는 단축키를 입력한 뒤, 확인을 눌러 등록을 완료합니다.",
                    image: "/image/tool-tip/content-3/hk_tip_3_win_2.jpg"
                }
            ],
            [
                {
                    type: "left",
                    title: "3. 바로가기 기능 응용하기",
                    description: "자주 방문하는 웹사이트의 경우 바로가기를 만들어 URL을 원하는 사이트로 등록 후 바로가기 키(K)설정에 핫키를 등록해두면 여러번의 클릭 없이 한번에 빠른 웹사이트 접속이 가능합니다.",
                    image: "/image/tool-tip/content-3/hk_tip_3_win_3.jpg"
                }
            ]

        ]
    }
]

export function getToolTips(): ToolTip[] {
    return toolTips;
}

export function getToolTipById(id: ToolTipId): ToolTip {
    return getToolTips().find(tip => tip.id == id)!;
}
