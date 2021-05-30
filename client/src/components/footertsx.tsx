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
                            <p>본 웹사이트는 2021년 웹프로그래밍 실습에서 제작된 팀프로젝트 사이트입니다.</p>
                            <p>어썸하키 | 만든 이 : 이진성 장민선 조태현 최다현</p>
                            <p>서울특별시 동작구 상도로 369 숭실대학교 | 연락처 : 00-000-0000 | 팩스 : 00-000-00000</p>
                        </div>
                    </div>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </FooterLayout>
    </>;
}
