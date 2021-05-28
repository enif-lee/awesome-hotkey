import {FC, useState} from "react";
import styled from "@emotion/styled";
import {Icon, IconButton, List, Modal, SelectPicker} from "rsuite";
import externalLinkIcon from "../../assets/icon/external-link.svg"
import {css} from "@emotion/css";
import {observer} from "mobx-react-lite";
import {settingStore} from "../stores/setting-store";


const SettingPageWrap = styled.div`
  margin-top: 3rem;
  text-align: left;

  > h3 {
    margin-bottom: 12px;
  }
`

const SettingListItem = styled(List.Item)`
  padding: 0 40px;
  height: 86px;
  background-color: #101011;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;

  > div {
    line-height: 35px;
  }

  :after {
    content: "";
    display: block;
    clear: both;
  }
`

const SettingSelectPicker = styled(SelectPicker)`
  width: 290px;
  border: 0;
  height: 35px;
`

const Action = styled.span`float: right;`


const ExternalLink: FC<{ url: string }> = ({url}) => <Action>
    <IconButton className={css`padding: 0 !important;
      width: 36px;
      height: 36px;`} icon={<img src={externalLinkIcon}/>} onClick={() => window.open(url)}/>
</Action>

const SettingPage: FC = observer(() => {
        const setting = settingStore

        console.debug(setting.fontSize)
        const textSizes = [{label: "큼", value: 20}, {label: "중간(권장)", value: 16}, {label: "작음", value: 12}];
        const osOptions = [{label: "windows", value: "windows"}, {label: "osx", value: "osx"}];

        const [open, setOpen] = useState(false);

        return <SettingPageWrap>
            <h3>설정</h3>
            <List bordered>
                <SettingListItem>
                    글꼴크기
                    <Action><SettingSelectPicker data={textSizes} defaultValue={setting.fontSize} value={setting.fontSize}
                                                 onChange={(size) => setting.setFontSize(size)}/></Action>
                </SettingListItem>
                <SettingListItem>
                    즐겨찾는 프로그램
                    <Action>
                        <IconButton icon={<Icon icon={"arrow-right"}/>} onClick={() => setOpen(true)}/>
                    </Action>
                </SettingListItem>
                <SettingListItem>
                    운영체제
                    <Action>
                        <SettingSelectPicker data={osOptions} defaultValue={setting.os}
                                             onChange={(value) => setting.os = value}/>
                    </Action>
                </SettingListItem>
                <SettingListItem>
                    프로그램 추가 요청
                    <ExternalLink url={"https://forms.gle/1YXUPgJag9hrpneFA"}/>
                </SettingListItem>
                <SettingListItem>
                    단축키 수정 및 추가 요청
                    <ExternalLink url={"https://forms.gle/8Wz3R1aMEm43fGS27"}/>
                </SettingListItem>
                <SettingListItem>
                    문제 신고
                    <ExternalLink url={"https://forms.gle/ZmZtpAqo8zFdu3N38"}/>
                </SettingListItem>
            </List>
            <Modal show={open} onHide={() => setOpen(false)}>
                <Modal.Header>
                    <Modal.Title>Modal Title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <List bordered>
                        <List.Item>프로그램 명 <IconButton appearance={"subtle"} icon={<Icon icon={"close"}/>}/> </List.Item>
                    </List>
                </Modal.Body>
            </Modal>
        </SettingPageWrap>
    }
)
export default SettingPage
