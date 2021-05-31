import {FC} from "react";
import {AnimatedSwitch, spring} from "react-router-transition";
import {css} from "@emotion/css";


function slide(num: number) {
    return spring(num, {
        stiffness: 1000,
        damping: 100
    })
}

const animatedWrapper = css`
  position: relative;

  & > div {
    position: absolute;
    width: 100%;
  }
`;

export const CommonAnimatedSwitch: FC = ({children}) => {
    return <AnimatedSwitch className={animatedWrapper}
                           atEnter={{offset: -50, opacity: 0}}
                           atActive={{offset: slide(0), opacity: slide(1)}}
                           atLeave={{offset: slide(50), opacity: slide(0)}}
                           mapStyles={styles => ({
                               opacity: styles.opacity,
                               transform: `translateY(${styles.offset}px)`
                           })}>
        {children}
    </AnimatedSwitch>
}
