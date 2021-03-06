import {FC, useCallback, useState} from "react";
import {useParams} from "react-router-dom";
import {getToolTipById, Paragraph} from "../../data/dataloader";
import styled from "@emotion/styled";
import {Col, FlexboxGrid, Grid, Modal, Row} from "rsuite";
import {css} from "@emotion/css";
import {useMedia} from "react-use";
import {FadeInSection} from "../../components/animation/fade-in-section";


const Content = styled.div`
  width: 100%;
  padding-top: 125px;
`
const Header = styled.div<{ image: string }>`
  background-image: url(${props => props.image});
  background-position: right;
  background-size: cover;
  height: 512px;
  padding: 100px 0;
  margin-bottom: 180px;

  .header-content {
    width: 100%;
    height: 312px;

    img {
      margin-bottom: 16px;
      padding-right: 10px;
    }

    h5 {
      margin-bottom: 16px;
      font-size: 1.5rem;
      line-height: 2rem;
      white-space: pre-line;
    }

    p {
      color: rgba(255, 255, 255, 0.7);
      white-space: pre-line;
    }
  }
`

const Section = styled.div`
  padding: 10px;
  margin-bottom: 140px;

  &:last-child {
    margin-bottom: 80px;
  }
`

const ParagraphImageElement = styled.img`
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`


const ParagraphImage: FC<{ src: string, description: string }> = ({src, description}) => {
    const [show, setShow] = useState(false);

    const close = useCallback(() => setShow(false), []);
    const open = useCallback(() => setShow(true), []);
    return <>
        <ParagraphImageElement src={src} onClick={open}/>
        <Modal size={"lg"} show={show} onHide={close}>
            <Modal.Body className={css`margin-top: 0;
              padding-bottom: 0`}>
                <img className={css`width: 100%`} src={src}/>
                <p className={css`margin-top: 12px;`}>{description}</p>
            </Modal.Body>
        </Modal>
    </>
}

const ParagraphText: FC<Paragraph> = ({title, description}) => {
    return <>
        {title && <h5 className={css`font-size: 1.25rem;
          margin-bottom: 1rem;`}>{title}</h5>}
        <p className={css`font-size: 1rem;
          white-space: pre-line;
          font-weight: lighter;
          color: #cbcbcb`}>{description}</p>
    </>
}

export const TipContentLayout: FC = ({children}) =>
    <Grid className={css`width: 100%;`}>
        <Row>
            <Col xs={24} smPush={1} sm={22} mdPush={2} md={20} lgPush={3} lg={18}>
                <div className={css`max-width: 920px;
                  margin: 0 auto`}>
                    {children}
                </div>
            </Col>
        </Row>
    </Grid>
const ToolTipDetailPage: FC = props => {
    const {id} = useParams<{ id: string }>()
    const {title, description, coverImage, article, programIcons} = getToolTipById(parseInt(id));

    const isMid = useMedia('(min-width: 992px');

    return <>
        <Content>
            <Header image={coverImage}>
                <TipContentLayout>
                    <FlexboxGrid justify={"center"} align={"middle"} className={"header-content"}>
                        <FlexboxGrid.Item colspan={24}>
                            <FadeInSection>{programIcons.map(icon => <img src={icon}/>)}</FadeInSection>
                            <FadeInSection timeout={200}><h5>{title}</h5></FadeInSection>
                            <FadeInSection timeout={400}><p>{description}</p></FadeInSection>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </TipContentLayout>
            </Header>
            <TipContentLayout>
                {article.map((section, cindex) =>
                    <Section>
                        {section.map((paragraph, pindex) => <>
                            <FadeInSection>
                                <Grid fluid className={css`margin-bottom: 50px;`}>
                                    {isMid && paragraph.type == "left" &&
                                    <Row gutter={24}>
                                        <Col md={13}><ParagraphImage src={paragraph.image!}
                                                                     description={paragraph.description}/></Col>
                                        <Col md={11}><ParagraphText {...paragraph}/></Col>
                                    </Row>}
                                    {isMid && paragraph.type == "right" &&
                                    <Row gutter={24}>
                                        <Col md={11}><ParagraphText {...paragraph}/></Col>
                                        <Col md={13}><ParagraphImage src={paragraph.image!}
                                                                     description={paragraph.description}/></Col>
                                    </Row>}
                                    {!isMid && paragraph.type != "youtube" && <>
                                        <Row><Col><ParagraphImage src={paragraph.image!}
                                                                  description={paragraph.description}/> </Col></Row>
                                        <Row><Col><ParagraphText {...paragraph}/></Col></Row>
                                    </>}

                                    {paragraph.type == "youtube" && <>
                                        <Row><Col><ParagraphText {...paragraph}/></Col></Row>
                                        <Row><Col>
                                            <iframe src={paragraph.source}
                                                    className={css`width: 100%;
                                                      height: 450px;
                                                      margin: 1rem 0;`}
                                                    title="YouTube video player" frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen/>
                                        </Col></Row>
                                    </>}

                                </Grid>
                            </FadeInSection>
                        </>)}
                    </Section>)}
            </TipContentLayout>
        </Content>
    </>
}

export default ToolTipDetailPage
