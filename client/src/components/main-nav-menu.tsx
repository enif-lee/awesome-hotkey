import styled from "@emotion/styled";
import {Divider, Dropdown, Nav} from "rsuite";
import {FC} from "react";
import {Link, useHistory} from "react-router-dom";
import {css} from "@emotion/css";
import logo from '../../assets/logo.png'
import {getProgramsByCategories} from "../data/dataloader";

const MainNavBar = styled.div`
  z-index: 1010;
  height: 125px;
  background-color: rgba(0, 0, 0, 0) !important;
  width: 100%;
  padding: 36px 0;
  position: absolute;
  top: 0;
`
const MainNav = styled(Nav)`
  margin: 0 auto;
  float: none;
  text-align: center;

  > ul > div, li {
    margin: 10px 0;
  }
`


const MenuDropDown = styled(Dropdown)`
  color: white;

  > a:focus {
    background-color: rgba(0, 0, 0, 0);
  }

  > a:hover {
    background-color: rgba(0, 0, 0, 0);
  }
`

const CategoryMenuDropDownItems: FC<{ categories: string[], title: string }> = ({categories, title}) => {
    const history = useHistory();
    const programs = getProgramsByCategories(categories);
    return <>
        <MenuDropDown title={title} onSelect={code => history.push("/programs/" + code)}>
            {programs.slice(0, 5).map(program => <Dropdown.Item key={program.code}
                                                                eventKey={program.code}>{program.name}</Dropdown.Item>)}
        </MenuDropDown>
    </>
}

export const NavBar: FC = () => {
    const history = useHistory();
    return <MainNavBar>
        <MainNav>
            <Link to={"/"} className={css`display: inline-block;`}>
                <img src={logo} className={css`width: 60px;
                  height: 45px;
                  margin-right: 120px;`} alt={"logo"}/>
            </Link>
            <CategoryMenuDropDownItems title={"문서"} categories={["document"]}/>
            <CategoryMenuDropDownItems title="개발/협업" categories={["development", "collaboration"]}/>
            <CategoryMenuDropDownItems title="UI/UX" categories={["ux/ui"]}/>
            <CategoryMenuDropDownItems title="그래픽디자인" categories={["graphic"]}/>
            <CategoryMenuDropDownItems title="3D/AR" categories={["3d/ar"]}/>
            <CategoryMenuDropDownItems title="사진" categories={["picture"]}/>
            <CategoryMenuDropDownItems title="비디오" categories={["video"]}/>
            <Divider vertical={true} className={css`height: 36px;`}/>
            <Nav.Item onSelect={() => history.push("/tool-tips")}>프로그램 팁</Nav.Item>
            <Nav.Item onSelect={() => history.push("/settings")}>설정</Nav.Item>
        </MainNav>
    </MainNavBar>;
}
