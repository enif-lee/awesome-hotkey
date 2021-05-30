import {FC, useCallback, useEffect, useMemo, useState} from "react"
import {Button, Col, FlexboxGrid, Grid, Icon, Input, InputGroup, List, Notification, Row} from "rsuite";
import InputGroupAddon from "rsuite/es/InputGroup/InputGroupAddon";
import styled from "@emotion/styled";
import logo from '../../assets/logo.png'

import mainBgGd from "../../assets/main_bg_gd.svg";
import {css} from "@emotion/css";
import {observer} from "mobx-react-lite";
import {recentSearchStore} from "../stores/recent-search-store";
import {Link, useHistory} from "react-router-dom";
import {getPrograms, getProgramsByCategory, Program} from "../data/dataloader";
import {bookmarkStore} from "../stores/bookmark-store";
import {useMedia} from "react-use";
import _ from "lodash";
import {ButtonProps} from "rsuite/lib/Button/Button";
import {IconProps} from "rsuite/lib/Icon/Icon";


const MainBackground = styled.div`
  padding: 80px 0;
  background-image: url(${mainBgGd});
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1000;
  height: 670px;
  position: relative; // don't remove this, for applying search bar z-index
`

const MainTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 12px;
`

const MainSearchInput = styled(Input)`
  border-radius: 2rem;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0);
`

const MainSubTitle = styled.h2`
  font-size: 1rem;
  color: #606060;
  margin-bottom: 36px;
`
const MainLogo = styled.img`
  margin: 45px 0;
  width: 192px;
`

const MainInputGroupAddon = styled(InputGroupAddon)`
  padding: 1rem 0 1rem 1.5rem;
  background-color: rgba(0, 0, 0, 0);
`

const MainInputGroup = styled(InputGroup)`
  max-width: 480px;
  margin: 0 auto;
  border-radius: 30px;
  border: 0 !important;
  min-height: 60px;
  overflow: hidden
`

const SelectedInputGroup = styled.div`
  margin: 0 auto;
  border-radius: 30px;
  border: 1px #606060 solid;
  min-height: 60px;
  max-width: 480px;
  background-color: rgba(0, 0, 0, 0.6);
`

const RecentSearchList = styled.div`
  margin: 0 20px 20px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);

  .sub-title {
    text-align: left;
    color: #606060;
    font-size: 12px;
    margin: 12px 0;

  }

  .search-item-icon {
    text-align: left;
  }

  .search-item-program {
    text-align: left;
  }

  .search-item-time {
    text-align: right;
    font-size: 0.75rem;
    color: #606060;
  }
`

const SearchList = styled(List)`
  box-shadow: none;
`

const SearchListItem = styled(List.Item)`
  padding: 0.75rem 1rem;
  background: rgba(0, 0, 0, 0);
  border: 0 !important;
  color: white;
  box-shadow: none;

  &:hover {
    font-weight: bold;
    cursor: pointer;
  }
`

function useWideCheck(): boolean {
    return useMedia('(min-width: 1200px)');
}

export const ContentLayout: FC = ({children}) => {
    return <FlexboxGrid justify={"center"} align={"middle"} className={css`text-align: center;`}>
        <FlexboxGrid.Item colspan={16}>
            {children}
        </FlexboxGrid.Item>
    </FlexboxGrid>
}

const SearchEntry: FC<{
    icon: JSX.Element,
    programName: string,
    time?: string
}> = ({programName, time, icon}) => {
    return <FlexboxGrid>
        <FlexboxGrid.Item className="search-item-icon" colspan={2}>{icon}</FlexboxGrid.Item>
        <FlexboxGrid.Item className="search-item-program" colspan={18}><span>{programName}</span></FlexboxGrid.Item>
        {time && <FlexboxGrid.Item className="search-item-time" colspan={4}><span>{time}</span></FlexboxGrid.Item>}
    </FlexboxGrid>;
}


const RecommendProgramsComponentItemImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 12px;
  margin-bottom: 0.5rem;
`

const RecommendProgramsComponentItem: FC<{ program: Program }> = ({program}) => {
    const colSpan = useWideCheck() ? 4 : 8;

    return <FlexboxGrid.Item colspan={colSpan}>
        <Link to={"/programs/" + program.code}>
            <RecommendProgramsComponentItemImg src={"/image/" + program.image}/>
            <p className={css`font-size: 0.75rem;
              margin-bottom: 0.75rem;
              color: white;
              text-decoration: none;`}>{program.name}</p>
        </Link>
    </FlexboxGrid.Item>
}

type PaginationButtonProps = Pick<ButtonProps, "onClick" | "disabled"> & Pick<IconProps, "icon" | "size">;
const PaginationButton: FC<PaginationButtonProps> = ({onClick, disabled, size, icon}) => {
    return <Button onClick={onClick} disabled={disabled} className={css`background-color: rgba(0, 0, 0, 0) !important;
      padding: 20px;`}>
        <Icon icon={icon} size={size} className={css`color: rgba(255, 255, 255, .25)`}/>
    </Button>
}


