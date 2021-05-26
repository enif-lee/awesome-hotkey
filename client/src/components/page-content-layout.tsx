import {FlexboxGrid} from "rsuite";
import {css} from "@emotion/css";
import {FC} from "react";

export const PageContentLayout: FC = ({children}) => <FlexboxGrid justify={"center"} align={"middle"} className={css`
  text-align: center;
  position: absolute;
  width: 100%;
  margin-top: 125px;
`}>
    <FlexboxGrid.Item colspan={16}>
        {children}
    </FlexboxGrid.Item>
</FlexboxGrid>
