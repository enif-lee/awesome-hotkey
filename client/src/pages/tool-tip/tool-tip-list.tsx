import {FC} from "react";
import {Col, Grid, List, Row} from "rsuite";
import {css} from "@emotion/css";
import styled from "@emotion/styled";
import {Link} from "react-router-dom";
import {getToolTips} from "../../data/dataloader";


const ProgramListItem = styled(List.Item)`
  background-color: #1A1A1A;
`

const ProgramTipGrid = styled(Grid)`
  text-align: left;

  .cover-image {
    width: 100%;
  }

  .content {
    color: white;
    padding: 0 16px;

    h3 {
    }

    p {
      margin-top: 10px;
      color: #ababab;
    }
  }
`

export const ToolTipListPage: FC = () => {
    const tips = getToolTips();
    return <>
        <h3 className={css`margin-bottom: 24px;`}>프로그램 팁</h3>
        <List bordered size="lg">
            {tips.map(tip =>
                <ProgramListItem className={css`background-color: #1A1A1A`} key={tip.id}>
                    <ProgramTipGrid fluid>
                        <Row className={css`margin-bottom: 24px;

                          &:last-child {
                            margin-bottom: 0;
                          }`}>
                            <Link to={"/tool-tips/" + tip.id}>
                                <Col sm={8}><img src={tip.image} className={"cover-image"}/></Col>
                                <Col sm={16} className={"content"}>
                                    <h5>{tip.title}</h5>
                                    <p>{tip.description}</p>
                                </Col>
                            </Link>
                        </Row>
                    </ProgramTipGrid>
                </ProgramListItem>
            )}
        </List>
    </>
}