const RecommendProgramsComponent: FC<{ title: string, programs: Program[] }> = ({title, programs}) => {
    const [pageIndex, setPage] = useState(0);
    const next = useCallback(() => setPage(pageIndex + 1), [pageIndex]);
    const prev = useCallback(() => setPage(pageIndex - 1), [pageIndex]);

    const isWide = useWideCheck();
    const pageSize = isWide ? 6 : 3;
    const pagePrograms = programs.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize);
    return <>
        <div className={css`width: 100%;
          margin: 0 auto;
          padding-top: 60px;
          max-width: 900px;`}>
            <FlexboxGrid justify={"center"} align={"middle"}>
                <FlexboxGrid.Item colspan={2}>
                    <PaginationButton onClick={prev} disabled={pageIndex == 0} icon={"left"} size={"3x"}/>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={20}>
                    <p className={css`margin-bottom: 1rem;
                      font-size: 1.25rem;`}>{title}</p>
                    <FlexboxGrid justify={"center"} align={"middle"}>
                        {pagePrograms.map(program => <RecommendProgramsComponentItem program={program}
                                                                                     key={program.code}/>)}
                    </FlexboxGrid>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={2}>
                    <PaginationButton onClick={next} disabled={Math.floor(programs.length / pageSize) <= pageIndex}
                                      icon={"right"} size={"3x"}/>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    </>
}


type ProgramCategoryCardProps = { title: string, category: string };
const ProgramCategoryCard: FC<ProgramCategoryCardProps> = ({title, category}) => {

    const programs = useMemo(() => getProgramsByCategory(category), [category]);
    const chunkedPrograms = _.chunk(programs, 3).map((value, index) => ({value, index}))
    const padding = useWideCheck()
        ? 8
        : 24;
    return <div className={css`margin: 1.5rem 0.5rem;
      padding: 1.5rem;
      background-color: #101011;
      border: 1px solid rgba(255, 255, 255, .1)`}>
        <h5 className={css`margin-bottom: 12px;
          text-align: left;`}>{title}</h5>
        <Grid fluid>
            {chunkedPrograms.map(chunk =>
                <Row className={css`margin-bottom: 12px;`} key={chunk.index}>
                    {chunk.value.map(program => <Link to={"/programs/" + program.code} key={program.code}>
                        <Col sm={8} className={css`padding: ${padding}px`}>
                            <img src={"/image/" + program.image} className={css`width: 100%;
                              border-radius: 8px;
                              overflow: hidden;`}/>
                        </Col>
                    </Link>)}
                </Row>
            )}
        </Grid>
    </div>
}

type ProgramCategoryCardColumn = {
    cards: ProgramCategoryCardProps[]
}
const ProgramCategoryCardColumn: FC<ProgramCategoryCardColumn> = ({cards}) => {
    return <Col xs={24} smPush={2} sm={20} mdPush={3} md={18} lgPush={0} lg={8}>
        {cards.map(card => <ProgramCategoryCard {...card} key={card.title}/>)}
    </Col>
}

const TipCard: FC<{ id: string }> = ({id}) => {
    console.log(id)
    return <div className={css`padding: 20px 10px;
      overflow: hidden;`}>
        <img className={css`width: 100%;
          max-width: 400px;
          margin: 0 auto;
          display: block;`} src={`/image/tool-tip/${id}.png`}/>
    </div>
}

const RelativeHotKeyTips: FC<{ tooltips: string[] }> = ({tooltips}) => {
    const [pageIndex, setPage] = useState(0);
    const next = useCallback(() => setPage(pageIndex + 1), [pageIndex]);
    const prev = useCallback(() => setPage(pageIndex - 1), [pageIndex]);
    const pagedTooltips = _.chunk(tooltips, 3);


    return <FlexboxGrid justify={"center"} align={"middle"}>
        <FlexboxGrid.Item colspan={2}>
            <PaginationButton onClick={prev} disabled={pageIndex == 0} icon={"left"} size={"3x"}/>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={20}>
            <div className={css`padding: 2rem 0;`}>
                <h4 className={css`text-align: center;`}>관련 단축키 팁</h4>
                <div className={css`margin: 0 auto;`}>
                    <hr className={css`width: 35px;
                      height: 5px;
                      background-color: white;`}/>
                </div>
                <Grid fluid className={css`max-width: 1200px;`}>
                    <Row>
                        {pagedTooltips[pageIndex].map(tipId => <Col lg={8} sm={24} key={tipId}>
                            {tipId.startsWith("c") && <TipCard id={tipId[1]}/>}
                            {!tipId.startsWith("c") && <Link to={"tool-tips/" + tipId}><TipCard id={tipId}/></Link>}
                        </Col>)}
                    </Row>
                </Grid>
            </div>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={2}>
            <PaginationButton onClick={next} disabled={(pagedTooltips.length - 1) == pageIndex} icon={"right"}
                              size={"3x"}/>
        </FlexboxGrid.Item>
    </FlexboxGrid>
}

