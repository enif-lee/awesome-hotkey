import {FlexboxGrid} from "rsuite";
import {css} from "@emotion/css";
import {FC} from "react";

export type ContentLayoutProps = {
    shiftTop?: boolean
}
export const ContentLayout: FC<ContentLayoutProps> = ({shiftTop = false, children}) => {
    const className = css`
      text-align: center;
      margin-top: ${shiftTop ? '0px' : '125px'};
    `;
    return <FlexboxGrid justify={"center"} align={"middle"} className={className}>
        <FlexboxGrid.Item colspan={16}>
            {children}
        </FlexboxGrid.Item>
    </FlexboxGrid>
}