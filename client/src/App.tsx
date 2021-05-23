import 'rsuite/lib/styles/index.less';
import 'rsuite/lib/styles/themes/dark/index.less'
import './App.less'
import {Content, Footer, Header} from "rsuite";
import styled from "@emotion/styled";
import {Route, Switch} from "react-router-dom";
import ProgramMainPage from "./pages/program/program-main-page";
import SettingPage from "./pages/settings";
import MainContentPage from "./pages/main";
import ToolTipsPage from "./pages/tool-tips-page";
import ErrorPage from "./pages/errors/error";
import {ContentLayout} from "./components/content-layout";
import {NavBar} from "./components/main-nav-menu";


const MainBackground = styled.div`
  background-image: url("../assets/main_bg.svg");
`

function App() {
    return (
        <>
            <Header><NavBar/></Header>
            <Content>
                <Switch>
                    <Route path="/" exact>
                        <MainBackground>
                            <ContentLayout shiftTop={true}>
                                <MainContentPage/>
                            </ContentLayout>
                        </MainBackground>
                    </Route>
                    <Route path="/programs/:programCode"><ContentLayout><ProgramMainPage/></ContentLayout></Route>
                    <Route path="/settings"><ContentLayout><SettingPage/></ContentLayout></Route>
                    <Route path="/tool-tips"><ContentLayout><ToolTipsPage/></ContentLayout></Route>
                    <Route path="/**"><ContentLayout><ErrorPage code={404}/></ContentLayout></Route>
                </Switch>
            </Content>
            <Footer>
                푸터야
            </Footer>
        </>

    )
}

export default App
