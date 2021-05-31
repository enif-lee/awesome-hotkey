import styled from "@emotion/styled";
import {FC, useEffect, useRef, useState} from "react";

const AnimatedSection = styled.section`
  width: 100%;
  opacity: 0;
  transform: translate(0, 30px);
  visibility: hidden;
  transition: opacity 400ms ease-out, transform 400ms ease-out;
  will-change: opacity, visibility;

  &.is-visible {
    opacity: 1;
    transform: none;
    visibility: visible;
    display: block;
  }
`
export const FadeInSection: FC<{ timeout?: number }> = ({children, timeout}) => {
    const domRef = useRef<HTMLElement>(null);
    const [isVisible, setVisible] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setTimeout(() => {
                    setVisible(true);
                    observer.unobserve(domRef.current!);
                }, timeout ?? 0)
            }
        });

        observer.observe(domRef.current!);

        return () => observer.unobserve(domRef.current!);
    }, []);
    return (<AnimatedSection ref={domRef} className={isVisible ? ' is-visible' : ''}>{children}</AnimatedSection>);
};