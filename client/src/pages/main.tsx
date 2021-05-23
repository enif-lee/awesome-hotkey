import {FC} from "react"
import {css} from "@emotion/css";
import {Icon, Input, InputGroup} from "rsuite";
import InputGroupAddon from "rsuite/es/InputGroup/InputGroupAddon";
import styled from "@emotion/styled";

const MainTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 12px
;
`

const MainSubTitle = styled.h2`
  font-size: 1rem;
  color: #606060;
  margin-bottom: 36px;
`
const logoCss = css`
  margin: 45px 0;
`;

const MainContentPage: FC = props => {

    return <>
        <img src="../../assets/logo.svg" alt={"logo"} className={logoCss}/>
        <MainTitle>We'll find you a Hotkey.</MainTitle>
        <MainSubTitle>단축키를 사용하시면 업무효율을 200% 올려줄 수 있습니다!</MainSubTitle>

        <InputGroup className={css`max-width: 480px;
          margin: 0 auto;
          border-radius: 2rem;
          overflow: hidden`}>
            <InputGroupAddon className={css`padding: 1rem 0 1rem 1.5rem;
              background-color: rgba(0, 0, 0, 0.6);`}>
                <Icon icon={"search"}/>
            </InputGroupAddon>
            <Input className={css`border-radius: 2rem;padding: 1rem; background-color: rgba(0,0,0,0.6);`} placeholder={"Input program name to search."} />
        </InputGroup>
    </>
}

export default MainContentPage
