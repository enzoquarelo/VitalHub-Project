import styled from "styled-components";

export const Container = styled.View`
    width: ${props => (props.widthContainer ? props.widthContainer : "100%")};
    height: ${props => (props.heightContainer ? props.heightContainer : "100%")};

    background-color: ${(props) => props.backgroundColor ? props.backgroundColor : "white"};

    display: flex;
    align-items: ${props => (props.alignItems ? props.alignItems : "center")};
    justify-content: ${props => (props.justifyContent ? props.justifyContent : "center")};
    flex-direction: ${props => (props.flexDirection ? props.flexDirection : "column")};
`

export const ContainerInputAndTitle = styled.View`
    width: 144px;
    height: 83px;

    display: flex;
    justify-content: space-between;
`