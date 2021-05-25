import {FC, useEffect, useRef, useState} from "react"
import {Col, FlexboxGrid, Grid, Icon, Input, InputGroup, List, Row} from "rsuite";
import InputGroupAddon from "rsuite/es/InputGroup/InputGroupAddon";
import styled from "@emotion/styled";
import svg from '../../assets/logo.svg'

import mainBgGd from "../../assets/main_bg_gd.svg";
import {ContentLayout} from "../components/content-layout";
import {css} from "@emotion/css";


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
  box-shadow: none;

  &:hover {
    font-weight: bold;
    cursor: pointer;
  }
`

const SearchEntry: FC<{
    icon: JSX.Element,
    programName: string,
    time: string
}> = ({programName, time, icon}) => {
    return <FlexboxGrid>
        <FlexboxGrid.Item className="search-item-icon" colspan={2}>{icon}</FlexboxGrid.Item>
        <FlexboxGrid.Item className="search-item-program" colspan={18}><span>{programName}</span></FlexboxGrid.Item>
        <FlexboxGrid.Item className="search-item-time" colspan={4}><span>{time}</span></FlexboxGrid.Item>
    </FlexboxGrid>;
}


const RecommendProgramsComponentItemImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 12px;
  margin-bottom: 0.5rem;
`

const RecommendProgramsComponentItem: FC = () => {
    return <Col lg={4} xs={8}>
        <RecommendProgramsComponentItemImg src="https://via.placeholder.com/100"/>
        <p className={css`font-size: 0.75rem; margin-bottom: 0.75rem;`}>프로그램 이름</p>
    </Col>
}


const RecommendProgramsComponent: FC = () => {


    return <>
        <div className={css`width: 100%; margin: 0 auto; padding-top: 60px; max-width: 900px;`}>
            <FlexboxGrid justify={"center"} align={"middle"}>
                <FlexboxGrid.Item colspan={2}>
                    <Icon icon={"left"} size={"3x"} className={css`color: rgba(255, 255, 255, .25)`}/>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={20}>
                    <Grid fluid>
                        <Row>
                            <p className={css`margin-bottom: 1rem; font-size: 1.25rem;`}>자주 사용되는 프로그램</p>
                        </Row>
                        <Row gutter={30}>
                            <RecommendProgramsComponentItem/>
                            <RecommendProgramsComponentItem/>
                            <RecommendProgramsComponentItem/>
                            <RecommendProgramsComponentItem/>
                            <RecommendProgramsComponentItem/>
                            <RecommendProgramsComponentItem/>
                        </Row>
                    </Grid>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={2}><Icon icon={"right"} size={"3x"} className={css`color: rgba(255, 255, 255, .25)`}/></FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    </>
}


const ProgramCategoryCard: FC = () => {
    return <div className={css`margin: 1.5rem 0.5rem; padding: 1.5rem; background-color: #101011; border: 1px solid rgba(255, 255, 255, .1)`}>
        <h5 className={css`margin-bottom: 12px; text-align: left;`}>문서</h5>
        <Grid fluid>
            <Row className={css`margin-bottom: 12px;`}>
                <Col sm={8}><img src="https://via.placeholder.com/100" className={css`width: 100%`}/></Col>
                <Col sm={8}><img src="https://via.placeholder.com/100" className={css`width: 100%`}/></Col>
                <Col sm={8}><img src="https://via.placeholder.com/100" className={css`width: 100%`}/></Col>
            </Row>
            <Row className={css`margin-bottom: 12px;`}>
                <Col sm={8}><img src="https://via.placeholder.com/100" className={css`width: 100%`}/></Col>
                <Col sm={8}><img src="https://via.placeholder.com/100" className={css`width: 100%`}/></Col>
            </Row>
        </Grid>
    </div>
}
const ProgramCategoryCardColumn: FC = () => {
    return  <Col xs={24} smPush={2} sm={20} mdPush={4} md={16} lgPush={0} lg={8}>
        <ProgramCategoryCard/>
        <ProgramCategoryCard/>
        <ProgramCategoryCard/>
    </Col>
}

const MainContentPage: FC = props => {

    const recentSearch = [
        {program: 'A', time: '2021.05.12'},
        {program: 'B', time: '2021.05.12'},
        {program: 'C', time: '2021.05.12'},
        {program: 'D', time: '2021.05.12'},
    ]

    const [focused, setFocus] = useState(false);

    const input = useRef<HTMLInputElement>(null);
    useEffect(() => {
        const inputRef = input.current!;
        inputRef.onfocus = () => setFocus(true);
        inputRef.onblur = () => setFocus(false);
    }, [])


    return <>
        <MainBackground>
            <ContentLayout shiftTop={true}>
                <MainLogo src={svg} alt={"logo"}/>
                <MainTitle>We'll find you a Hotkey.</MainTitle>
                <MainSubTitle>단축키를 사용하시면 업무효율을 200% 올려줄 수 있습니다!</MainSubTitle>

                <SelectedInputGroup>
                    <MainInputGroup>
                        <MainInputGroupAddon><Icon icon={"search"}/></MainInputGroupAddon>
                        <MainSearchInput placeholder={"Input program name to search."} inputRef={input}/>
                    </MainInputGroup>
                    {focused && <RecentSearchList>
                        <p className="sub-title">최근 검색한 툴</p>
                        <SearchList>
                            {recentSearch.map(recent => <SearchListItem><SearchEntry icon={<Icon icon={"clock-o"}/>}
                                                                                     programName={recent.program}
                                                                                     time={recent.time}/></SearchListItem>)}
                        </SearchList>
                    </RecentSearchList>}
                </SelectedInputGroup>


            </ContentLayout>
        </MainBackground>
        <ContentLayout shiftTop={true}>
            <RecommendProgramsComponent/>
            <RecommendProgramsComponent/>
        </ContentLayout>
        <div className={css`height: 90px`}/>
        <ContentLayout shiftTop={true}>
            <Grid fluid>
                <Row>
                    <ProgramCategoryCardColumn/>
                    <ProgramCategoryCardColumn/>
                    <ProgramCategoryCardColumn/>
                </Row>
            </Grid>

            <div>
                <h4>관련 단축키 팁</h4>
                <Grid fluid>
                    <Row>
                        <Col lg={8}>1</Col>
                        <Col lg={8}>1</Col>
                        <Col lg={8}>1</Col>
                    </Row>
                </Grid>
            </div>
        </ContentLayout>
    </>
}

export default MainContentPage
