import 'rsuite/lib/styles/index.less';
import 'rsuite/lib/styles/themes/dark/index.less'
import './App.less'
import {Content, Divider, Dropdown, FlexboxGrid, Footer, Header, Nav, Navbar} from "rsuite";
import styled from "@emotion/styled";
import {css} from "@emotion/css";
import {Route, Switch, useHistory} from "react-router-dom";
import ProgramMainPage from "./pages/program/program-main-page";
import SettingPage from "./pages/settings";
import MainContentPage from "./pages/main";
import ToolTipsPage from "./pages/tool-tips-page";
import ErrorPage from "./pages/errors/error";

const MainNav = styled(Nav)`
  min-width: 50%;
  margin: 0 auto;
  float: none;
  text-align: center;
`


function App() {
    const history = useHistory();

    return (
        <>
            <Header>
                <Navbar>
                    <Navbar.Body>
                        <MainNav>
                            <Dropdown title="문서">
                                <Dropdown.Item
                                    onSelect={() => history.push("/programs/office-word")}>word</Dropdown.Item>
                            </Dropdown>
                            <Dropdown title="개발툴 및 협업툴"><Dropdown.Item>Contact</Dropdown.Item></Dropdown>
                            <Dropdown title="UI 및 UX"><Dropdown.Item>Contact</Dropdown.Item></Dropdown>
                            <Dropdown title="그래픽디자인"><Dropdown.Item>Contact</Dropdown.Item></Dropdown>
                            <Dropdown title="3D/AR"><Dropdown.Item>Contact</Dropdown.Item></Dropdown>
                            <Dropdown title="사진"><Dropdown.Item>Contact</Dropdown.Item></Dropdown>
                            <Dropdown title="비디오"><Dropdown.Item>Contact</Dropdown.Item></Dropdown>
                            <Divider vertical={true} className={css`
                              height: 2rem;
                              margin: .75rem 0.25rem;
                            `}/>
                            <Nav.Item onSelect={() => history.push("/settings")}>관련 단축키 팁</Nav.Item>
                            <Nav.Item onSelect={() => history.push("/tool-tips")}>설정</Nav.Item>
                        </MainNav>
                    </Navbar.Body>
                </Navbar>
            </Header>
            <Content>
                <FlexboxGrid justify={"center"} align={"middle"} className={css`height: 600px;
                  text-align: center;`}>
                    <FlexboxGrid.Item colspan={16}>
                        <Switch>
                            <Route path="/" exact><MainContentPage/></Route>
                            <Route path="/programs/:programCode"><ProgramMainPage/></Route>
                            <Route path="/settings"><SettingPage/></Route>
                            <Route path="/tool-tips"><ToolTipsPage/> </Route>
                            <Route path="/**"><ErrorPage code={404}/></Route>
                        </Switch>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
            <Footer>
                푸터야
            </Footer>
        </>

    )
}

export default App
