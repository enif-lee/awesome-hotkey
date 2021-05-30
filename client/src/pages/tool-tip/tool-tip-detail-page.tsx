import {FC} from "react";
import {useParams} from "react-router-dom";
import {getToolTipById, Paragraph} from "../../data/dataloader";
import styled from "@emotion/styled";
import {Col, FlexboxGrid, Grid, Row} from "rsuite";
import {css} from "@emotion/css";
import {useMedia} from "react-use";


const Content = styled.div`
  width: 100%;
  padding-top: 125px;
`
const Header = styled.div<{ image: string }>`
  background-image: url(${props => props.image});
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


const ParagraphImage = styled.img`
  width: 100%;
`

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
    const {title, description, coverImage, article} = getToolTipById(parseInt(id));

    const isMid = useMedia('(min-width: 992px');

    return <>
        <Content>
            <Header image={coverImage}>
                <TipContentLayout>
                    <FlexboxGrid justify={"center"} align={"middle"} className={"header-content"}>
                        <FlexboxGrid.Item colspan={24}>
                            <img src={"https://via.placeholder.com/66"}/>
                            <img src={"https://via.placeholder.com/66"}/>
                            <img src={"https://via.placeholder.com/66"}/>
                            <h5>{title}</h5>
                            <p>{description}</p>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </TipContentLayout>
            </Header>
            <TipContentLayout>
                {article.map(section =>
                    <Section>
                        {section.map(paragraph => <>
                            <Grid fluid className={css`margin-bottom: 50px;

                              &:last-child {
                                margin-bottom: 0
                              }`}>
                                {isMid && paragraph.type == "left" &&
                                <Row gutter={24}>
                                    <Col md={13}><ParagraphImage src={paragraph.image}/></Col>
                                    <Col md={11}><ParagraphText {...paragraph}/></Col>
                                </Row>}
                                {isMid && paragraph.type == "right" &&
                                <Row gutter={24}>
                                    <Col md={11}><ParagraphText {...paragraph}/></Col>
                                    <Col md={13}><ParagraphImage src={paragraph.image}/></Col>
                                </Row>}
                                {!isMid && <>
                                    <Row><Col><ParagraphImage src={paragraph.image}/></Col></Row>
                                    <Row><Col><ParagraphText {...paragraph}/></Col></Row>
                                </>}
                            </Grid>
                        </>)}
                    </Section>)}
            </TipContentLayout>
        </Content>
    </>
}

export default ToolTipDetailPage
