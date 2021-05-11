import {FC} from "react"
import {css} from "@emotion/css";
import {Icon, Input, InputGroup} from "rsuite";
import InputGroupAddon from "rsuite/es/InputGroup/InputGroupAddon";
import styled from "@emotion/styled";

const MainTitle = styled.h1`
  font-size: 3rem;
`

const MainSubTitle = styled.h2`
  font-size: 1rem;
  margin-bottom: 0.5rem;
`

const MainContentPage: FC = props => {

    return <>
        <img src={"https://via.placeholder.com/240"} alt={"logo"} className={css`padding: 10px;`}/>
        <MainTitle>We make you find a Hotkey.</MainTitle>
        <MainSubTitle>단축키를 쓰면 업무 효율이 팡팡올라욧.</MainSubTitle>

        <InputGroup className={css`max-width: 480px;
          margin: 0 auto;
          border-radius: 2rem;
          overflow: hidden`}>
            <InputGroupAddon className={css`background: none`}>
                <Icon icon={"search"}/>
            </InputGroupAddon>
            <Input className={css`border-radius: 2rem;`}/>
        </InputGroup>
    </>
}

export default MainContentPage