function takeFilteredList<T extends { name: string, code: string }>(entries: T[], filter: string): T[] {
    const lowerFilter = filter.toLowerCase();
    return entries
        .filter(({name, code}) => name.toLowerCase().includes(lowerFilter) || code.toLowerCase().includes(lowerFilter))
        .slice(0, 5)
}

const MainContentPage: FC = observer(props => {
    const [recentHistories, setFocus] = useState(false);
    const [searchText, setSearchText] = useState('');

    const programs = useMemo(() => getPrograms(), []);
    const history = useHistory();

    const close = useCallback(() => setFocus(false), []);
    const open = useCallback((e: Event) => setTimeout(() => setFocus(true), 0), [])

    useEffect(() => {
        if (recentHistories) {
            window.addEventListener('click', close)
        } else {
            window.removeEventListener('click', close)
        }
    }, [recentHistories])

    const recentSearch = recentSearchStore.searchHistory
    const searchPrograms = takeFilteredList(programs, searchText);
    const onPressEnterSearch = () => {
        let programCode: string = searchText
            ? searchPrograms[0]?.code
            : recentSearch[0]?.code;

        if (!programCode) {
            Notification["error"]({
                title: "검색된 프로그램이 없습니다.",
                description: "최소 하나 이상의 검색된 결과가 있어야합니다."
            })
            return;
        }
        history.push('/programs/' + programCode)
    };
    return <>
        <MainBackground>
            <ContentLayout>
                <MainLogo src={logo} alt={"logo"}/>
                <MainTitle>We'll find you a Hotkey.</MainTitle>
                <MainSubTitle>단축키를 사용하시면 업무효율을 200% 올려줄 수 있습니다!</MainSubTitle>

                <SelectedInputGroup>
                    <form onClick={e => e.stopPropagation()} onSubmit={e => e.preventDefault()}>
                        <MainInputGroup>
                            <MainInputGroupAddon><Icon icon={"search"}/></MainInputGroupAddon>
                            <MainSearchInput placeholder={"Input program name to search."} onClick={open}
                                             onChange={setSearchText} onPressEnter={onPressEnterSearch}/>
                        </MainInputGroup>
                        {recentHistories && <RecentSearchList>
                            {!searchText && <>
                                <p className="sub-title">최근 검색한 툴</p>
                                <SearchList>
                                    {recentSearch
                                        .slice()
                                        .sort(search => new Date(search.time).getTime())
                                        .reverse()
                                        .slice(0, 5)
                                        .map(({name, code, time}) =>
                                            <Link to={"/programs/" + code} key={code}>
                                                <SearchListItem>
                                                    <SearchEntry icon={<Icon icon={"clock-o"}/>}
                                                                 programName={name}
                                                                 time={new Date(time).toLocaleDateString()}/>
                                                </SearchListItem>
                                            </Link>
                                        )}
                                </SearchList></>}
                            {searchText && <><p className="sub-title">검색된 툴</p>
                                <SearchList>
                                    {searchPrograms
                                        .map(({name, code}) => <Link to={"/programs/" + code} key={code}>
                                                <SearchListItem>
                                                    <SearchEntry icon={<Icon icon={"project"}/>} programName={name}/>
                                                </SearchListItem>
                                            </Link>
                                        )}
                                </SearchList>
                            </>}
                        </RecentSearchList>}
                    </form>
                </SelectedInputGroup>
            </ContentLayout>
        </MainBackground>
        <ContentLayout>
            {bookmarkStore.bookmarksWithDetail.length > 0 &&
            <RecommendProgramsComponent title={"즐겨찾는 프로그램"} programs={bookmarkStore.bookmarksWithDetail}/>}
            <RecommendProgramsComponent title={"자주 사용하는 프로그램"} programs={programs}/>
        </ContentLayout>
        <div className={css`margin-top: 90px;`}>
            <ContentLayout>
                <Grid fluid className={css`max-width: 1000px;`}>
                    <Row>
                        <ProgramCategoryCardColumn cards={[
                            {title: "문서", category: "document"},
                            {title: "개발", category: "development"},
                        ]}/>
                        <ProgramCategoryCardColumn cards={[
                            {title: "그래픽디자인", category: "graphic"},
                            {title: "UX/UI", category: "ux/ui"},
                            {title: "사진", category: "picture"},
                        ]}/>
                        <ProgramCategoryCardColumn cards={[
                            {title: "3D/AR", category: "3d/ar"},
                            {title: "비디오", category: "video"},
                        ]}/>
                    </Row>
                </Grid>
            </ContentLayout>
        </div>
        <ContentLayout>
            <RelativeHotKeyTips tooltips={["1", "2", "3", "c4", "c5", "c6"]}/>
        </ContentLayout>
    </>
})

export default MainContentPage
