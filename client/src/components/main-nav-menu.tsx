import styled from "@emotion/styled";
import {Divider, Dropdown, Nav} from "rsuite";
import {FC} from "react";
import {useHistory, Link} from "react-router-dom";
import {css} from "@emotion/css";
import logo from '../../assets/logo.svg'

const MainNavBar = styled.div`
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
  
  > ul > li {
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

const MenuDropDownItem = styled(Dropdown.Item) `
`

export const NavBar: FC = () => {
    const history = useHistory();
    return <MainNavBar>
        <MainNav>
            <Link to={"/"}>
                <img src={logo} className={css`width: 60px; height: 45px; margin-right: 120px;`} alt={"logo"}/>
            </Link>
            <MenuDropDown title="문서">
                <MenuDropDownItem
                    onSelect={() => history.push("/programs/office-word")}>word</MenuDropDownItem>
            </MenuDropDown>
            <MenuDropDown title="개발툴 및 협업툴"><MenuDropDownItem>Contact</MenuDropDownItem></MenuDropDown>
            <MenuDropDown title="UI 및 UX"><MenuDropDownItem>Contact</MenuDropDownItem></MenuDropDown>
            <MenuDropDown title="그래픽디자인"><MenuDropDownItem>Contact</MenuDropDownItem></MenuDropDown>
            <MenuDropDown title="3D/AR"><MenuDropDownItem>Contact</MenuDropDownItem></MenuDropDown>
            <MenuDropDown title="사진"><MenuDropDownItem>Contact</MenuDropDownItem></MenuDropDown>
            <MenuDropDown title="비디오"><MenuDropDownItem>Contact</MenuDropDownItem></MenuDropDown>
            <Divider vertical={true} className={css`
              height: 2rem;
              margin: .75rem 0.25rem;
            `}/>
            <Nav.Item onSelect={() => history.push("/settings")}>관련 단축키 팁</Nav.Item>
            <Nav.Item onSelect={() => history.push("/tool-tips")}>설정</Nav.Item>
        </MainNav>
    </MainNavBar>;
}