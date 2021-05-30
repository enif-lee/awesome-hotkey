import {FC, useState} from "react";
import styled from "@emotion/styled";
import {Icon, IconButton, List, Modal, SelectPicker} from "rsuite";
import externalLinkIcon from "../../assets/icon/external-link.svg"
import {css} from "@emotion/css";
import {observer} from "mobx-react-lite";
import {settingStore} from "../stores/setting-store";
import {bookmarkStore} from "../stores/bookmark-store";


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
    const textSizes = [{label: "큼", value: 20}, {label: "중간(권장)", value: 16}, {label: "작음", value: 12}];
    const osOptions = [{label: "windows", value: "windows"}, {label: "osx", value: "osx"}];
    const [open, setOpen] = useState(false);

    const programs = bookmarkStore.bookmarksWithDetail;
    return <SettingPageWrap>
        <h3>설정</h3>
        <List bordered>
            <SettingListItem>
                글꼴크기
                <Action><SettingSelectPicker data={textSizes} defaultValue={settingStore.fontSize}
                                             value={settingStore.fontSize}
                                             onChange={(size) => settingStore.fontSize = size}/></Action>
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
                        <SettingSelectPicker data={osOptions} defaultValue={settingStore.os}
                                             onChange={(value) => settingStore.os = value}/>
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
                    <Modal.Title>북마크된 프로그램</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <List bordered>
                        {programs.map(program => <List.Item>
                            <img className={css`width: 32px;
                              height: 32px;
                              border-radius: 4px;
                              overflow: hidden;
                              margin-right: 16px;`} src={"/image/" + program.image}/>
                            {program.name} ({program.code})
                            <IconButton appearance={"subtle"} icon={<Icon icon={"close"}/>}
                                        onClick={() => bookmarkStore.toggleBookmark(program.code)}/>
                        </List.Item>)}
                        {programs.length == 0 && <List.Item>북마크된 프로그램이 없습니다.</List.Item>}
                    </List>
                </Modal.Body>
            </Modal>
        </SettingPageWrap>
    }
)
export default SettingPage
