import {Col, Grid, Row} from "rsuite";
import {css} from "@emotion/css";
import {FC} from "react";

export const PageContentLayout: FC = ({children}) =>
    <Grid className={css`
      text-align: center;
      width: 100%;
      padding-top: 125px;
      padding-bottom: 30px;
    `}>
        <Row>
            <Col xs={24} smPush={1} sm={22} mdPush={2} md={20} lgPush={3} lg={18}>
                <div className={css`max-width: 920px;
                  margin: 0 auto`}>
                    {children}
                </div>
            </Col>
        </Row>
    </Grid>
