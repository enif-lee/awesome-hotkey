import React from 'react'
import './App.css'
import 'rsuite/lib/styles/index.less';
import {
    Col,
    Content,
    Divider,
    Dropdown,
    FlexboxGrid,
    Footer,
    Grid,
    Header, Icon,
    Input,
    InputGroup,
    Nav,
    Navbar,
    Row
} from "rsuite";
import styled from "@emotion/styled";
import {css} from "@emotion/css";
import InputGroupAddon from "rsuite/es/InputGroup/InputGroupAddon";


const MainNav = styled(Nav)`
  min-width: 50%;
  margin: 0 auto;
  float: none;
  text-align: center;
`

const MainTitle = styled.h1`
  font-size: 3rem;
`

const MainSubTitle = styled.h2`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`

function App() {
    return (
        <>
            <Header>
                <Navbar>
                    <Navbar.Body>
                        <MainNav>
                            <Dropdown title="문서"><Dropdown.Item>Contact</Dropdown.Item></Dropdown>
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
                            <Nav.Item>관련 단축키 팁</Nav.Item>
                            <Nav.Item>설정</Nav.Item>
                        </MainNav>
                    </Navbar.Body>
                </Navbar>
            </Header>
            <Content>
                <FlexboxGrid justify={"center"} align={"middle"} className={css`height: 600px; text-align: center;`}>
                    <FlexboxGrid.Item colspan={16}>
                        <img src={"https://via.placeholder.com/240"} alt={"logo"} className={css`padding: 10px;`}/>
                        <MainTitle>We make you find a Hotkey.</MainTitle>
                        <MainSubTitle>단축키를 쓰면 업무 효율이 팡팡올라욧.</MainSubTitle>

                        <InputGroup className={css`max-width: 480px; margin: 0 auto;border-radius: 2rem; overflow: hidden`}>
                            <InputGroupAddon className={css`background: none`}>
                                <Icon icon={"search"}/>
                            </InputGroupAddon>
                            <Input className={css`border-radius: 2rem;`}/>
                        </InputGroup>
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
