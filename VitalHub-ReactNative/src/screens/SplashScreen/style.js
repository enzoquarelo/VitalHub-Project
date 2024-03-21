import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components";

export const ContainerSplash = styled(LinearGradient).attrs({
    colors: ['#496BBA', '#60BFC5'],
    start: { x: -0.03, y: 1.5 },
    end: { x: 1, y: 0 }

})`
    width: 100%;
    height: 100%;

    justify-content: center;
    align-items: center;
`