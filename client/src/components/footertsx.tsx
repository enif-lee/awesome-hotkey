import {FC} from "react";
import {css} from "@emotion/css";
import styled from "@emotion/styled";
import {FlexboxGrid} from "rsuite";
import footerLogo from "../../assets/footer-logo.png"


const FooterLayout = styled.div`
  background-color: #1A1A1A;
`


export const PageFooter: FC = () => {
    return <>
        <FooterLayout>
            <FlexboxGrid justify={"center"} align={"middle"}>
                <FlexboxGrid.Item>
                    <div className={css`padding: 80px 0;
                      width: 840px;
                      float: left`}>
                        <div className={css`width: 200px;
                          padding: 11px 0;
                          float: left;`}><img src={footerLogo} className={css`width: 176px;`}/></div>
                        <div className={css`width: 640px;
                          float: left;
                          color: #7C7C7C`}>
                            <p>Copyrightⓒ2021 By 이진성. All right reserved.</p>
                            <p>어썸핫키 | 만든 이 : 이진성 장민선 조태현 최다현</p>
                            <p>Contact : enif.lee@gmail.com</p>
                        </div>
                    </div>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </FooterLayout>
    </>;
}
